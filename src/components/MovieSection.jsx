export default function MovieSection({ title, children }) {
  return (
    <section className="movie-section">
      <h2 className="section-title">{title}</h2>
      {children}
    </section>
  );
}
