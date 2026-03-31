import { motion } from "motion/react";

const giftMethods = [
  { label: "Cash App", value: "$YourHandle", emoji: "💚" },
  { label: "Zelle", value: "[Your Email or Phone]", emoji: "💜" },
  { label: "Apple Pay", value: "[Your Phone]", emoji: "🍎" },
];

export default function GiftRegistry() {
  return (
    <section
      id="gifts"
      className="py-24"
      style={{ background: "oklch(13% 0.012 252)" }}
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-gold/60 font-sans mb-3">
            🎁 Support Lincoln
          </p>
          <h2 className="font-serif font-bold uppercase text-3xl sm:text-4xl text-gold tracking-[0.06em]">
            Send a Gift
          </h2>
          <div className="section-divider mt-6 max-w-xs mx-auto" />
          <p className="mt-6 text-sm text-foreground/60 font-sans leading-relaxed">
            For those who've asked how to support Lincoln as he steps into his
            next chapter.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-3"
        >
          {giftMethods.map((method, i) => (
            <div
              key={method.label}
              data-ocid={`gifts.item.${i + 1}`}
              className="flex items-center justify-between px-6 py-4 rounded-xl bg-charcoal-100 gold-border"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{method.emoji}</span>
                <span className="text-sm font-semibold text-foreground/80 font-sans uppercase tracking-[0.12em]">
                  {method.label}
                </span>
              </div>
              <span className="text-sm text-gold font-sans">
                {method.value}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
