import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { parseMediumXml } from "./src/lib/mediumParser";

function mediumDevApiPlugin() {
  return {
    name: "medium-dev-api-plugin",
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url === "/api/blogs" || req.url?.startsWith("/api/blogs?")) {
          try {
            const fetchRes = await fetch("https://medium.com/feed/@vinjamurimihira", {
              headers: {
                "User-Agent": "Mozilla/5.0 (compatible; PortfolioBot/1.0)",
                Accept: "application/rss+xml, application/xml, text/xml, */*",
              },
            });
            if (!fetchRes.ok) {
              res.statusCode = fetchRes.status;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ status: "error", message: `Medium status ${fetchRes.status}` }));
              return;
            }
            const xml = await fetchRes.text();
            const items = parseMediumXml(xml);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ status: "ok", items }));
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ status: "error", message: err.message }));
          }
        } else {
          next();
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mediumDevApiPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
