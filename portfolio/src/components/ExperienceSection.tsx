import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";

const experiences = [
  {
    company: "CodeMate.ai",
    role: "Associate Software Developer",
    period: "July 2025 – Present",
    location: "Remote",
    highlights: [
      "Owned the complete education platform end-to-end, from development to deployment.",
      "Built offline client-server app leveraging on-device LLMs (Ollama) for privacy-first AI.",
      "Optimized LLM-driven workflows for automated task generation and content summarization.",
      "Improved UI design and user experience for the company's landing page.",
    ],
    color: "purple" as const,
  },
  {
    company: "Hi Devs",
    role: "Full Stack Developer Intern",
    period: "May 2025 – July 2025",
    location: "Remote",
    highlights: [
      "Integrated RESTful APIs with React hooks and Axios for smooth frontend-backend data flow.",
      "Built dynamic post creation interface with tone selection and media upload capabilities.",
      "Designed interactive UI components promoting modular, reusable code across the application.",
    ],
    color: "pink" as const,
  },
  {
    company: "Aegion Dynamic Solution",
    role: "Frontend Developer Intern",
    period: "July 2024 – October 2024",
    location: "Remote",
    highlights: [
      "Built responsive, accessible web interfaces with seamless cross-browser performance.",
      "Developed reusable UI components, improving maintainability and reducing rendering overhead.",
      "Implemented SEO optimization strategies enhancing search visibility and load efficiency.",
    ],
    color: "cyan" as const,
  },
  {
    company: "CloudEye Technologies",
    role: "Full Stack Developer",
    period: "April 2024 – June 2024",
    location: "On-site",
    highlights: [
      "Developed full-stack web applications using Next.js, Tailwind CSS, and MongoDB.",
      "Contributed to the SkillJo Learning Academy platform with interactive learning features.",
      "Collaborated with cross-functional teams to deliver scalable, production-ready solutions.",
    ],
    color: "purple" as const,
  },
];

const dotColors = {
  purple: "bg-primary",
  pink: "bg-secondary",
  cyan: "bg-accent",
};

const borderColors = {
  purple: "border-primary/20 hover:border-primary/40",
  pink: "border-secondary/20 hover:border-secondary/40",
  cyan: "border-accent/20 hover:border-accent/40",
};

const glowShadows = {
  purple: "hover:shadow-[0_0_30px_hsla(330,80%,65%,0.15)]",
  pink: "hover:shadow-[0_0_30px_hsla(210,80%,70%,0.15)]",
  cyan: "hover:shadow-[0_0_30px_hsla(270,60%,70%,0.15)]",
};

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 relative">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" />
      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block glass-card px-4 py-1.5 text-xs font-medium text-muted-foreground mb-4"
          >
            CAREER JOURNEY
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl font-bold gradient-text"
          >
            Experience
          </motion.h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-secondary/30 to-accent/30 hidden md:block" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative mb-12 md:mb-16 ${
                index % 2 === 0 ? "md:pr-[52%]" : "md:pl-[52%]"
              }`}
            >
              {/* Timeline dot */}
              <div
                className={`hidden md:block absolute left-1/2 top-6 w-3 h-3 rounded-full ${dotColors[exp.color]} -translate-x-1/2 ring-4 ring-background`}
              />

              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`glass-card p-6 md:p-8 border ${borderColors[exp.color]} ${glowShadows[exp.color]} transition-all duration-500 group`}
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-muted">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground">
                      {exp.company}
                    </h3>
                    <p className="text-sm text-primary font-medium">
                      {exp.role}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" />
                    {exp.location}
                  </span>
                </div>

                <ul className="space-y-2.5">
                  {exp.highlights.map((h, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.15 + j * 0.05 }}
                      className="text-muted-foreground text-sm flex items-start gap-2 leading-relaxed"
                    >
                      <span className={`mt-2 w-1 h-1 rounded-full ${dotColors[exp.color]} flex-shrink-0`} />
                      {h}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
