import { motion } from "motion/react";

export default function PersonalNote() {
  return (
    <section className="py-24" style={{ background: "oklch(13% 0.012 252)" }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="relative rounded-2xl p-8 sm:p-12 card-glow"
            style={{
              background: "oklch(15% 0.012 252)",
              border: "1px solid oklch(63% 0.10 72 / 0.4)",
              boxShadow:
                "0 0 60px oklch(68% 0.13 72 / 0.06), inset 0 1px 0 oklch(68% 0.13 72 / 0.08)",
            }}
          >
            {/* Decorative corner */}
            <div
              className="absolute top-4 left-4 w-8 h-8 opacity-30"
              style={{
                borderTop: "1px solid oklch(68% 0.13 72)",
                borderLeft: "1px solid oklch(68% 0.13 72)",
              }}
            />
            <div
              className="absolute top-4 right-4 w-8 h-8 opacity-30"
              style={{
                borderTop: "1px solid oklch(68% 0.13 72)",
                borderRight: "1px solid oklch(68% 0.13 72)",
              }}
            />
            <div
              className="absolute bottom-4 left-4 w-8 h-8 opacity-30"
              style={{
                borderBottom: "1px solid oklch(68% 0.13 72)",
                borderLeft: "1px solid oklch(68% 0.13 72)",
              }}
            />
            <div
              className="absolute bottom-4 right-4 w-8 h-8 opacity-30"
              style={{
                borderBottom: "1px solid oklch(68% 0.13 72)",
                borderRight: "1px solid oklch(68% 0.13 72)",
              }}
            />

            <div className="text-center mb-8">
              <p className="text-xs uppercase tracking-[0.3em] text-gold/60 font-sans mb-3">
                💎 A Personal Note
              </p>
              <h2 className="font-serif font-bold uppercase text-2xl sm:text-3xl text-gold tracking-[0.06em]">
                From Mom
              </h2>
              <div className="section-divider mt-5 max-w-xs mx-auto" />
            </div>

            <blockquote className="space-y-5">
              <p className="font-script text-3xl text-gold/90 text-center">
                To my son —
              </p>
              <p className="font-serif italic text-lg sm:text-xl text-foreground/85 leading-relaxed text-center">
                Watching you grow into who you are today has been one of the
                greatest honors of my life.
              </p>
              <p className="font-sans text-base text-foreground/70 leading-relaxed text-center">
                This moment is yours, but it was built on years of strength,
                growth, and showing up. I'm proud of you beyond words. And I
                already know — this is only the beginning.
              </p>
              <p className="font-script text-2xl text-gold text-center mt-6">
                Love always, <br />
                <span className="text-3xl">Mom</span>
              </p>
            </blockquote>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
