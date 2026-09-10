import { useState, useEffect } from "react";
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import personService from "./services/persons.js"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, []);

  const AddNewPerson = (event) => {
    event.preventDefault();

    if (persons.some((e) => e.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const personObject = {
      name: newName,
      number: newPhoneNumber,
    };

    personService
      .create(personObject)
      .then(newPerson => {
        console.log(newPerson)
        setPersons(persons.concat(newPerson));
        setNewName("");
        setNewPhoneNumber("");
      })
  };

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setNewPhoneNumber(e.target.value);
  };

  const personsToShow =
    newFilter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(newFilter.toLowerCase()),
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newPhoneNumber={newPhoneNumber}
        handlePhoneNumberChange={handlePhoneNumberChange}
        AddNewPerson={AddNewPerson}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
