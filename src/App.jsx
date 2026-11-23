import { useState, useEffect } from 'react';
import { getWeatherByCoords } from './services/weatherApi';
import SearchBar from './components/SearchBar';
import FavoritesBar from './components/FavoritesBar';
import CurrentWeather from './components/CurrentWeather';
import ForecastList from './components/ForecastList';
import './App.css';

const DEFAULT_CITY = {
  name: 'Chisinau',
  country: 'Moldova',
  latitude: 47.0056,
  longitude: 28.8575,
};

const STORAGE_KEY = 'weather_dashboard_favorites';

export default function App() {
  const [selectedCity, setSelectedCity] = useState(DEFAULT_CITY);
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('celsius');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [DEFAULT_CITY];
    } catch {
      return [DEFAULT_CITY];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Игнорируем ошибку, если localStorage недоступен
    }
  }, [favorites]);

  useEffect(() => {
    let ignore = false;

    async function loadWeather() {
      setLoading(true);
      setError('');
      try {
        const data = await getWeatherByCoords(
          selectedCity.latitude,
          selectedCity.longitude,
          unit
        );
        if (!ignore) {
          setWeatherData(data);
        }
      } catch {
        if (!ignore) {
          setError('Unable to load weather data. Please check your connection and try again.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadWeather();

    return () => {
      ignore = true;
    };
  }, [selectedCity, unit]);

  const isFavorite = favorites.some(
    (item) =>
      item.name === selectedCity.name && item.country === selectedCity.country
  );

  const handleToggleFavorite = () => {
    if (isFavorite) {
      setFavorites((prev) =>
        prev.filter(
          (item) =>
            !(item.name === selectedCity.name && item.country === selectedCity.country)
        )
      );
    } else {
      setFavorites((prev) => [...prev, selectedCity]);
    }
  };

  const handleRemoveFavorite = (cityToRemove) => {
    setFavorites((prev) =>
      prev.filter(
        (item) =>
          !(item.name === cityToRemove.name && item.country === cityToRemove.country)
      )
    );
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div>
          <h1 className="app-title">Weather Dashboard</h1>
          <p className="app-subtitle">Real-time forecast & saved locations</p>
        </div>

        <div className="unit-toggle" role="group" aria-label="Temperature unit">
          <button
            type="button"
            className={`unit-btn ${unit === 'celsius' ? 'active' : ''}`}
            onClick={() => setUnit('celsius')}
          >
            °C
          </button>
          <button
            type="button"
            className={`unit-btn ${unit === 'fahrenheit' ? 'active' : ''}`}
            onClick={() => setUnit('fahrenheit')}
          >
            °F
          </button>
        </div>
      </header>

      <main className="app-main">
        <SearchBar onSelectCity={setSelectedCity} />

        <FavoritesBar
          favorites={favorites}
          activeCity={selectedCity}
          onSelectCity={setSelectedCity}
          onRemoveFavorite={handleRemoveFavorite}
        />

        {loading && (
          <div className="status-box">
            <div className="spinner" />
            <p>Loading forecast for {selectedCity.name}...</p>
          </div>
        )}

        {!loading && error && (
          <div className="status-box error-box">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && weatherData && (
          <>
            <CurrentWeather
              city={selectedCity}
              current={weatherData.current}
              unit={unit}
              isFavorite={isFavorite}
              onToggleFavorite={handleToggleFavorite}
            />
            <ForecastList daily={weatherData.daily} unit={unit} />
          </>
        )}
      </main>
    </div>
  );
}