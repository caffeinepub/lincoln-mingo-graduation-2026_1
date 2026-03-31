import { motion } from "motion/react";

const STREAM_URL = "https://www.youtube.com/live";

export default function LiveStream() {
  return (
    <section id="livestream" className="py-16 bg-charcoal">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-charcoal-100 rounded-2xl p-8 gold-border card-glow text-center"
        >
          <span className="text-3xl block mb-4">📺</span>
          <p className="text-xs uppercase tracking-[0.3em] text-gold/60 font-sans mb-2">
            Can't Make It In Person?
          </p>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-gold tracking-[0.06em] mb-4">
            Watch the Livestream
          </h2>
          <div className="section-divider max-w-xs mx-auto mb-6" />
          <p className="text-sm text-foreground/60 font-sans leading-relaxed mb-8">
            Join us from anywhere. The ceremony will be streamed live so
            everyone can be part of this moment.
          </p>
          <a
            href={STREAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="livestream.link"
            className="inline-block btn-gold rounded-full px-8 py-3 text-xs uppercase tracking-[0.18em] font-semibold font-sans transition-all duration-200 hover:opacity-90"
          >
            Watch Live Stream
          </a>
          <p className="text-xs text-foreground/40 font-sans mt-4">
            Link will be active on May 28, 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
}
