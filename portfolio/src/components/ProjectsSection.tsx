import { ExternalLink, Sparkles } from "lucide-react";

const projects = [
  {
    title: "Web Studio",
    description:
      "AI-powered platform that generates custom, production-ready landing pages with real-time code previews and exports.",
    tags: ["Python", "Flask", "Generative AI", "React JS", "SandPack"],
    gradient: "from-primary/20 to-secondary/20",
  },
  {
    title: "Style AI",
    description:
      "Generative AI fashion platform creating personalized outfit visuals based on user-selected categories.",
    tags: ["Next.js", "Tailwind CSS", "Generative AI", "Python"],
    gradient: "from-secondary/20 to-accent/20",
  },
  {
    title: "AI PR Summarizer",
    description:
      "GitHub tool that tracks PRs and generates AI-driven summaries using Gemini APIs for faster code reviews.",
    tags: ["Generative AI", "Flask", "PyGithub", "Gemini API"],
    gradient: "from-accent/20 to-primary/20",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block glass-card px-4 py-1.5 text-xs font-medium text-muted-foreground mb-4">
            FEATURED WORK
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold gradient-text">
            Projects
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="glass-card p-6 group hover:scale-[1.03] transition-all duration-500 relative overflow-hidden"
            >
              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>

                <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
