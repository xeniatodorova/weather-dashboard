import { getWeatherInfo } from '../services/weatherApi';

export default function ForecastList({ daily, unit }) {
  const tempSymbol = unit === 'fahrenheit' ? '°' : '°';

  const formatDate = (dateString, index) => {
    if (index === 0) return 'Today';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  return (
    <section className="forecast-section">
      <h3 className="section-title">5-Day Forecast</h3>
      <div className="forecast-grid">
        {daily.time.map((dateStr, idx) => {
          const info = getWeatherInfo(daily.weather_code[idx]);
          const maxTemp = Math.round(daily.temperature_2m_max[idx]);
          const minTemp = Math.round(daily.temperature_2m_min[idx]);

          return (
            <div key={dateStr} className="forecast-card">
              <span className="forecast-day">{formatDate(dateStr, idx)}</span>
              <span className="forecast-icon" role="img" aria-label={info.label}>
                {info.icon}
              </span>
              <span className="forecast-desc">{info.label}</span>
              <div className="forecast-temps">
                <span className="temp-max">
                  {maxTemp}
                  {tempSymbol}
                </span>
                <span className="temp-min">
                  {minTemp}
                  {tempSymbol}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}