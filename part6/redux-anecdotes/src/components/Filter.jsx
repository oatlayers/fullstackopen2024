import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/anecdoteFilterReducer"

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const inputValue = event.target.value
    dispatch(filterChange(inputValue))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}
  
export default Filter