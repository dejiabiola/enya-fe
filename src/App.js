import React, { Component } from 'react'
import ReactPaginate from 'react-paginate';
import SelectBox from './SelectBox';
import './App.css';
import SearchBox from './SearchBox';
import RecordCard from './RecordCard';
import { calculatePagination } from './utils/helper';

class App extends Component {
  state = {
    recordsResult: [],
    size: 0,
    searchString: '',
    selectString: 'userName',
    pageCount: 1,
    perPage: 20,
    paginationNumber: 0,
    filteredRecords: [],
    loading: false
  }

  componentDidMount() {
    fetch('https://api.enye.tech/v1/challenge/records')
      .then(res => res.json())
      .then(data => {
        this.setState({
          size: data.size,
          recordsResult: data.records.profiles,
          loading: true
        }, () => {
          const { searchString } = this.state
          const filteredRecords = this.filterData(searchString)
          this.setState({
            filteredRecords
          })
        })
      })
      .catch(err => console.log(err))
  }

  filterData = (userSearch) => {
    const { recordsResult } = this.state
    let filteredRecords = recordsResult.filter(record => {
      return record.FirstName.toLowerCase().includes(userSearch.toLowerCase()) || record.LastName.toLowerCase().includes(userSearch.toLowerCase())
    })
    return filteredRecords
  }

  onSearchRecords = (event) => {
    const userSearch = event.target.value
    const { perPage } = this.state
    const filteredRecords = this.filterData(userSearch)
    console.log(userSearch)
    console.log(filteredRecords)
    const pageCount = calculatePagination(perPage, filteredRecords.length)
    this.setState({
      pageCount: pageCount,
      filteredRecords,
      searchString: userSearch
    })
  }

  onSelectChange = (event) => {
    const { filteredRecords } = this.state;
    const stringSelected = event.target.value
    if (stringSelected === 'userName') {
      filteredRecords.sort((a, b) => a.UserName.localeCompare(b.UserName))
    } else if (stringSelected === 'email') {
      filteredRecords.sort((a, b) => a.Email.localeCompare(b.Email))
    }
    this.setState({
      selectString: stringSelected
    })
  }

  handlePageClick = (data) => {
    const { perPage, filteredRecords } = this.state;
    let selected = data.selected;
    this.setState({
      paginationNumber: selected
    })
    const pageCount = calculatePagination(perPage, filteredRecords.length)
    this.setState({
      pageCount: pageCount
    })
  };


  render() {
    const { filteredRecords, pageCount, paginationNumber, perPage, loading } = this.state
    const indexToSliceStart = perPage * paginationNumber;
    const indexToSliceEnd = indexToSliceStart + perPage
    const renderedRecords = filteredRecords.slice(indexToSliceStart, indexToSliceEnd)
    return (
      <div className="App">
        <div className="page-wrapper">
          <header>
            <h1>Enya Customer Records</h1>
          </header>
          <main>
            <div className="sort-div">
              <SearchBox searchRecords={this.onSearchRecords} />
              <SelectBox selectChange={this.onSelectChange} />
            </div>
            <section className='cardList'>
              {
                !loading
                  ? <p className="loading">Loading Records</p>
                  : renderedRecords.map((record, i) => <RecordCard key={i} record={record} />)
              }
              {
                loading && renderedRecords.length === 0
                  ? <p className="loading">There are no records for this search query</p>
                  : ''
              }
            </section>
            {
              renderedRecords.length ?
                <div className="pagination-wrapper">
                  <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    initialPage={0}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'paginate_active'}
                  />
                </div> : ''
            }
          </main>
          <footer>
            <p>Built by Deji for Enya</p>
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
