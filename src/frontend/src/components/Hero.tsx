import { motion } from "motion/react";

export default function Hero() {
  return (
    <section
      id="event"
      className="relative min-h-screen flex items-center pt-16 bg-navy"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 60% 40%, oklch(68% 0.13 72 / 0.06) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <p
                className="font-script text-5xl sm:text-6xl text-gold mb-2"
                style={{ lineHeight: 1.2 }}
              >
                Graduation
              </p>
              <h1 className="font-serif font-bold uppercase text-4xl sm:text-5xl lg:text-6xl text-gold tracking-[0.08em] leading-tight">
                Lincoln Mingo
              </h1>
              <p className="mt-3 text-xs uppercase tracking-[0.25em] text-crimson font-sans font-semibold">
                Red Oak High School &nbsp;·&nbsp; Class of 2026
              </p>
            </div>

            <p className="text-foreground/80 font-sans text-base leading-relaxed max-w-md">
              This is more than a Graduation. This is the moment everything
              shifts. After years of discipline, growth, and rising into who
              he's meant to be—Lincoln Mingo is stepping into his next level.
            </p>

            <a
              href="#rsvp"
              data-ocid="hero.rsvp_button"
              className="inline-flex items-center px-8 py-3 rounded-full btn-gold-outline uppercase text-xs tracking-[0.2em] font-semibold"
            >
              RSVP Now
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex flex-col items-center"
          >
            <div
              className="relative w-full max-w-sm mx-auto rounded-2xl overflow-hidden gold-border shadow-gold-lg"
              style={{ aspectRatio: "3/4" }}
            >
              <img
                src="/assets/img_0964-019d44d7-8ed5-73ff-b0c7-3b524fadcb31.jpeg"
                alt="Lincoln Mingo — Graduate 2026"
                className="w-full h-full object-cover object-top"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, oklch(18% 0.08 252 / 0.9) 0%, transparent 50%)",
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div
                  className="rounded-xl p-4 space-y-2"
                  style={{
                    background: "oklch(18% 0.08 252 / 0.88)",
                    border: "1px solid oklch(63% 0.10 72 / 0.4)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {[
                    {
                      icon: "📍",
                      label: "Location",
                      value:
                        "Dr. Jim Vaszauskas Center for the Performing Arts, 1110 W Debbie Ln, Mansfield, TX 76063",
                    },
                    {
                      icon: "📅",
                      label: "Date",
                      value: "Thursday, May 28, 2026",
                    },
                    { icon: "⏰", label: "Time", value: "4:00 PM" },
                  ].map(({ icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3">
                      <span className="text-base mt-0.5">{icon}</span>
                      <div>
                        <span className="text-xs uppercase tracking-[0.15em] text-gold/60 font-sans">
                          {label}
                        </span>
                        <p className="text-sm font-sans text-foreground/90 leading-snug">
                          {value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
