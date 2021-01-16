function SelectBox({ selectChange }) {
  return (
    <div>
      <label htmlFor="select">Sort records by:</label>
      <select name="" id="select" onChange={selectChange}>
        <option value="userName">User Name</option>
        <option value="email">Email</option>
      </select>
    </div>
  )
}


export default SelectBox