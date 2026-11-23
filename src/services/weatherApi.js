const GEO_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';

// Расшифровка кодов погоды WMO от Open-Meteo
export function getWeatherInfo(code) {
  const weatherMap = {
    0: { label: 'Clear sky', icon: '☀️' },
    1: { label: 'Mainly clear', icon: '🌤️' },
    2: { label: 'Partly cloudy', icon: '⛅' },
    3: { label: 'Overcast', icon: '☁️' },
    45: { label: 'Fog', icon: '🌫️' },
    48: { label: 'Depositing rime fog', icon: '🌫️' },
    51: { label: 'Light drizzle', icon: '🌦️' },
    53: { label: 'Moderate drizzle', icon: '🌦️' },
    55: { label: 'Dense drizzle', icon: '🌧️' },
    61: { label: 'Slight rain', icon: '🌧️' },
    63: { label: 'Moderate rain', icon: '🌧️' },
    65: { label: 'Heavy rain', icon: '⛈️' },
    71: { label: 'Slight snow', icon: '🌨️' },
    73: { label: 'Moderate snow', icon: '❄️' },
    75: { label: 'Heavy snow', icon: '❄️' },
    80: { label: 'Rain showers', icon: '🌦️' },
    81: { label: 'Moderate showers', icon: '🌧️' },
    82: { label: 'Violent showers', icon: '⛈️' },
    95: { label: 'Thunderstorm', icon: '⛈️' },
  };

  return weatherMap[code] || { label: 'Cloudy', icon: '🌥️' };
}

// Поиск городов по названию (возвращает до 5 совпадений)
export async function searchCities(query) {
  if (!query || query.trim().length < 2) return [];

  const url = `${GEO_API_URL}?name=${encodeURIComponent(query.trim())}&count=5&language=en&format=json`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch cities');
  }

  const data = await response.json();
  return data.results || [];
}

// Получение текущей погоды и прогноза на 5 дней по координатам
export async function getWeatherByCoords(latitude, longitude, unit = 'celsius') {
  const tempUnit = unit === 'fahrenheit' ? 'fahrenheit' : 'celsius';
  const windUnit = unit === 'fahrenheit' ? 'mph' : 'kmh';

  const params = new URLSearchParams({
    latitude,
    longitude,
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    temperature_unit: tempUnit,
    wind_speed_unit: windUnit,
    timezone: 'auto',
    forecast_days: '5',
  });

  const response = await fetch(`${WEATHER_API_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  return response.json();
}