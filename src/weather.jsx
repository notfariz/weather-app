import { useState } from "react";
import axios from "axios";

function Weather() {
  // State for user input and weather data
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [temp, setTemp] = useState("");
  const [desc, setDesc] = useState("");

  // Update city name as user types
  function handleCity(evt) {
    setCity(evt.target.value);
  }

  // Fetch weather data using OpenWeather API
  function getWeather() {
    axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d2a094448ddca7ae79ba90361819b043&units=metric`
    ).then((response) => {
      const data = response.data;
      console.log(data); // Debugging
      setWeather(data.weather[0].main);
      setDesc(data.weather[0].description);
      setTemp(data.main.temp);
    });
  }

  return (
    // Fullscreen container with center alignment
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white min-h-screen flex items-center justify-center">
      {/* Glassy card */}
      <div className="backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold mb-2 text-center">🌤️ Weather Report</h1>
        <p className="text-center text-gray-300 mb-6">
          Get current weather info for any city
        </p>

        {/* Input Field */}
        <input
          onChange={handleCity}
          type="text"
          value={city}
          placeholder="Enter city name"
          className="w-full px-4 py-2 bg-white/20 placeholder-white text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        />

        {/* Submit Button */}
        <button
          onClick={getWeather}
          className="w-full bg-blue-500 hover:bg-blue-600 transition text-white font-medium py-2 px-4 rounded-md mb-6"
        >
          Get Report
        </button>

        {/* Weather Info */}
        <div className="space-y-2">
          <h2>
            <b>Weather:</b> <span className="ml-2">{weather || "--"}</span>
          </h2>
          <p>
            <b>Temperature:</b> <span className="ml-2">{temp ? `${temp} °C` : "--"}</span>
          </p>
          <p>
            <b>Description:</b> <span className="ml-2 capitalize">{desc || "--"}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Weather;