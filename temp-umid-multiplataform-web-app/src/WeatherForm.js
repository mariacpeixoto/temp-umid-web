import React, { useState } from "react";
import axios from "axios";

const WeatherForm = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !time) {
      setError("Por favor, selecione uma data e hora.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/get-weather`,
        {
          params: { date, time },
        }
      );
      setWeather(response.data);
      setError("");
    } catch (err) {
      setWeather(null);
      setError("Não foi possível buscar os dados. Verifique a data e hora.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-700 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-8">
          Consulte a Temperatura e Umidade
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="text-start flex flex-col gap-2">
            <label className="text-gray-600 font-semibold text-base">
              Data:
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="text-start flex flex-col gap-2">
            <label className="text-gray-600 font-semibold text-base">
              Hora:
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
          >
            Buscar Dados
          </button>
        </form>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {weather && (
          <div className="mt-6 p-4 bg-blue-100 rounded-lg text-gray-700">
            <h2 className="text-xl font-semibold mb-3 text-center">
              Dados Climáticos
            </h2>
            <p className="text-center">
              Temperatura:{" "}
              <span className="font-medium">{weather.temperature}°C</span>
            </p>
            <p className="text-center">
              Umidade: <span className="font-medium">{weather.humidity}%</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherForm;
