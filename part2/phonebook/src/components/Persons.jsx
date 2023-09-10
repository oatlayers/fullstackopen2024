const Name = ({ person, filterPersons }) => {
    return (
      <li>{person.name} {person.number}</li>
    )
  }

const Persons = () => {
    {filterPersons.map(person => 
        <Name key={person.name} person={person} />
      )}
}

export default Persons