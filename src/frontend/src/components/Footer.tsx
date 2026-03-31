export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="py-10 bg-charcoal gold-border-top">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="font-serif font-bold text-gold text-lg tracking-widest">
              LM
            </span>
            <span className="text-gold/40">·</span>
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-foreground/50">
              Class of 2026
            </span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {[
              { label: "Event Info", href: "#event" },
              { label: "Messages", href: "#messages" },
              { label: "Gallery", href: "#gallery" },
              { label: "Gifts", href: "#gifts" },
              { label: "RSVP", href: "#rsvp" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-ocid={`footer.${link.label.toLowerCase()}.link`}
                className="text-xs uppercase tracking-[0.15em] text-foreground/40 hover:text-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="section-divider max-w-xs mx-auto" />

          <p className="text-xs text-foreground/30 font-sans">
            © {year} Lincoln Mingo · Class of 2026
          </p>

          <p className="text-xs text-foreground/25 font-sans">
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold/50 transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
