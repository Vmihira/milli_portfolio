import { motion } from "framer-motion";
import { Code2, Layers, Brain, Wrench, GraduationCap, Trophy } from "lucide-react";

const skillCategories = [
  {
    title: "Languages",
    icon: Code2,
    skills: ["C", "C++", "Java", "JavaScript", "Python"],
    gradient: "from-primary/10 to-secondary/10",
    hoverGradient: "group-hover:from-primary/20 group-hover:to-secondary/20",
  },
  {
    title: "Frameworks & Libraries",
    icon: Layers,
    skills: ["React.js", "Next.js", "Node.js", "Flask", "Express.js", "Tailwind CSS", "FastAPI", "LangChain"],
    gradient: "from-secondary/10 to-accent/10",
    hoverGradient: "group-hover:from-secondary/20 group-hover:to-accent/20",
  },
  {
    title: "AI & Data",
    icon: Brain,
    skills: ["LLMs", "RAG", "Agentic AI", "Generative AI", "Ollama", "Agno"],
    gradient: "from-accent/10 to-primary/10",
    hoverGradient: "group-hover:from-accent/20 group-hover:to-primary/20",
  },
  {
    title: "Tools & Platforms",
    icon: Wrench,
    skills: ["Git", "Linux", "Firebase", "MongoDB", "SQL", "Jupyter Notebook"],
    gradient: "from-primary/10 to-accent/10",
    hoverGradient: "group-hover:from-primary/20 group-hover:to-accent/20",
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 relative">
      <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block glass-card px-4 py-1.5 text-xs font-medium text-muted-foreground mb-4"
          >
            TECH STACK
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl font-bold gradient-text"
          >
            Skills
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className={`glass-card p-6 group relative overflow-hidden transition-all duration-500`}
            >
              {/* Hover gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} ${category.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors duration-300"
                  >
                    <category.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </motion.div>
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 + skillIndex * 0.03 }}
                      whileHover={{
                        scale: 1.1,
                        y: -2,
                        transition: { type: "spring", stiffness: 400, damping: 15 },
                      }}
                      className="px-4 py-2 rounded-full bg-muted text-sm font-medium text-foreground/80 cursor-default hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_15px_hsla(330,80%,65%,0.15)] transition-all duration-300"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SkillsSection;
