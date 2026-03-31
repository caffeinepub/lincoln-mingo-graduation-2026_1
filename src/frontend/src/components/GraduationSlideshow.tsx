import { useEffect, useState } from "react";

const photos = [
  "/assets/img_0939-019d44ef-8f7e-7208-b91f-aa36d235dddb.jpeg",
  "/assets/img_0965-019d44ef-8fa8-75ce-b93e-23e791479034.jpeg",
];

const allPhotos = [...photos, ...photos, ...photos, ...photos].map(
  (src, i) => ({ src, id: `p-${i}` }),
);

const GRADUATION = new Date("2026-05-28T16:00:00");

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState(() => {
    const diff = GRADUATION.getTime() - Date.now();
    return Math.max(0, Math.floor(diff / 1000));
  });

  useEffect(() => {
    if (timeLeft <= 0) return;
    const id = setInterval(() => {
      const diff = GRADUATION.getTime() - Date.now();
      setTimeLeft(Math.max(0, Math.floor(diff / 1000)));
    }, 1000);
    return () => clearInterval(id);
  }, [timeLeft]);

  const days = Math.floor(timeLeft / 86400);
  const hours = Math.floor((timeLeft % 86400) / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return { days, hours, minutes, seconds, done: timeLeft <= 0 };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[40px]">
      <span
        className="font-serif font-bold text-gold"
        style={{ fontSize: "clamp(1.4rem, 5vw, 3.5rem)", lineHeight: 1 }}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[9px] sm:text-xs uppercase tracking-[0.2em] text-crimson font-sans font-semibold mt-1">
        {label}
      </span>
    </div>
  );
}

export default function GraduationSlideshow() {
  const { days, hours, minutes, seconds, done } = useCountdown();

  return (
    <section className="bg-navy overflow-hidden pt-4 pb-0">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 18s linear infinite;
          display: flex;
          gap: 16px;
          width: max-content;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Countdown */}
      <div className="text-center mb-6 px-4">
        {done ? (
          <p
            className="font-script text-gold"
            style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)" }}
          >
            Congratulations Lincoln! 🎓
          </p>
        ) : (
          <>
            <p className="text-xs uppercase tracking-[0.25em] text-gold/60 font-sans font-semibold mb-4">
              Countdown to Graduation
            </p>
            <div className="flex justify-center items-center gap-2 sm:gap-6 lg:gap-10 flex-wrap">
              <CountdownUnit value={days} label="Days" />
              <span className="text-gold/40 font-bold text-lg sm:text-3xl mb-4">
                :
              </span>
              <CountdownUnit value={hours} label="Hours" />
              <span className="text-gold/40 font-bold text-lg sm:text-3xl mb-4">
                :
              </span>
              <CountdownUnit value={minutes} label="Mins" />
              <span className="text-gold/40 font-bold text-lg sm:text-3xl mb-4">
                :
              </span>
              <CountdownUnit value={seconds} label="Secs" />
            </div>
          </>
        )}
      </div>

      {/* Slideshow */}
      <div className="overflow-x-hidden w-full">
        <div className="marquee-track">
          {allPhotos.map(({ src, id }) => (
            <div
              key={id}
              className="flex-shrink-0 rounded-xl overflow-hidden gold-border shadow-gold-lg"
              style={{
                width: "clamp(140px, 35vw, 220px)",
                height: "clamp(185px, 46vw, 290px)",
              }}
            >
              <img
                src={src}
                alt="Lincoln Mingo graduation"
                className="w-full h-full object-cover object-top"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
