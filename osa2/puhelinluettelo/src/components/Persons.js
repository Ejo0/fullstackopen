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

export default Persons