import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
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

    axios
      .post('http://localhost:3001/persons',personObject)
      .then(response => {
        console.log(response)
      })

    setPersons(persons.concat(personObject));
    setNewName("");
    setNewPhoneNumber("");
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
