import { motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Event Info", href: "#event" },
  { label: "Message Board", href: "#messages" },
  { label: "Photo Gallery", href: "#gallery" },
  { label: "$Gifts$", href: "#gifts" },
  { label: "RSVP", href: "#rsvp" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleAdminLogin = () => {
    setMenuOpen(false);
    window.location.hash = "#admin";
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-charcoal/95 backdrop-blur-md shadow-lg"
          : "bg-charcoal/80 backdrop-blur-sm"
      }`}
      style={{ borderBottom: "1px solid oklch(63% 0.10 72 / 0.4)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main nav row */}
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span
              className="font-serif font-bold text-xl text-gold tracking-widest"
              style={{ letterSpacing: "0.12em" }}
            >
              LM
            </span>
            <span className="text-xs font-sans text-gold/60 tracking-[0.3em] uppercase">
              2026
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-ocid={`nav.${link.label.toLowerCase().replace(" ", "_")}.link`}
                className="text-xs uppercase tracking-[0.18em] text-foreground/70 hover:text-gold transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={handleAdminLogin}
              data-ocid="nav.admin_login.link"
              className="text-xs uppercase tracking-[0.18em] text-foreground/40 hover:text-gold/80 transition-colors duration-200"
            >
              Admin
            </button>
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#rsvp"
              data-ocid="header.celebrate_button"
              className="hidden sm:inline-flex items-center px-5 py-2 rounded-full btn-gold-outline text-xs uppercase tracking-[0.15em] font-semibold"
            >
              Celebrate Lincoln
            </a>
            {/* Mobile menu toggle — min 44px tap target */}
            <button
              type="button"
              className="lg:hidden flex items-center justify-center w-11 h-11 text-gold"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              data-ocid="header.mobile_menu_button"
            >
              <div className="space-y-1.5">
                <span
                  className={`block w-5 h-0.5 bg-current transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
                />
                <span
                  className={`block w-5 h-0.5 bg-current transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`block w-5 h-0.5 bg-current transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Event time strip */}
        <div
          className="flex items-center justify-center gap-2 py-1.5 border-t"
          style={{ borderColor: "oklch(63% 0.10 72 / 0.2)" }}
        >
          <span className="text-gold text-xs font-sans font-semibold tracking-[0.2em] uppercase whitespace-nowrap">
            May 28, 2026
          </span>
          <span className="text-gold/40 text-xs">|</span>
          <span className="text-gold text-xs font-sans font-semibold tracking-[0.2em] uppercase whitespace-nowrap">
            4:00 PM
          </span>
          <span className="hidden sm:inline text-gold/40 text-xs">|</span>
          <span className="hidden sm:inline text-gold/60 text-xs font-sans tracking-[0.1em] whitespace-nowrap">
            Dr. Jim Vaszauskas Center, Mansfield TX
          </span>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden pb-4"
          >
            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center min-h-[44px] text-xs uppercase tracking-[0.18em] text-foreground/70 hover:text-gold transition-colors px-1"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={handleAdminLogin}
                className="flex items-center min-h-[44px] text-xs uppercase tracking-[0.18em] text-foreground/40 hover:text-gold/80 transition-colors px-1"
                data-ocid="mobile_nav.admin_login.link"
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  document
                    .getElementById("rsvp")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center min-h-[44px] px-5 py-2 rounded-full btn-gold-outline text-xs uppercase tracking-[0.15em] font-semibold mt-2"
              >
                Celebrate Lincoln
              </button>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
