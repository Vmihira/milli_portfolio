import { Mail, Phone, Linkedin, Github } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
      <div className="section-container relative z-10 text-center">
        <span className="inline-block glass-card px-4 py-1.5 text-xs font-medium text-muted-foreground mb-4">
          LET'S CONNECT
        </span>
        <h2 className="font-heading text-4xl md:text-5xl font-bold gradient-text mb-6">
          Get In Touch
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto mb-10 text-lg">
          I'm always excited to collaborate on innovative projects. Let's build something amazing together.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap mb-10">
          <a
            href="mailto:vinjamurimihira@gmail.com"
            className="gradient-btn text-sm flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            vinjamurimihira@gmail.com
          </a>
          <a
            href="tel:+918074418799"
            className="glass-card px-6 py-3 text-sm font-medium text-foreground hover:scale-105 transition-transform duration-300 flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            +91-8074418799
          </a>
        </div>

        <div className="flex items-center justify-center gap-4">
          <a
            href="https://www.linkedin.com/in/vinjamurimihira/"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-4 hover:scale-110 transition-transform duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5 text-foreground/70" />
          </a>
          <a
            href="https://github.com/Vmihira"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-4 hover:scale-110 transition-transform duration-300"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5 text-foreground/70" />
          </a>
        </div>

        <p className="mt-16 text-xs text-muted-foreground/60">
          © 2026 Vinjamuri Mihira. Crafted with ✨
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
