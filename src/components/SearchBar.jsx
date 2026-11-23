import { useState, useEffect } from 'react';
import { searchCities } from '../services/weatherApi';

export default function SearchBar({ onSelectCity }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setSuggestions([]);
      return;
    }

    const timerId = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await searchCities(trimmed);
        setSuggestions(results);
      } catch {
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    }, 350);

    return () => clearTimeout(timerId);
  }, [query]);

  const handleSelect = (city) => {
    onSelectCity({
      name: city.name,
      country: city.country || '',
      latitude: city.latitude,
      longitude: city.longitude,
    });
    setQuery('');
    setSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    if (suggestions.length > 0) {
      handleSelect(suggestions[0]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchCities(query);
      if (results.length > 0) {
        handleSelect(results[0]);
      }
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="search-wrapper">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="Search city (e.g. Chisinau, Munich, London)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search city"
        />
        {query && (
          <button
            type="button"
            className="clear-btn"
            onClick={() => {
              setQuery('');
              setSuggestions([]);
            }}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
        <button type="submit" className="search-btn" disabled={isSearching}>
          {isSearching ? '...' : 'Search'}
        </button>
      </form>

      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((city) => (
            <li key={city.id}>
              <button
                type="button"
                className="suggestion-item"
                onClick={() => handleSelect(city)}
              >
                <span className="city-name">{city.name}</span>
                <span className="city-meta">
                  {[city.admin1, city.country].filter(Boolean).join(', ')}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}