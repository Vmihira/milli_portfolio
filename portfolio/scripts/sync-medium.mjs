import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MEDIUM_USERNAME = "vinjamurimihira";
const MEDIUM_RSS_URL = `https://medium.com/feed/@${MEDIUM_USERNAME}`;
const BLOGS_JSON_PATH = path.resolve(__dirname, "../src/data/blogs.json");

function parseXmlFeed(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];

    const titleMatch =
      itemXml.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/) ||
      itemXml.match(/<title>([\s\S]*?)<\/title>/);
    const linkMatch = itemXml.match(/<link>([\s\S]*?)<\/link>/);
    const pubDateMatch = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
    const contentMatch =
      itemXml.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/) ||
      itemXml.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/);
    const categories = [...itemXml.matchAll(/<category><!\[CDATA\[([\s\S]*?)\]\]><\/category>/g)].map(
      (m) => m[1]
    );

    const rawTitle = titleMatch ? titleMatch[1].trim() : "Untitled";
    const rawUrl = linkMatch ? linkMatch[1].trim() : "";
    const rawDate = pubDateMatch ? pubDateMatch[1].trim() : "";
    const rawContent = contentMatch ? contentMatch[1] : "";

    // Clean tracking from URL
    let cleanUrl = rawUrl;
    try {
      const u = new URL(rawUrl);
      u.searchParams.delete("source");
      cleanUrl = u.toString();
    } catch {}

    // Extract ID
    const idMatch = cleanUrl.match(/-([a-f0-9]{8,12})(?:\?|$)/i);
    const id = idMatch ? idMatch[1] : cleanUrl.split("/").pop() || "";

    // Extract Thumbnail
    let thumbnail = "";
    const imgMatch = rawContent.match(/<img[^>]+src=["'](https:\/\/[^"'>]+)["']/i);
    if (imgMatch && !imgMatch[1].includes("stat?event=post") && !imgMatch[1].includes("1x1")) {
      thumbnail = imgMatch[1];
    }

    // Extract description
    let description = "";
    const pMatch = rawContent.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    if (pMatch) {
      description = pMatch[1].replace(/<[^>]+>/g, "").trim();
    }
    if (!description || description.length < 25) {
      description = rawContent.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    }
    if (description.length > 170) {
      description = description.slice(0, 167).trim() + "...";
    }

    // Read time
    const plainText = rawContent.replace(/<[^>]+>/g, " ").trim();
    const wordCount = plainText.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 200));
    const readTime = `${minutes} min read`;

    // Date formatting
    let formattedDate = rawDate;
    let isoDate = "";
    try {
      const d = new Date(rawDate);
      if (!isNaN(d.getTime())) {
        isoDate = d.toISOString();
        formattedDate = d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      }
    } catch {}

    const tags =
      categories.length > 0
        ? categories.map((cat) =>
            cat
              .split("-")
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(" ")
          )
        : ["Tech", "AI"];

    items.push({
      id,
      title: rawTitle,
      description,
      url: cleanUrl,
      date: formattedDate,
      pubDate: isoDate || new Date().toISOString(),
      readTime,
      tags,
      thumbnail: thumbnail || undefined,
    });
  }

  return items;
}

async function syncBlogs() {
  console.log(`[sync-blogs] Fetching real-time Medium feed directly for @${MEDIUM_USERNAME}...`);

  // 1. Read existing archive
  let existingBlogs = [];
  if (fs.existsSync(BLOGS_JSON_PATH)) {
    try {
      const raw = fs.readFileSync(BLOGS_JSON_PATH, "utf-8");
      existingBlogs = JSON.parse(raw);
      console.log(`[sync-blogs] Loaded ${existingBlogs.length} articles from existing archive.`);
    } catch (err) {
      console.warn(`[sync-blogs] Warning reading archive:`, err.message);
    }
  }

  // 2. Fetch directly from Medium's RSS feed (no 3rd-party cache delay!)
  let newlyParsed = [];
  try {
    const res = await fetch(MEDIUM_RSS_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const xml = await res.text();
    newlyParsed = parseXmlFeed(xml);
    console.log(`[sync-blogs] Successfully parsed ${newlyParsed.length} live articles directly from Medium.`);
  } catch (err) {
    console.error(`[sync-blogs] Error fetching directly from Medium:`, err.message);
  }

  // 3. Merge: Live feed is source of truth for active items; preserve older historical posts
  let allBlogs = [];
  if (newlyParsed.length > 0) {
    const liveKeys = new Set(newlyParsed.map((i) => i.id));
    const liveTimestamps = newlyParsed
      .map((i) => new Date(i.pubDate).getTime())
      .filter((t) => !isNaN(t));
    const oldestLiveTimestamp = liveTimestamps.length > 0 ? Math.min(...liveTimestamps) : 0;

    const historicalOlderArchive = existingBlogs.filter((b) => {
      if (liveKeys.has(b.id)) return false;
      const time = b.pubDate ? new Date(b.pubDate).getTime() : 0;
      return time < oldestLiveTimestamp;
    });

    allBlogs = [...newlyParsed, ...historicalOlderArchive].sort((a, b) => {
      const timeA = a.pubDate ? new Date(a.pubDate).getTime() : 0;
      const timeB = b.pubDate ? new Date(b.pubDate).getTime() : 0;
      return timeB - timeA;
    });
  } else {
    allBlogs = existingBlogs;
  }

  // 4. Write back to blogs.json
  const dir = path.dirname(BLOGS_JSON_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(BLOGS_JSON_PATH, JSON.stringify(allBlogs, null, 2), "utf-8");
  console.log(`[sync-blogs] Complete! Total valid blogs: ${allBlogs.length}. Latest: "${allBlogs[0]?.title}"`);
}

syncBlogs();
