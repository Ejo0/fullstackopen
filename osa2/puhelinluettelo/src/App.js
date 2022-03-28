import { useEffect, useState } from "react";
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.filter(p => p.name === newName).length > 0) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }
    personService.create(newPerson)
      .then(addedPerson => {
        setPersons(persons.concat(addedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (event) => {
    const id = event.target.value
    const name = persons.find(p => p.id == id).name
    if (!(window.confirm(`Delete ${name}?`))) {
      return
    }
    event.preventDefault()
    personService.del(id)
      .then(response => {
        if (response.status === 200) {
          const testi = persons.filter(p => p.id != id)
          setPersons(testi)
        }
      })
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

const Filter = ({nameFilter, handler}) => (
  <div>
    filter shown with <input value={nameFilter} onChange={handler}/>
  </div>
)

const PersonForm = (props) => (
  <form onSubmit={props.addPerson}>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange}/>
        </div>
        <div>
          number: <input value={props.newNumber} onChange={props.handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
)

const Persons = ({personsToShow, deletePerson}) => (
  <div>
    {personsToShow.map(p => (
    <p key={p.name}>
      <span>{p.name} {p.number} </span>
      <button onClick={deletePerson} value={p.id}>Delete</button>
    </p>
    ))}
  </div>
)

export default App;
