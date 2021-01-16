

function SearchBox({ searchRecords }) {
  return (
    <div className="searchbox-container">
      <label htmlFor="searchbox">Search for a user</label>
      <input type="text" className="input-text" name="" id="searchbox" onChange={searchRecords} placeholder='Search for a user' />
    </div>
  )
}

export default SearchBox