import React, { useState } from 'react'
import Country from './Country'

const CountriesList = ({ filteredCountries }) => {
  const [show, setShow] = useState('')
  const count = filteredCountries.length;
    return (
      count > 10 ? 'Too many matches, specify another filter' :
       count > 1 ?
       <ul>
           {  show ? <Country key={show.alpha2Code} name={show.name} capital={show.capital}
            population={show.population} languages={show.languages} flag={show.flag} latlng={show.latlng}/>
             : filteredCountries.map( country => (
               <p key={country.alpha2Code}>{country.name}<button onClick={() => setShow(country)}>Show</button></p>
           ))}
       </ul>
        :
        <ul>
            {filteredCountries.map( country => (
              <Country key={country.alpha2Code} name={country.name} capital={country.capital}
              population={country.population} languages={country.languages} flag={country.flag} latlng={country.latlng}/>
            ))}
        </ul>
    )
}

export default CountriesList
