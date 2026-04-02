import { motion } from "motion/react";

const sonSlidePhotos = [
  "/assets/img_1230-019d4e56-3df5-76d0-a8e9-ce4c11fe957b.jpeg",
  "/assets/img_0933-019d4e6d-c54e-762d-8b52-183248d5daaa.jpeg",
];

// Duplicate photos so the scroll loop is seamless
const loopedPhotos = [...sonSlidePhotos, ...sonSlidePhotos, ...sonSlidePhotos];

function SonScrollStrip() {
  return (
    <div
      className="relative w-full mb-8 overflow-hidden rounded-xl"
      style={{
        border: "2px solid oklch(68% 0.13 72 / 0.4)",
        boxShadow: "0 8px 32px oklch(0% 0 0 / 0.4)",
        height: "260px",
      }}
    >
      {/* Fade edges */}
      <div
        className="absolute inset-y-0 left-0 z-10 w-12 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, oklch(15% 0.012 252), transparent)",
        }}
      />
      <div
        className="absolute inset-y-0 right-0 z-10 w-12 pointer-events-none"
        style={{
          background:
            "linear-gradient(to left, oklch(15% 0.012 252), transparent)",
        }}
      />

      {/* Scrolling strip */}
      <div
        className="flex h-full gap-4 items-center"
        style={{
          width: "max-content",
          animation: "scrollStrip 14s linear infinite",
        }}
      >
        {loopedPhotos.map((src, i) => (
          <img
            // biome-ignore lint/suspicious/noArrayIndexKey: intentional duplicate list for looping
            key={i}
            src={src}
            alt={`Lincoln ${(i % sonSlidePhotos.length) + 1}`}
            className="h-full rounded-lg object-cover flex-shrink-0"
            style={{ width: "200px", aspectRatio: "2/3" }}
          />
        ))}
      </div>

      <style>{`
        @keyframes scrollStrip {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-200px * ${sonSlidePhotos.length} - 1rem * ${sonSlidePhotos.length})); }
        }
        .son-strip:hover > div {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

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
            {/* Decorative corners */}
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
                To My Son
              </h2>
              <div className="section-divider mt-5 max-w-xs mx-auto" />
            </div>

            {/* Left-to-right auto-scrolling photo strip */}
            <SonScrollStrip />

            <blockquote className="space-y-5">
              <p className="font-script text-3xl text-gold/90 text-center">
                Linc (My Sonshine),
              </p>
              <p className="font-sans text-base text-foreground/85 leading-relaxed text-center">
                Watching you grow into a Handsome, Smart, Strong, Determined,
                Kind, Business Oriented, Amazing Young Man.
              </p>
              <p className="font-sans text-base text-foreground/85 leading-relaxed text-center">
                Watching you grow into the Smart, Strong, Kind, Amazing Young
                Man you are today is the greatest honor and joy of my life. From
                the moment you came into this world, it's been you and me &amp;
                we conquer🙌🏽. I wouldn't trade one single second of it. You
                are truly the love of my life, baby. From the moment you came
                into this world, it's been you and me against everything, and I
                would do EVERY single second again with no question.
              </p>
              <p className="font-sans text-base text-foreground/85 leading-relaxed text-center">
                This moment belongs to you. I see every late night, every
                struggle, every time you got back up and kept going. I've
                watched you build yourself with so much heart and strength, even
                when things were challenging. I'm so incredibly proud of you —
                prouder than words could ever say.
              </p>
              <p className="font-sans text-base text-foreground/85 leading-relaxed text-center">
                And I already know, this is only the beginning for you. You've
                got so much more ahead. I'll keep cheering you on every step of
                the way.
              </p>
              <p className="font-sans text-base text-foreground/85 leading-relaxed text-center">
                I love you more than anything in this whole world. You make
                being your Ma the best thing I've ever done.
              </p>
              <p className="font-script text-2xl text-gold text-center mt-6">
                Luv U, <br />
                <span className="text-3xl">Ma💞💕</span>
              </p>
            </blockquote>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
