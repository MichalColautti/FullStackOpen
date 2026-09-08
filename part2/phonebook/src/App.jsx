import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const AddNewPerson = (event) => {
    event.preventDefault()

    if(persons.some((e) => e.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName,
      phoneNumber: newPhoneNumber
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewPhoneNumber('')
  }

  const personsToShow = newFilter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <p>filter shown with <input value={newFilter} onChange={(e) => setNewFilter(e.target.value)}/></p>
      <h2>Add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)}/>
        </div>
        <div>
          number: <input value={newPhoneNumber} onChange={(e) => setNewPhoneNumber(e.target.value)}/>
        </div>
        <div>
          <button type="submit" onClick={AddNewPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person =>
          <p key={person.name}>{person.name} {person.phoneNumber}</p>
        )}
      </ul>
    </div>
  )
}

export default App