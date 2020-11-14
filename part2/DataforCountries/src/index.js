import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import Filter from './components/Filter'
import CountriesList from './components/CountriesList'

const App = () => {
  let [countries, setCountries] = useState([])
  let [filteredCountries, setfilteredCountries] = useState([])
  const [ searchCountry, setsearchCountry ] = useState('')
  useEffect(() => {      
      axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          console.log(response.data)
          setCountries(response.data)
        })
    }, [])

  const handleCountrySearch = (event) => {
    setsearchCountry(event.target.value)
    setfilteredCountries(countries.filter(item => item.name.toLowerCase().includes(searchCountry.toLowerCase())))
  }

  return (
    <div>
      <Filter searchCountry = {searchCountry} handleCountrySearch = {handleCountrySearch} />
      <CountriesList filteredCountries= {filteredCountries} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
