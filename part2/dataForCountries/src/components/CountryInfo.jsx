import InfoList from "./InfoList.jsx";
import weatherService from "../services/weather.js";
import { useState, useEffect } from "react";

const CountryInfo = ({ country }) => {
  const api_key = import.meta.env.VITE_SOME_KEY;
  const capital = country.capital[0];
  const countryName = country.name.common;
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    weatherService
      .getWeather(capital, api_key)
      .then((weather) => setWeather(weather));
  }, [capital, api_key]);

  if (weather === null) {
    return null;
  }

  return (
    <>
      <h1>{countryName}</h1>
      <InfoList title={"Capital"} infoArray={country.capital} />
      <p>Area: {country.area}</p>
      <InfoList
        title={"Languages"}
        infoArray={Object.values(country.languages)}
      />
      <img src={country.flags.png} alt={`Flag of ${countryName}`} width="200" />
      <h2>Weather in {capital}</h2>
      <p>Temperature: {weather.main.temp}</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={`${weather.weather[0].main}`}
        width="100"
      />
      <p>Wind: {weather.wind.speed}m/s</p>
    </>
  );
};

export default CountryInfo;
