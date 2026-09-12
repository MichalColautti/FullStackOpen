const CountriesList = ({ countriesToShow, handleShowCountry }) => {
    const showButtonStyle = {
        margin: '4px',
        padding: '2px 6px'
    }

  return (
    <ul>
      {countriesToShow.map((country) => (
        <li key={country.name.common}>{country.name.common} <button style={showButtonStyle} onClick={() => handleShowCountry(country.name.common)}>show</button></li>
      ))}
    </ul>
  );
};

export default CountriesList;
