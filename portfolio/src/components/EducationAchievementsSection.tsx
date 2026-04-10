import { motion } from "framer-motion";
import { GraduationCap, Trophy, Award, Medal, Crown } from "lucide-react";

const EducationAchievementsSection = () => {
  const achievements = [
    {
      title: "Web Development Lead",
      organization: "ACM Student Chapter (VIIT)",
      icon: Crown,
      gradient: "from-primary/10 to-primary/5",
      borderHover: "hover:border-primary/50",
    },
    {
      title: "Top 10 Finalist",
      organization: "SusHacks – National Hackathon",
      icon: Trophy,
      gradient: "from-secondary/10 to-secondary/5",
      borderHover: "hover:border-secondary/50",
    },
    {
      title: "Top 39% & 4 Badges",
      organization: "LeetCode",
      icon: Award,
      gradient: "from-accent/10 to-accent/5",
      borderHover: "hover:border-accent/50",
    },
    {
      title: "2 Star Rating",
      organization: "CodeChef",
      icon: Medal,
      gradient: "from-primary/10 to-secondary/5",
      borderHover: "hover:border-primary/50",
    },
  ];

  return (
    <section id="education-achievements" className="py-24 relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none delay-500" />

      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block glass-card px-4 py-1.5 text-xs font-medium text-muted-foreground mb-4"
          >
            MILESTONES
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl font-bold gradient-text"
          >
            Education & Awards
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-stretch">
          {/* Education Pane */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 relative group"
          >
            {/* Glowing backdrop */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            
            <div className="relative h-full glass-card p-8 rounded-2xl flex flex-col justify-center items-center text-center bg-background/80 backdrop-blur-xl border border-white/10 overflow-hidden">
              <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-8 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]"
              >
                <GraduationCap className="w-10 h-10 text-primary" />
              </motion.div>

              <h3 className="text-2xl font-bold text-foreground mb-4 font-heading group-hover:text-primary transition-colors duration-300">
                B.Tech in Computer Science
              </h3>
              
              <p className="text-muted-foreground mb-6 max-w-sm">
                Vignan's Institute of Information Technology
              </p>
              
              <div className="w-full flex items-center justify-between px-6 py-4 rounded-xl bg-white/5 border border-white/5">
                <span className="text-sm text-muted-foreground font-medium">Class of 2026</span>
                <div className="h-4 w-[1px] bg-white/10" />
                <span className="text-primary font-bold tracking-wider">8.92 CGPA</span>
              </div>
            </div>
          </motion.div>

          {/* Achievements Grid */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            {achievements.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`glass-card p-6 flex flex-col justify-center relative overflow-hidden group border border-white/5 ${item.borderHover} transition-all duration-300`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-white/5 group-hover:scale-110 transition-transform duration-300 border border-white/10">
                      <item.icon className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-foreground mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all duration-300">
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {item.organization}
                  </p>
                </div>
                
                {/* Decorative corner accent */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationAchievementsSection;
