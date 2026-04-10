import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github, MapPin, ArrowRight } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Floating orbs for background effect */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 rounded-full bg-secondary/10 blur-[100px] pointer-events-none delay-700" />

      <div className="section-container relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block glass-card px-4 py-1.5 text-xs font-medium text-muted-foreground mb-4"
          >
            LET'S CONNECT
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl font-bold gradient-text mb-6"
          >
            Ready to build something amazing?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Whether you have a project in mind, a question, or just want to say hi,
            I'm always open to discussing new opportunities.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Direct Contact Cards */}
          <div className="space-y-4">
            <motion.a
              href="mailto:vinjamurimihira@gmail.com"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="glass-card p-6 flex items-center justify-between group border border-border/50 hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg">Email Me</h3>
                  <p className="text-muted-foreground text-sm">vinjamurimihira@gmail.com</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all relative z-10" />
            </motion.a>

            <motion.a
              href="tel:+918074418799"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="glass-card p-6 flex items-center justify-between group border border-border/50 hover:border-secondary/30 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg">Call Me</h3>
                  <p className="text-muted-foreground text-sm">+91-8074418799</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-secondary group-hover:translate-x-1 transition-all relative z-10" />
            </motion.a>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="glass-card p-6 flex items-center justify-between border border-border/50 relative overflow-hidden"
            >
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg">Location</h3>
                  <p className="text-muted-foreground text-sm">India / Remote</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Social Links & Visuals */}
          <div className="grid grid-cols-2 gap-4 h-full">
            <motion.a
              href="https://www.linkedin.com/in/vinjamurimihira/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              whileHover={{ y: -5 }}
              className="glass-card p-8 flex flex-col items-center justify-center text-center group border border-border/50 hover:border-blue-500/30 transition-all duration-300 bg-gradient-to-b from-transparent to-blue-500/5 hover:to-blue-500/10"
            >
              <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Linkedin className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-foreground">LinkedIn</h3>
              <p className="text-xs text-muted-foreground mt-1">Let's connect</p>
            </motion.a>

            <motion.a
              href="https://github.com/Vmihira"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              whileHover={{ y: -5 }}
              className="glass-card p-8 flex flex-col items-center justify-center text-center group border border-border/50 hover:border-white/30 transition-all duration-300 bg-gradient-to-b from-transparent to-white/5 hover:to-white/10"
            >
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform duration-300">
                <Github className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-foreground">GitHub</h3>
              <p className="text-xs text-muted-foreground mt-1">My repositories</p>
            </motion.a>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-24 text-center text-sm font-medium text-muted-foreground/60"
        >
          © 2026 Vinjamuri Mihira. Crafted with ✨
        </motion.p>
      </div>
    </section>
  );
};

export default ContactSection;
