import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Clock, Calendar, Sparkles, RefreshCw, Search, BookOpen, Layers } from "lucide-react";
import Navbar from "@/components/Navbar";
import initialBlogsArchive from "@/data/blogs.json";

export interface BlogPost {
  id?: string;
  title: string;
  description: string;
  url: string;
  date: string;
  pubDate?: string;
  readTime: string;
  tags: string[];
  thumbnail?: string;
}

const MEDIUM_USERNAME = "vinjamurimihira";
const MEDIUM_RSS_URL = `https://medium.com/feed/@${MEDIUM_USERNAME}`;
const RSS2JSON_ENDPOINT = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(MEDIUM_RSS_URL)}`;
const CACHE_KEY = `medium_blogs_archive_v4_${MEDIUM_USERNAME}`;

function getStoryKey(url: string, title: string): string {
  if (!url) return title.toLowerCase().replace(/\s+/g, "-");
  const match = url.match(/-([a-f0-9]{8,12})(?:\?|$)/i);
  if (match) return match[1];
  return url.replace(/https?:\/\/(www\.)?medium\.com\/@[^/]+\//, "").split("?")[0];
}

function parseMediumItem(item: any): BlogPost {
  let description = "";
  let thumbnail = "";

  if (
    item.thumbnail &&
    typeof item.thumbnail === "string" &&
    item.thumbnail.startsWith("http") &&
    !item.thumbnail.includes("stat?event=post")
  ) {
    thumbnail = item.thumbnail;
  }

  const rawHtml = item.content || item.description || "";

  if (typeof window !== "undefined") {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(rawHtml, "text/html");

      if (!thumbnail) {
        const images = Array.from(doc.querySelectorAll("img"));
        for (const img of images) {
          const src = img.getAttribute("src");
          if (src && src.startsWith("http") && !src.includes("stat?event=post") && !src.includes("1x1")) {
            thumbnail = src;
            break;
          }
        }
      }

      const paragraphs = Array.from(doc.querySelectorAll("p"));
      for (const p of paragraphs) {
        const text = p.textContent?.trim();
        if (text && text.length > 25) {
          description = text;
          break;
        }
      }

      if (!description) {
        description = doc.body.textContent?.trim() || "";
      }
    } catch {
      description = rawHtml.replace(/<[^>]+>/g, "").trim();
    }
  } else {
    if (!thumbnail) {
      const match = rawHtml.match(/<img[^>]+src=["'](https:\/\/[^"'>]+)["']/i);
      if (match && !match[1].includes("stat?event=post")) {
        thumbnail = match[1];
      }
    }
    description = rawHtml.replace(/<[^>]+>/g, "").trim();
  }

  if (description.length > 170) {
    description = description.slice(0, 167).trim() + "...";
  }

  const plainText = rawHtml.replace(/<[^>]+>/g, " ").trim();
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  const readTime = `${minutes} min read`;

  let dateFormatted = item.pubDate;
  let isoDate = "";
  try {
    const d = new Date(item.pubDate.replace(/-/g, "/"));
    if (!isNaN(d.getTime())) {
      isoDate = d.toISOString();
      dateFormatted = d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  } catch {
    // Keep raw pubDate
  }

  let tags: string[] = [];
  if (Array.isArray(item.categories) && item.categories.length > 0) {
    tags = item.categories.map((cat: string) =>
      cat
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    );
  } else {
    tags = ["Tech", "AI"];
  }

  let cleanUrl = item.link || item.guid || "";
  try {
    const urlObj = new URL(cleanUrl);
    urlObj.searchParams.delete("source");
    cleanUrl = urlObj.toString();
  } catch {
    // Keep original URL
  }

  return {
    id: getStoryKey(cleanUrl, item.title),
    title: item.title,
    description,
    url: cleanUrl,
    date: dateFormatted,
    pubDate: isoDate || undefined,
    readTime,
    tags,
    thumbnail: thumbnail || undefined,
  };
}

// Merge live posts with base archive:
// - Live feed is the source of truth for all current posts (automatically removing deletions and adding new posts)
// - Older archive articles beyond the live feed limit are preserved
function mergeLiveWithArchive(baseArchive: BlogPost[], liveList: BlogPost[]): BlogPost[] {
  if (!liveList || liveList.length === 0) return baseArchive;

  const liveKeys = new Set(liveList.map((item) => item.id || getStoryKey(item.url, item.title)));
  
  const liveTimestamps = liveList
    .map((b) => (b.pubDate ? new Date(b.pubDate).getTime() : NaN))
    .filter((t) => !isNaN(t));
  
  const oldestLiveTimestamp = liveTimestamps.length > 0 ? Math.min(...liveTimestamps) : 0;

  // Preserve only historical archive posts older than the live window
  const historicalOlderArchive = baseArchive.filter((b) => {
    const key = b.id || getStoryKey(b.url, b.title);
    if (liveKeys.has(key)) return false; // replaced by live fresh item
    const time = b.pubDate ? new Date(b.pubDate).getTime() : 0;
    return time < oldestLiveTimestamp;
  });

  return [...liveList, ...historicalOlderArchive].sort((a, b) => {
    const timeA = a.pubDate ? new Date(a.pubDate).getTime() : 0;
    const timeB = b.pubDate ? new Date(b.pubDate).getTime() : 0;
    return timeB - timeA;
  });
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    // Clean up older legacy cache keys
    try {
      localStorage.removeItem("medium_blogs_cache_vinjamurimihira");
      localStorage.removeItem("medium_blogs_accumulated_archive_vinjamurimihira");
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore localStorage errors
    }
    return initialBlogsArchive as BlogPost[];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("All");

  const fetchMediumPosts = async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setIsRefreshing(true);
    }
    try {
      // 1. Try our direct /api/blogs route (Vercel Serverless in production, Vite dev middleware locally)
      let liveItems: BlogPost[] = [];
      try {
        const apiRes = await fetch("/api/blogs");
        if (apiRes.ok) {
          const apiData = await apiRes.json();
          if (apiData.status === "ok" && Array.isArray(apiData.items) && apiData.items.length > 0) {
            liveItems = apiData.items;
          }
        }
      } catch (apiErr) {
        console.warn("Direct /api/blogs fetch failed, trying proxy fallback:", apiErr);
      }

      // 2. If direct endpoint returned nothing, try RSS2JSON fallback
      if (liveItems.length === 0) {
        const res = await fetch(RSS2JSON_ENDPOINT);
        if (res.ok) {
          const data = await res.json();
          if (data.status === "ok" && Array.isArray(data.items)) {
            liveItems = data.items.map(parseMediumItem);
          }
        }
      }

      if (liveItems.length > 0) {
        // Sync deletions & additions against base archive
        const merged = mergeLiveWithArchive(initialBlogsArchive as BlogPost[], liveItems);
        setBlogs(merged);

        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(merged));
        } catch {
          // ignore localStorage write errors
        }

        setLastUpdated(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      }
    } catch (err) {
      console.warn("Could not fetch live Medium posts, using archived data:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMediumPosts();
  }, []);

  // Collect all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    blogs.forEach((b) => b.tags.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set)];
  }, [blogs]);

  // Filtered blogs based on search query and selected tag
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag =
        selectedTag === "All" || blog.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase());
      return matchesSearch && matchesTag;
    });
  }, [blogs, searchQuery, selectedTag]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Floating background blur orbs */}
      <div className="fixed top-20 left-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl float-animation pointer-events-none" />
      <div className="fixed bottom-20 right-10 w-96 h-96 rounded-full bg-secondary/10 blur-3xl float-animation-delayed pointer-events-none" />

      <div className="relative z-10 section-container pt-32 pb-24">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-4"
          >
            <span className="glass-card px-4 py-1.5 text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              WRITINGS & INSIGHTS
            </span>
            <span className="glass-card px-3 py-1.5 text-xs font-medium text-emerald-500/90 dark:text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Synced with Medium
            </span>
            <span className="glass-card px-3 py-1.5 text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-secondary" />
              {blogs.length} Stories Total
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl font-bold gradient-text mb-4"
          >
            Blog Posts
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6"
          >
            A complete archive of insights on AI, web development, autonomous agents, and engineering
          </motion.p>

          {/* Action buttons (Medium profile + Refresh) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href={`https://medium.com/@${MEDIUM_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium bg-foreground/5 hover:bg-foreground/10 text-foreground border border-border/60 transition-all duration-300 hover:scale-105"
            >
              <BookOpen className="w-4 h-4 text-primary" />
              View Medium Profile
              <ExternalLink className="w-3 h-3 text-muted-foreground" />
            </a>

            <button
              onClick={() => fetchMediumPosts(true)}
              disabled={isRefreshing}
              aria-label="Refresh blogs"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground border border-border/40 hover:border-border transition-all duration-300 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-primary" : ""}`} />
              {isRefreshing ? "Syncing..." : lastUpdated ? `Updated ${lastUpdated}` : "Sync with Medium"}
            </button>
          </motion.div>
        </div>

        {/* Search & Tag Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-4xl mx-auto mb-10 space-y-4"
        >
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder={`Search across all ${blogs.length} articles...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full glass-card pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
            />
          </div>

          {/* Tag Pills */}
          {allTags.length > 1 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {allTags.slice(0, 10).map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`text-xs px-3.5 py-1.5 rounded-full transition-all duration-300 font-medium ${
                    selectedTag === tag
                      ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30"
                      : "bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Blog grid */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-16 glass-card max-w-md mx-auto p-8 border border-border/50">
            <BookOpen className="w-10 h-10 text-muted-foreground/50 mx-auto mb-3" />
            <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
              No matching blogs found
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Try adjusting your search query or selecting a different tag.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedTag("All");
              }}
              className="text-xs text-primary hover:underline font-medium"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filteredBlogs.map((blog, index) => (
                <motion.a
                  key={blog.url || blog.id || blog.title}
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  layout
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.4) }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="glass-card group relative overflow-hidden border border-border/50 hover:border-primary/40 transition-all duration-500 flex flex-col justify-between min-h-[290px]"
                >
                  {/* Background cover image with subtle backdrop overlay */}
                  {blog.thumbnail && (
                    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                      <img
                        src={blog.thumbnail}
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-cover opacity-25 dark:opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 ease-out"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                      />
                      {/* Gradient mask ensuring high contrast readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/55 backdrop-blur-[1px]" />
                    </div>
                  )}

                  {/* Ambient hover light gradient */}
                  <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Card Content */}
                  <div className="relative z-10 p-6 flex flex-col justify-between h-full space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5 font-medium">
                            <Calendar className="w-3.5 h-3.5 text-primary" />
                            {blog.date}
                          </span>
                          <span className="flex items-center gap-1.5 font-medium">
                            <Clock className="w-3.5 h-3.5 text-secondary" />
                            {blog.readTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline text-[11px]">
                            Read story
                          </span>
                          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5" />
                        </div>
                      </div>

                      <h2 className="font-heading text-lg md:text-xl font-bold text-foreground mb-2.5 group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-snug">
                        {blog.title}
                      </h2>
                      <p className="text-sm text-muted-foreground/90 leading-relaxed line-clamp-3">
                        {blog.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-border/30 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1.5">
                        {blog.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] px-2.5 py-0.5 rounded-full bg-background/70 backdrop-blur-md border border-border/40 text-muted-foreground font-medium group-hover:border-primary/30 group-hover:text-primary transition-colors duration-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <span className="text-xs font-semibold text-primary flex items-center gap-1 opacity-90 group-hover:translate-x-0.5 transition-transform duration-300">
                        Read on Medium &rarr;
                      </span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
