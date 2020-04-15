const axios = require('axios')

const location = {
  richmondHill: {lat: 43.87, lon: -79.44}
}

function findIcon(iconCode) {
  console.log(iconCode.toString())
  switch(iconCode.toString()) {
    case "01d": 
    case "01n": return "☀️"; break
    case "02d": 
    case "02n": return "⛅"; break
    case "03d":
    case "03n":
    case "04d": 
    case "04n": return "☁️"; break
    case "09d":
    case "09n":
    case "10d": 
    case "10n": return "🌧️"; break
    case "11d": 
    case "11n": return "🌩️"; break
    case "13d": 
    case "13n": return "❄️"; break
    case "50d": 
    case "50n": return "🌫️"; break
    default: return ""
  }
}

async function fetchWeather() {
  const apiKey = process.env.OPEN_WEATHER_API
  const loc = location.richmondHill
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lon}&units=metric&appid=${apiKey}`
  return axios.get(url)
    .then(res => res.data)
    .then(data => ({
      name: data.name,
      weather_desc: data.weather[0].description,
      weather_icon: findIcon(data.weather[0].icon),
      temp_min: data.main.temp_min,
      temp_max: data.main.temp_max,
    }))
}

module.exports.WeatherApi = {
  fetchWeather: fetchWeather
}
