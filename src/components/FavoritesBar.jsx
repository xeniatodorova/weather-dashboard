export default function FavoritesBar({ favorites, activeCity, onSelectCity, onRemoveFavorite }) {
  if (favorites.length === 0) return null;

  return (
    <div className="favorites-bar">
      <span className="favorites-label">Saved:</span>
      <div className="favorites-list">
        {favorites.map((city) => {
          const isActive =
            activeCity &&
            activeCity.name === city.name &&
            activeCity.country === city.country;

          return (
            <div
              key={`${city.name}-${city.latitude}`}
              className={`favorite-chip ${isActive ? 'active' : ''}`}
            >
              <button
                type="button"
                className="favorite-select"
                onClick={() => onSelectCity(city)}
              >
                {city.name}
              </button>
              <button
                type="button"
                className="favorite-remove"
                onClick={() => onRemoveFavorite(city)}
                aria-label={`Remove ${city.name}`}
              >
                ×
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}