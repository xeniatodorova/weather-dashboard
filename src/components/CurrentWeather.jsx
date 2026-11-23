import { getWeatherInfo } from '../services/weatherApi';

export default function CurrentWeather({
  city,
  current,
  unit,
  isFavorite,
  onToggleFavorite,
}) {
  const weather = getWeatherInfo(current.weather_code);
  const tempSymbol = unit === 'fahrenheit' ? '°F' : '°C';
  const windUnit = unit === 'fahrenheit' ? 'mph' : 'km/h';

  return (
    <section className="current-card">
      <div className="current-header">
        <div>
          <h2 className="current-city">
            {city.name}
            {city.country ? <span className="current-country">, {city.country}</span> : ''}
          </h2>
          <p className="current-condition">{weather.label}</p>
        </div>

        <button
          type="button"
          className={`fav-toggle-btn ${isFavorite ? 'saved' : ''}`}
          onClick={onToggleFavorite}
        >
          {isFavorite ? '★ Saved' : '☆ Save city'}
        </button>
      </div>

      <div className="current-main">
        <span className="current-icon" role="img" aria-label={weather.label}>
          {weather.icon}
        </span>
        <span className="current-temp">
          {Math.round(current.temperature_2m)}
          {tempSymbol}
        </span>
      </div>

      <div className="current-metrics">
        <div className="metric-box">
          <span className="metric-label">Feels like</span>
          <span className="metric-value">
            {Math.round(current.apparent_temperature)}
            {tempSymbol}
          </span>
        </div>
        <div className="metric-box">
          <span className="metric-label">Humidity</span>
          <span className="metric-value">{current.relative_humidity_2m}%</span>
        </div>
        <div className="metric-box">
          <span className="metric-label">Wind</span>
          <span className="metric-value">
            {Math.round(current.wind_speed_10m)} {windUnit}
          </span>
        </div>
      </div>
    </section>
  );
}