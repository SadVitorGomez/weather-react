import React, { useState } from 'react';

const api = {
  key: '164630217f0eb803bf5ae97dfeffb90c',
  base: 'https://api.openweathermap.org/data/2.5/',
};

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = (e) => {
    if (e.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    let days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  return (
    <div
      className={
        typeof weather.main !== 'undefined'
          ? weather.main.temp > 22
            ? 'app warm'
            : 'app cold'
          : 'app'
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main !== 'undefined' ? (
          <div className="location-wrapper">
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">
                <p>{weather.weather[0].main}</p>
                <img
                  className="img-fluid"
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="ícone"
                />
              </div>
            </div>
            <div className="quotes">"O Bagulho é da HS" ~ Dalai Lama</div>
          </div>
        ) : (
          ''
        )}
      </main>
    </div>
  );
}

export default App;

// To do:
// Adicionar imagens para climas diferentes
// Adicionar uma mensagem para cada clima
// Adicionar algo na tela inicial
// Adicionar mensagem para cidade não encontrada
// Adicionar botão para pesquisar
// Adicionar o ícone do clima
