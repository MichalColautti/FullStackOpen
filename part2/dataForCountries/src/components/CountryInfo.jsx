import InfoList from "./InfoList.jsx"

const CountryInfo = ({country}) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <InfoList title={"Capital"} infoArray={country.capital} />
      <p>Area: {country.area}</p>
      <InfoList title={"Languages"} infoArray={Object.values(country.languages)}/>
      <img 
        src={country.flags.png} 
        alt={`Flag of ${country.name.common}`} 
        width="200" 
      />
    </>
  );
};

export default CountryInfo;
