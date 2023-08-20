const Filter = ({persons}) => {
    const handleFilterChange = (e) => {
        setFilterPersons(
            persons.filter(
            (person) =>
                person.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
            )
        );
        };

    <form>
        filter shown with <input onChange={handleFilterChange}/>
    </form>

}


export default Filter