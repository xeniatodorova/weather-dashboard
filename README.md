# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler
# Weather Dashboard

Interactive weather web application built with **React**, **Vite**, and the **Open-Meteo API**.

## Live Demo & Repository
- **Live Demo:** https://xeniatodorova.github.io/weather-dashboard/
- **Repository:** https://github.com/xeniatodorova/weather-dashboard

## Features
- **City Search with Autocomplete:** Search for cities worldwide with instant suggestions.
- **Current Weather Overview:** Displays temperature, weather condition, "feels like" temperature, humidity, and wind speed.
- **5-Day Forecast:** Daily weather forecast with icons, conditions, and high/low temperatures.
- **Unit Toggle:** Switch seamlessly between Celsius (`°C` / `km/h`) and Fahrenheit (`°F` / `mph`).
- **Saved Cities:** Save favorite locations to `localStorage` for quick switching.
- **Responsive UI & States:** Includes loading states, error handling, and mobile-friendly layout.

## Tech Stack
- **Frontend:** React, Vite
- **Styling:** CSS3
- **APIs:** Open-Meteo Geocoding API & Weather Forecast API (no API key required)

## Local Setup
```bash
npm install
npm run dev
The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
