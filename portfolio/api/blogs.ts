export const config = {
  runtime: "edge",
};

import { parseMediumXml } from "../src/lib/mediumParser";

const MEDIUM_USERNAME = "vinjamurimihira";
const MEDIUM_RSS_URL = `https://medium.com/feed/@${MEDIUM_USERNAME}`;

export default async function handler(req: Request) {
  try {
    const res = await fetch(MEDIUM_RSS_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; PortfolioBot/1.0)",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ status: "error", message: `Medium status ${res.status}` }), {
        status: res.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const xml = await res.text();
    const items = parseMediumXml(xml);

    return new Response(JSON.stringify({ status: "ok", items }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ status: "error", message: err.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
