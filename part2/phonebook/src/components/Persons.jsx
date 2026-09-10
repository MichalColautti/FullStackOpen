const Persons = ({ personsToShow, handleDeletePerson }) => {
  return (
    <ul>
      {personsToShow.map((person) => (
        <p key={person.name}>
          {person.name} {person.number} <button onClick={() => handleDeletePerson(person)}>delete</button>
        </p>
      ))}
    </ul>
  );
};

export default Persons;
