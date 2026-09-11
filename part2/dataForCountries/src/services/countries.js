import axios from "axios";

const countriesURL = "https://studies.cs.helsinki.fi/restcountries/";

const getAll = () => {
  const request = axios.get(`${countriesURL}/api/all`);
  return request
    .then((response) => {
      //console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export default { getAll };
