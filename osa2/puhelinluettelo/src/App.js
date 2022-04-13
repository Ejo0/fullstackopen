import { useEffect, useState } from "react";
import personService from "./services/persons"
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [notifMessage, setNotifMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const current = persons.find(p => p.name === newName)
    if (current) {
      if (window.confirm(`${current.name} is already added to phonebook, replace the old number with a new one?`)) {
        updatePerson(current)
      }
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }
    personService.create(newPerson)
      .then(addedPerson => {
        setPersons(persons.concat(addedPerson))
        setNotifMessage(`Created ${newName}`)
        setTimeout(() => setNotifMessage(null), 4000);
        setNewName('')
        setNewNumber('')
      })
      .catch((error => {
        showError(error.response.data.error)
      }))
  }

  const updatePerson = (current) => {
    personService.update({...current, number:newNumber})
      .then(updated => {
        setPersons(persons.map(p => p.id !== updated.id ? p : updated))
        setNotifMessage(`Updated ${current.name}'s number to ${newNumber}`)
        setTimeout(() => setNotifMessage(null), 4000);
        setNewName('')
        setNewNumber('')
      })
      .catch((error => showError(error.response.data.error)))
  }

  const showError = (msg) => {
    setIsError(true)
        setNotifMessage(String(msg))
        setTimeout(() => {
          setNotifMessage(null)
          setIsError(false)
        }, 4000);
  }

  const deletePerson = (event) => {
    const id = event.target.value
    const name = persons.find(p => p.id === id).name
    if (!(window.confirm(`Delete ${name}?`))) {
      return
    }
    event.preventDefault()
    personService.del(id)
      .then(response => {
        if (response.status === 204) {
          setPersons(persons.filter(p => p.id !== id))
          setNotifMessage(`Deleted ${name}`)
          setTimeout(() => setNotifMessage(null), 4000);
        }
      })
      .catch((error => showError(error)))
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const personsToShow = persons.filter(p => p.name.toLowerCase().includes(nameFilter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notifMessage} isError={isError}/>
      <Filter nameFilter={nameFilter} handler={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        deletePerson={deletePerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App;
