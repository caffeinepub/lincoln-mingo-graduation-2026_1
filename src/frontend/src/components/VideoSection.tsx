import { motion } from "motion/react";

export default function VideoSection() {
  return (
    <section
      id="video"
      className="py-24"
      style={{ background: "oklch(13% 0.012 252)" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-gold/60 font-sans mb-3">
            In His Own Words
          </p>
          <h2 className="font-serif font-bold uppercase text-3xl sm:text-4xl text-gold tracking-[0.06em]">
            A Message From Lincoln
          </h2>
          <div className="section-divider mt-6 max-w-xs mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {/* Video Embed Placeholder */}
          <div
            className="relative w-full rounded-2xl gold-border card-glow overflow-hidden"
            style={{ aspectRatio: "16/9", background: "oklch(11% 0.010 252)" }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: "oklch(68% 0.13 72 / 0.15)",
                  border: "2px solid oklch(68% 0.13 72 / 0.5)",
                }}
                aria-hidden="true"
              >
                <svg
                  className="w-6 h-6 text-gold ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <div className="text-center px-8">
                <p className="font-serif italic text-gold/80 text-lg mb-2">
                  Add Your YouTube Link Here
                </p>
                <p className="font-sans text-xs text-foreground/50 tracking-wide">
                  Replace this placeholder with your YouTube embed iframe
                </p>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-foreground/50 font-sans max-w-xl mx-auto leading-relaxed">
            Keep it simple and real — 20–30 seconds, direct eye contact, genuine
            gratitude. One strong message creates an emotional connection that
            lasts far beyond this day.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
