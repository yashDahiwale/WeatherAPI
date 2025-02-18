import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import bg from "./images/bg-4.jpg";
import serach from "./images/icons/search.svg";
import clouds from "./images/icons/clouds.png";
import water from "./images/icons/water.svg";
import wind from "./images/icons/wind.svg";
import clear from "./images/icons/clear.png";
import drizzle from "./images/icons/drizzle.png";
import rain from "./images/icons/rain.png";
import snow from "./images/icons/snow.png";
import haze from "./images/icons/haze.png";
import thunderstorm from "./images/icons/thunderstorm.png";

function App() {
  const [cityName, setCityName] = useState("");
  const apiKey = process.env.REACT_APP_API_KEY || "API key here";
  console.log(apiKey);

  // Function to check weather.
  async function checkWeather(event) {
    event.preventDefault(); // To prevent page from reloading even after submitting the form.

    const mainInfo = document.querySelector(".mainInfo");
    const errorMsg = document.querySelector(".error");
    try {
      const response = await axios({
        method: "GET",
        url: `https://api.openweathermap.org/data/2.5/weather?&units=metric&appid=${apiKey}&q=${cityName}`,
      });
      const data = response.data;
      // console.log(response);
      // console.log(data);

      document.querySelector(".temp").innerHTML = data.main.temp + "°C";
      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".humid").innerHTML = data.main.humidity + "%";
      document.querySelector(".wSpeed").innerHTML = data.wind.speed + " m/s";

      const weather = data.weather[0].main; // Added zero[0] beacause it has zero index.
      const wImage = document.querySelector(".wImage");
      if (weather === "Clear") {
        wImage.src = clear;
      } else if (weather === "Clouds") {
        wImage.src = clouds;
      } else if (weather === "Drizzle") {
        wImage.src = drizzle;
      } else if (weather === "Rain") {
        wImage.src = rain;
      } else if (weather === "Snow") {
        wImage.src = snow;
      } else if (
        weather === "Haze" ||
        weather === "Mist" ||
        weather === "Smoke"
      ) {
        wImage.src = haze;
      } else if (weather === "Thunderstorm") {
        wImage.src = thunderstorm;
      }
      errorMsg.style.display = "none";
      mainInfo.style.display = "flex";
    } catch (error) {
      console.log("There is an issue while fetching the data.");
      console.log(error);
      errorMsg.style.display = "block";
      mainInfo.style.display = "none";
    }
  }

  const handleChange = (event) => {
    setCityName(event.target.value);
  };

  return (
    <div className="body">
      {/* Background Image  */}

      <img className="bg" src={bg} alt="" />

      {/* Main Container  */}

      <div className="title">
        <h1>Live Weather</h1>
      </div>

      <div className="container">
        <div className="input">
          <form className="input" onSubmit={checkWeather}>
            <input
              className="searchBar"
              type="text"
              onChange={handleChange}
              placeholder="Enter city name"
            />
            <button className="searchBtn" onClick={checkWeather}>
              <img src={serach} alt="" />
            </button>
          </form>
        </div>

        <div className="error">
          <span>Invalid City Name</span>
        </div>

        <div className="mainInfo">
          <img className="wImage" src={clouds} alt="" />
          <span className="temp">34°C</span>
          <span className="city">New York</span>
          <div className="moreInfo">
            <div className="humidity">
              <div className="humidityIcon">
                <img className="icon" src={water} alt="" />
              </div>
              <div className="humidityText">
                <span className="humid">50%</span>
                <span>Humidity</span>
              </div>
            </div>
            <div className="wind">
              <div className="windIcon">
                <img className="icon" src={wind} alt="" />
              </div>
              <div className="windText">
                <span className="wSpeed">23 km/h</span>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
