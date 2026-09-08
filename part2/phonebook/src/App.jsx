import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: '123-123-123' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map(person =>
          <p key={person.name}>{person.name} {person.phoneNumber}</p>
        )}
      </ul>
    </div>
  )
}

export default App