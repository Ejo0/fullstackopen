import { useEffect, useState } from "react";
import axios from "axios"

const App = () => {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setCountryFilter(event.target.value)
  }

  const countriesToShow = countries.filter(
    c => c.name.common.toLowerCase().includes(countryFilter.toLowerCase())
  )

  return (
    <div>
      Find countries: 
      <input value={countryFilter} onChange={handleFilterChange}/>
      <CountryList countries={countriesToShow}/>
    </div>
  )
}

const CountryList = ({countries}) => {
  if (countries.length > 10) return <div>Too many matches, specify another</div>
  if (countries.length === 1) return <CountryView country={countries[0]}/>
  return (
    <div>
      {countries.map(c => <span key={c.name.common}>{c.name.common}<br></br></span>)}
    </div>
  )
}

const CountryView = ({country}) => {
  const languages = (
    Object.keys(country.languages).map(k => country.languages[k])
  )
  
  return (
    <div>
    <h1>{country.name.common}</h1>
    <p>
      Capital: {country.capital[0]}<br></br>
      Area: {country.area}
    </p>

    <b>languages:</b>
    <ul>
      {languages.map(l => <li key={l}>{l}</li>)}
    </ul>
    <img src={country.flags.png} alt="Picture of the flag"></img>
  </div>
  )
}

export default App
