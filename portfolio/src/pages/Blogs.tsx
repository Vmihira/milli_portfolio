import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Clock, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const blogs = [
  {
    title: "Elevate Your Development Workflow with CodeMate.ai",
    description: "Discover how CodeMate.ai transforms your development workflow with AI-powered code assistance, real-time suggestions, and intelligent automation.",
    url: "https://medium.com/@vinjamurimihira/elevate-your-development-workflow-with-codemate-ai-fb2401d36365",
    date: "Sep 23, 2025",
    readTime: "3 min read",
    tags: ["AI", "Developer Tools", "Productivity"],
  },
  {
    title: "Model Context Protocol",
    description: "An overview of Model Context Protocol and how it enables seamless communication between AI models and external tools.",
    url: "https://medium.com/@vinjamurimihira/model-context-protocol-c604ed9fd55a",
    date: "Jul 26, 2025",
    readTime: "2 min read",
    tags: ["AI", "MCP", "Protocols"],
  },
  {
    title: "Mastering Prompt Engineering: The Art of Talking to AI",
    description: "Learn the art and science of prompt engineering — techniques to get the best outputs from large language models.",
    url: "https://medium.com/@vinjamurimihira/mastering-prompt-engineering-the-art-of-talking-to-ai-ce2c194b8979",
    date: "Jul 7, 2025",
    readTime: "3 min read",
    tags: ["AI", "Prompt Engineering", "LLMs"],
  },
  {
    title: "Mastering Firebase Studio: The Future of Firebase Project Management",
    description: "A deep dive into Firebase Studio and how it revolutionizes Firebase project management with AI-powered features.",
    url: "https://medium.com/@vinjamurimihira/mastering-firebase-studio-the-future-of-firebase-project-management-be7225094553",
    date: "Jun 2025",
    readTime: "3 min read",
    tags: ["Firebase", "Cloud", "Google"],
  },
  {
    title: "Understanding MCP by Anthropic: A Step Towards Model Interoperability",
    description: "Explore how Anthropic's Model Context Protocol enables model interoperability and standardized AI tool integration.",
    url: "https://medium.com/@vinjamurimihira/understanding-model-context-protocol-mcp-by-anthropic-a-step-towards-model-interoperability-c3ea10a82457",
    date: "May 2025",
    readTime: "3 min read",
    tags: ["AI", "Anthropic", "MCP"],
  },
  {
    title: "AI Tools Revolutionizing Web Development in 2025",
    description: "A curated look at the AI tools transforming how developers build, test, and deploy web applications in 2025.",
    url: "https://medium.com/@vinjamurimihira/ai-tools-revolutionizing-web-development-in-2025-07d33bae5f83",
    date: "Apr 5, 2025",
    readTime: "3 min read",
    tags: ["AI", "Web Development", "Tools"],
  },
  {
    title: "Perplexity AI: The Future of AI-Powered Search",
    description: "How Perplexity AI is redefining search with real-time, cited, and conversational answers powered by AI.",
    url: "https://medium.com/@vinjamurimihira/perplexity-ai-the-future-of-ai-powered-search-0ba00d3f0def",
    date: "Apr 1, 2025",
    readTime: "3 min read",
    tags: ["AI", "Search", "Perplexity"],
  },
  {
    title: "Mastra AI: The TypeScript Framework for AI-Powered Applications",
    description: "Discover Mastra AI — the TypeScript-first framework for building AI agents, workflows, and RAG pipelines.",
    url: "https://medium.com/@vinjamurimihira/mastra-ai-the-typescript-framework-for-ai-powered-applications-f54c9fd3138c",
    date: "Mar 2025",
    readTime: "3 min read",
    tags: ["AI", "TypeScript", "Framework"],
  },
];

const Blogs = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Floating orbs */}
      <div className="fixed top-20 left-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl float-animation pointer-events-none" />
      <div className="fixed bottom-20 right-10 w-96 h-96 rounded-full bg-secondary/10 blur-3xl float-animation-delayed pointer-events-none" />

      <div className="relative z-10 section-container py-24">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </Link>
        </motion.div>

        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block glass-card px-4 py-1.5 text-xs font-medium text-muted-foreground mb-4"
          >
            WRITINGS
          </motion.span>
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
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Sharing insights on AI, web development, and emerging technologies
          </motion.p>
        </div>

        {/* Blog grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {blogs.map((blog, index) => (
            <motion.a
              key={blog.url}
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="glass-card p-6 group relative overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-500 block"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {blog.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {blog.readTime}
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                </div>

                <h2 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {blog.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {blog.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground font-medium group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
