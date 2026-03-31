import { motion } from "motion/react";

const pillars = [
  {
    icon: "✦",
    title: "Consistency",
    body: "Showing up when no one was watching. Building character in the quiet moments that define a legacy.",
  },
  {
    icon: "✦",
    title: "Resilience",
    body: "Rising through every challenge with the quiet confidence of a young man becoming who he's called to be.",
  },
  {
    icon: "✦",
    title: "Legacy",
    body: "This milestone represents more than a diploma. It's elevation. It's the beginning of something powerful.",
  },
];

export default function WhyMatters() {
  return (
    <section id="why" className="py-24 bg-charcoal relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, oklch(68% 0.13 72 / 0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-gold/60 font-sans mb-3">
            A Defining Moment
          </p>
          <h2 className="font-serif font-bold uppercase text-3xl sm:text-4xl text-gold tracking-[0.06em]">
            Why This Matters
          </h2>
          <div className="section-divider mt-6 max-w-xs mx-auto" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center text-foreground/75 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-16 font-sans"
        >
          This milestone represents more than a diploma. It reflects consistency
          when no one was watching, resilience through every challenge, and the
          quiet confidence of a young man becoming who he's called to be.
          <span className="block mt-3 font-serif italic text-gold/80">
            This is legacy. This is elevation. This is just the beginning.
          </span>
        </motion.p>

        <div className="grid sm:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-charcoal-100 rounded-2xl p-7 gold-border card-glow text-center"
            >
              <span className="text-gold text-2xl block mb-4">
                {pillar.icon}
              </span>
              <h3 className="font-serif font-semibold text-xl text-gold mb-3 tracking-wide">
                {pillar.title}
              </h3>
              <p className="font-sans text-sm text-foreground/70 leading-relaxed">
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
