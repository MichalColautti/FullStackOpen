const InfoList = ({ title, infoArray }) => {
  if (infoArray.length === 1) {
    return (
      <p>
        {title}: {infoArray[0]}
      </p>
    );
  }

  return (
    <ul>
      {infoArray.map((info) => (
        <li key={info}>{info}</li>
      ))}
    </ul>
  );
};

export default InfoList;
