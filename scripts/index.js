const searchBtn = document.getElementById('search-button');
const currentWeatherDiv = document.getElementById('current-weather-div');

const getCurrentWeather = () => {

  const APIkey = "ff74d3c9ca5275d0eae234af4f58526d";
  let cityInput = document.getElementById('search-input').value;
  const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + APIkey;

  axios.get(queryURL)
  .then(function(response){
    console.log(response.data);
    // create an h3 with a class of "city-name" and add it to the div of current weather with the name of the city
    const newH3 = document.createElement("h3");
    newH3.classList.add("city-name");
    newH3.innerHTML = response.data.name;
    currentWeatherDiv.append(newH3);
    // Create p tag with a class of weather-data and add it to the div of current weather with the temperature
    const tempP = document.createElement("p");
    tempP.classList.add("current-data");
    const temperatureFahrenheit = (response.data.main.temp - 273.15) * 1.80 + 32;

    tempP.innerHTML = "Temperature: " + Math.round(temperatureFahrenheit) + " °F";
    currentWeatherDiv.append(tempP);
  });


}

const clearCurrentWeather = () => {
  
}

const getForecast = () => {

}

const updateSearchHistory = () => {

}

searchBtn.addEventListener("click", getCurrentWeather);
