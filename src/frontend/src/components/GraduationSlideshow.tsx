const photos = [
  "/assets/img_0939-019d44ef-8f7e-7208-b91f-aa36d235dddb.jpeg",
  "/assets/img_0965-019d44ef-8fa8-75ce-b93e-23e791479034.jpeg",
];

const allPhotos = [...photos, ...photos, ...photos, ...photos].map(
  (src, i) => ({ src, id: `p-${i}` }),
);

export default function GraduationSlideshow() {
  return (
    <section className="bg-navy overflow-hidden py-6">
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
      <div className="marquee-track">
        {allPhotos.map(({ src, id }) => (
          <div
            key={id}
            className="flex-shrink-0 rounded-xl overflow-hidden gold-border shadow-gold-lg"
            style={{ width: 220, height: 290 }}
          >
            <img
              src={src}
              alt="Lincoln Mingo graduation"
              className="w-full h-full object-cover object-top"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
