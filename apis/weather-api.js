const axios = require('axios')

const location = {
  richmondHill: {lat: 43.87, lon: -79.44}
}

function WeatherDTO(weather) {
  this.name = weather.name
  this.weather_desc = weather.weather[0].description
  this.weather_icon = findIcon(weather.weather[0].icon)
  this.temp_min = weather.main.temp_min
  this.temp_max = weather.main.temp_max
}

function findIcon(iconCode) {
  switch(iconCode.toString()) {
    case "01d": 
    case "01n": return "☀️";
    case "02d": 
    case "02n": return "⛅";
    case "03d":
    case "03n":
    case "04d": 
    case "04n": return "☁️";
    case "09d":
    case "09n":
    case "10d": 
    case "10n": return "🌧️";
    case "11d": 
    case "11n": return "🌩️";
    case "13d": 
    case "13n": return "❄️";
    case "50d": 
    case "50n": return "🌫️";
    default: return ""
  }
}

async function fetchWeather() {
  const apiKey = process.env.OPEN_WEATHER_API
  const loc = location.richmondHill
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lon}&units=metric&appid=${apiKey}`
  return axios.get(url)
    .then(res => res.data)
    .then(data => new WeatherDTO(data))
}

module.exports.WeatherApi = {
  fetchWeather: fetchWeather
}
