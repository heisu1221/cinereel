export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <input
        type="search"
        placeholder="Buscar películas por título..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Buscar películas"
      />
    </div>
  );
}
