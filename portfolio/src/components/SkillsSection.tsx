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

        {/* Education & Achievements */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="glass-card p-6 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors duration-300"
                >
                  <GraduationCap className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                </motion.div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  Education
                </h3>
              </div>
              <p className="font-medium text-foreground">
                B.Tech in Computer Science & Engineering
              </p>
              <p className="text-sm text-muted-foreground">
                Vignan's Institute of Information Technology • 2022–2026
              </p>
              <motion.p
                whileHover={{ scale: 1.05 }}
                className="text-sm text-primary font-medium mt-1 inline-block"
              >
                CGPA: 8.92
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="glass-card p-6 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="p-2 rounded-lg bg-muted group-hover:bg-accent/10 transition-colors duration-300"
                >
                  <Trophy className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
                </motion.div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  Achievements
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  { text: "Web Development Lead at ACM Student Chapter (VIIT)", dot: "bg-primary" },
                  { text: "Top 10 at SusHacks – National Hackathon", dot: "bg-secondary" },
                  { text: "LeetCode – Top 39% with 4 badges", dot: "bg-accent" },
                  { text: "CodeChef – 2 Star Rating", dot: "bg-primary" },
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-2 cursor-default"
                  >
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${item.dot} flex-shrink-0`} />
                    {item.text}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
