import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Blogs", href: "/blogs", isRoute: true },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-card py-3" : "py-5"
      }`}
    >
      <div className="section-container flex items-center justify-between">
        <a href="#" className="font-heading text-xl font-bold gradient-text">
          VM
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </a>
            )
          )}
        </div>
        <a
          href="#contact"
          className="gradient-btn text-sm !px-6 !py-2"
        >
          Say Hello
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
