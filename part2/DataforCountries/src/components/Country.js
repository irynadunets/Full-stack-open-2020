import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({name, capital, population, languages, flag, latlng}) => {
  let [weather, setWeather] = useState({})
  let [condition, setCondition] = useState({})
  useEffect(() => {      
      axios
        .get(`http://api.weatherapi.com/v1/forecast.json?key=b7d7fa161ac24e23b45171946202809&q=${capital}&days=7`)
        .then(response => {
          setWeather(response.data.current)
          setCondition(response.data.current.condition)
        })
    })

  return (
    <div>
      <h2>{name}</h2>
      <p>capital {capital}</p>
      <p>population {population}</p>
      <ul>
          {languages.map( language => (
            <li key={language.iso639_1}>{language.name}</li>
          ))}
      </ul>
      <img src={flag} alt={name} width="100" height="100"/>
      <h4>Wheather in {capital}</h4>
      <h4>temperature: {weather.temp_c} Celcius</h4>
      <img src={condition.icon} alt={condition.text} width="40" height="40"/>
      <h4>wind: {weather.wind_mph} mph direction {weather.wind_dir}</h4>
    </div>
  )
}

export default Country
