import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, FileText } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Blogs", href: "/blogs", isRoute: true },
  { label: "Contact", href: "#contact" },
];

const RESUME_URL =
  "https://drive.google.com/file/d/1dqYVVGQo7GWUVob_RlhfdzCuwAUi1A69/view?usp=sharing";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const renderNavLink = (link: typeof navLinks[0], onClick?: () => void) => {
    const isHash = link.href.startsWith("#");
    const href = isHash && !isHome ? `/${link.href}` : link.href;

    const cls =
      "text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-300";

    return link.isRoute || (isHash && !isHome) ? (
      <Link key={link.label} to={href} className={cls} onClick={onClick}>
        {link.label}
      </Link>
    ) : (
      <a key={link.label} href={link.href} className={cls} onClick={onClick}>
        {link.label}
      </a>
    );
  };

  return (
    <>
      {/* ───── Main nav bar ───── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-card py-3" : "py-5"
        }`}
      >
        <div className="section-container flex items-center justify-between">
          {/* Logo — acts as menu toggle on mobile */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="font-heading text-xl font-bold gradient-text md:cursor-default focus:outline-none"
            aria-label="Open navigation menu"
          >
            VM
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => renderNavLink(link))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card text-xs font-semibold px-5 py-2 hover:bg-white/10 transition-colors"
            >
              View Resume
            </a>
            {isHome ? (
              <a href="#contact" className="gradient-btn text-sm !px-6 !py-2">
                Say Hello
              </a>
            ) : (
              <Link to="/#contact" className="gradient-btn text-sm !px-6 !py-2">
                Say Hello
              </Link>
            )}
          </div>

          {/* Mobile: show Resume + Say Hello condensed */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-2 hover:bg-white/10 transition-colors rounded-xl"
              aria-label="View Resume"
            >
              <FileText className="w-4 h-4 text-primary" />
            </a>
            {isHome ? (
              <a href="#contact" className="gradient-btn text-xs !px-4 !py-2">
                Say Hello
              </a>
            ) : (
              <Link to="/#contact" className="gradient-btn text-xs !px-4 !py-2">
                Say Hello
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* ───── Sidebar overlay (mobile) ───── */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-300 lg:hidden ${
          sidebarOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            sidebarOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar panel */}
        <aside
          className={`absolute top-0 left-0 h-full w-72 flex flex-col transition-transform duration-300 ease-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{
            background:
              "linear-gradient(160deg, hsla(210,100%,98%,0.97) 0%, hsla(270,60%,98%,0.97) 100%)",
            backdropFilter: "blur(20px)",
            borderRight: "1px solid rgba(255,255,255,0.3)",
            boxShadow: "8px 0 32px rgba(0,0,0,0.12)",
          }}
        >
          {/* Sidebar header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-8">
            <Link
              to="/"
              className="font-heading text-2xl font-bold gradient-text"
              onClick={() => setSidebarOpen(false)}
            >
              VM
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="glass-card p-2 hover:bg-white/20 transition-colors rounded-xl"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-foreground/70" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-1 px-4 flex-1">
            {navLinks.map((link) => {
              const isHash = link.href.startsWith("#");
              const href = isHash && !isHome ? `/${link.href}` : link.href;
              const baseCls =
                "flex items-center px-4 py-3 rounded-xl text-base font-medium text-foreground/70 hover:text-foreground hover:bg-white/30 transition-all duration-200";

              return link.isRoute || (isHash && !isHome) ? (
                <Link
                  key={link.label}
                  to={href}
                  className={baseCls}
                  onClick={() => setSidebarOpen(false)}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className={baseCls}
                  onClick={() => setSidebarOpen(false)}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Sidebar footer CTAs */}
          <div className="flex flex-col gap-3 px-6 py-8 border-t border-white/20">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 glass-card py-3 font-semibold text-sm hover:bg-white/20 transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <FileText className="w-4 h-4 text-primary" />
              View Resume
            </a>
            {isHome ? (
              <a
                href="#contact"
                className="gradient-btn text-sm text-center !px-6 !py-3"
                onClick={() => setSidebarOpen(false)}
              >
                Say Hello
              </a>
            ) : (
              <Link
                to="/#contact"
                className="gradient-btn text-sm text-center !px-6 !py-3"
                onClick={() => setSidebarOpen(false)}
              >
                Say Hello
              </Link>
            )}
          </div>
        </aside>
      </div>
    </>
  );
};

export default Navbar;
