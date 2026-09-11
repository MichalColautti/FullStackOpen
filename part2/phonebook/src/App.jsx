import { useState, useEffect } from "react";
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import personService from "./services/persons.js";
import Notification from "./components/Notification.jsx";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [notification, setNotification] = useState("")
  const [error, setError] = useState(false)

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const AddNewPerson = (event) => {
    event.preventDefault();

    if (
      persons.some(
        (person) => person.name === newName && person.number === newPhoneNumber,
      )
    ) {
      alert(
        `${newName} is already added to phonebook with the same phone number`,
      );
      return;
    } else if (persons.some((person) => person.name === newName)) {
      const existingPerson = persons.find((person) => person.name === newName);
      const newPerson = { ...existingPerson, number: newPhoneNumber };
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(existingPerson.id, newPerson)
          .then((response) => {
            console.log(response);
            setPersons(
              persons.map((person) => 
                person.id === existingPerson.id ? newPerson : person
              ),
            );
        
            setNotification(`Replaced ${newName} old number with a new one.`)
            setTimeout(() => {
              setNotification("")
            }, 5000)
            setNewName("");
            setNewPhoneNumber("");
          })
          .catch((error) => {
            console.log(error.message);
          });
        }

      return;
    }

    const personObject = {
      name: newName,
      number: newPhoneNumber,
    };

    personService.create(personObject).then((newPerson) => {
      console.log(newPerson);
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewPhoneNumber("");

      setNotification("A new person has been added.")
      setTimeout(() => {
        setNotification("")
      },5000)
    });
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

  const handleDeletePerson = (person) => {
    const id = person.id;
    if (window.confirm(`do you want to delete ${person.name}`)) {
      personService
        .remove(person.id)
        .then((response) => {
          console.log(response);
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          console.log(error.message);
          setNotification(error.message)
          setError(true)
          setTimeout(() => {
            setNotification("")
            setError(false)
          }, 5000)
        });
    }
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
      <Notification message={notification} isError={error}/>
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
      <Persons
        personsToShow={personsToShow}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
