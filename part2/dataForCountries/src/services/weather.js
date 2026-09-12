import axios from "axios";

const weatherURL =
  "https://api.openweathermap.org/data/2.5/weather?";

const getWeather = (cityname, api_key) => {
    console.log(cityname, api_key)
  const request = axios.get(
    `${weatherURL}q=${cityname}&units=metric&appid=${api_key}`,
  );
  return request.then((response) => {
    console.log(response.data)
    return response.data;
  });
};

export default { getWeather };
