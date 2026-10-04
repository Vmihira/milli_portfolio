export interface MediumParsedBlog {
  id: string;
  title: string;
  description: string;
  url: string;
  date: string;
  pubDate: string;
  readTime: string;
  tags: string[];
  thumbnail?: string;
}

export function parseMediumXml(xml: string): MediumParsedBlog[] {
  const items: MediumParsedBlog[] = [];
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

    let cleanUrl = rawUrl;
    try {
      const u = new URL(rawUrl);
      u.searchParams.delete("source");
      cleanUrl = u.toString();
    } catch {}

    const idMatch = cleanUrl.match(/-([a-f0-9]{8,12})(?:\?|$)/i);
    const id = idMatch ? idMatch[1] : cleanUrl.split("/").pop() || "";

    let thumbnail = "";
    const imgMatch = rawContent.match(/<img[^>]+src=["'](https:\/\/[^"'>]+)["']/i);
    if (imgMatch && !imgMatch[1].includes("stat?event=post") && !imgMatch[1].includes("1x1")) {
      thumbnail = imgMatch[1];
    }

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

    const plainText = rawContent.replace(/<[^>]+>/g, " ").trim();
    const wordCount = plainText.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 200));
    const readTime = `${minutes} min read`;

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
