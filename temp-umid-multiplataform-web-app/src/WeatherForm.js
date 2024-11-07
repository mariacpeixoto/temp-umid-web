import React, { useState } from 'react';
import axios from 'axios';

const WeatherForm = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !time) {
      setError('Por favor, selecione uma data e hora.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/get-weather`, {
        params: { date, time },
      });
      setWeather(response.data);
      setError('');
    } catch (err) {
      setWeather(null);
      setError('Não foi possível buscar os dados. Verifique a data e hora.');
    }
  };

  return (
    <div>
      <h1>Consulte a Temperatura e Umidade</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Data (YYYY-MM-DD): </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>Hora (HH:MM): </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <button type="submit">Buscar Dados</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div>
          <h2>Dados Climáticos</h2>
          <p>Temperatura: {weather.temperature}°C</p>
          <p>Umidade: {weather.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default WeatherForm;
