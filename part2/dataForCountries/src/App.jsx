import { useEffect, useState } from "react";
import SearchBar from "./components/searchBar.jsx";
import countriesService from "./services/countries.js";
import CountriesList from "./components/CountriesList.jsx";
import CountryInfo from "./components/CountryInfo.jsx"

function App() {
  const [searchBar, setSearchBar] = useState("");
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    countriesService.getAll().then((initialCountries) => {
      setCountries(initialCountries);
    });
  }, []);

  const handleSetSearchBar = (e) => {
    setSearchBar(e.target.value);
  };

  if (countries === null) {
    return null;
  }

  const countriesToShow =
    searchBar == ""
      ? countries
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(searchBar.toLowerCase()),
        );
  if (countriesToShow.length > 10 && searchBar !== "") {
    return (
      <>
        <SearchBar
          searchBar={searchBar}
          handleSetSearchBar={handleSetSearchBar}
        />
        <p>Too many matches, specify another filter.</p>
      </>
    );
  }

  if (countriesToShow.length === 1) {
    const country = countriesToShow[0];
    return (
      <>
        <SearchBar
          searchBar={searchBar}
          handleSetSearchBar={handleSetSearchBar}
        />
        <CountryInfo country={country} />
      </>
    );
  }

  if (countriesToShow.length === 0) {
    return (
      <>
        <SearchBar
          searchBar={searchBar}
          handleSetSearchBar={handleSetSearchBar}
        />
        <p>Couldn't find searched country</p>
      </>
    );
  }

  return (
    <>
      <SearchBar
        searchBar={searchBar}
        handleSetSearchBar={handleSetSearchBar}
      />
      <CountriesList countriesToShow={countriesToShow} />
    </>
  );
}

export default App;
