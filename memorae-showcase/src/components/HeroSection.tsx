import heroBg from "@/assets/hero-bg.jpg";
import { Github, Linkedin, Mail, FileText } from "lucide-react";

const socials = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/vinjamurimihira/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/Vmihira", label: "GitHub" },
  { icon: Mail, href: "mailto:vinjamurimihira@gmail.com", label: "Email" },
];

const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      id="about"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-background/30" />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl float-animation" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-secondary/10 blur-3xl float-animation-delayed" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 text-center section-container">
        <div className="animate-fade-up">
          <span className="inline-block glass-card px-5 py-2 text-sm font-medium text-muted-foreground mb-8">
            ✨ Full Stack Developer & AI Enthusiast
          </span>
        </div>

        <h1 className="animate-fade-up-delay-1 font-heading text-5xl sm:text-6xl md:text-8xl font-bold leading-tight tracking-tight mb-6">
          <span className="text-foreground">Hi, I'm </span>
          <span className="gradient-text">Mihira</span>
        </h1>

        <p className="animate-fade-up-delay-2 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          I build intelligent, beautiful web experiences powered by AI.
          Currently crafting education platforms with on-device LLMs.
        </p>

        <div className="animate-fade-up-delay-3 flex items-center justify-center gap-4">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-3 hover:scale-110 transition-transform duration-300"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5 text-foreground/70" />
            </a>
          ))}
          <a
            href="#projects"
            className="gradient-btn text-sm ml-4"
          >
            View My Work →
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-foreground/20 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-foreground/40" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
