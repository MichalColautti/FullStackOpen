const Persons = ({ personsToShow, handleDeletePerson }) => {
  return (
    <ul>
      {personsToShow.map((person) => (
        <p key={person.id}>
          {person.name} {person.number} <button onClick={() => handleDeletePerson(person)}>delete</button>
        </p>
      ))}
    </ul>
  );
};

export default Persons;
