function SaltParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => {
    const size = 3 + Math.random() * 6;
    const left = Math.random() * 100;
    const duration = 8 + Math.random() * 10;
    const delay = Math.random() * 10;
    return { id: i, size, left, duration, delay };
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="salt-particle"
          style={{
            width: p.size + "px",
            height: p.size + "px",
            left: p.left + "%",
            animationDuration: p.duration + "s",
            animationDelay: p.delay + "s",
          }}
        ></div>
      ))}
    </div>
  );
}

export default SaltParticles;