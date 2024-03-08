const apiKey = ""

const searchButton = document.querySelector("#searchBtn"),
      tempVal = document.querySelector(".tempVal"),
      cityVal = document.querySelector("h3.city"),
      humidityVal = document.querySelector(".humidity"),
      windSpeedVal = document.querySelector(".windspeed")

searchButton.addEventListener("click", async function(){
    let searchCity = document.querySelector("#searchCity")
    if(searchCity.value === ""){
        searchCity.value = ""
        return alert("Input atleast one character")
    }
    
    const data = await getLatLon(apiKey, searchCity.value)
    if(data === undefined){
        searchCity.value = ""
        return alert("oops, the city you typed didn't exist")
    }

    const { lat: lat, lon: lon } = data

    const weatherData = await getWeatherData(apiKey, lat, lon)
    const cityName = weatherData["name"],
          humidity = weatherData["main"]["humidity"],
          weatherInfo = weatherData["weather"][0]["main"],
          wind = weatherData["wind"]["speed"],
          temp = Math.round(weatherData["main"]["temp"])
    
    tempVal.innerHTML = temp
    cityVal.innerHTML = cityName
    humidityVal.innerHTML = humidity + "%"
    windSpeedVal.innerHTML = wind + " km/h"

    searchCity.value = ""
})

async function getWeatherData(apiKey = "", lat = 0, lon = 0){
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    const response = await fetch(apiURL)
    const weatherData = await response.json()

    return weatherData
}

async function getLatLon(apiKey = "", cityName = ""){
    const geoCodingURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
    const response = await fetch(geoCodingURL)
    const cityData = await response.json()

    return cityData[0]
}