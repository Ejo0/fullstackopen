import { useEffect, useState } from "react";
import axios from "axios"


const App = () => {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')
  const [weather, setWeather] = useState({'foo':'bar'})

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    if (countriesToShow.length === 1) {
      const capital = countriesToShow[0].capital[0]
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
        .then(response => {
          if (response.status === 200) {
            setWeather(response.data)
          }
        })
    }
  }, [countryFilter])

  const handleFilterChange = (event) => {
    setCountryFilter(event.target.value)
  }

  const countriesToShow = countries.filter(
    c => c.name.common.toLowerCase().includes(countryFilter.toLowerCase())
  )

  return (
    <div>
      <Content
        countryFilter={countryFilter}
        handleFilterChange={handleFilterChange}
        countries={countriesToShow}
        weather={weather}
      />
    </div>
  )
}

const Content = ({countryFilter, handleFilterChange, countries, weather}) => {
  return (
    <div>
      Find countries:
      <input value={countryFilter} onChange={handleFilterChange}/>
      <CountryList
        countries={countries}
        handleFilterChange={handleFilterChange}
        weather={weather}
      />
    </div>
  )
}

const CountryList = ({countries, handleFilterChange, weather}) => {
  if (countries.length > 10) return <div>Too many matches, specify another</div>
  if (countries.length === 1) return <CountryView country={countries[0]} weather={weather}/>
  return (
    <div>
      {countries.map(c => (
        <span key={c.name.common}>{c.name.common}
          <button value={c.name.common} onClick={handleFilterChange}>show</button>
          <br></br>
        </span>
      ))}
    </div>
  )
}

const CountryView = ({country, weather}) => {
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

    <b>Languages:</b>
    <ul>
      {languages.map(l => <li key={l}>{l}</li>)}
    </ul>
    <img src={country.flags.png} alt="Picture of the flag"></img>
    <h2>Weather in {country.capital}</h2>
    <WeatherInfo weather={weather}/>
  </div>
  )
}

const WeatherInfo = ({weather}) => {
  if (!('main' in weather)) {
    return <p>Waiting for weather information..</p>
  }
  const iconUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  return (
    <div>
      <p>Temperature: {weather.main.temp} Celcius</p>
      <img src={iconUrl} alt="Icon of weather"></img>
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  )
}

export default App
