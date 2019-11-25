const searchBtn = document.getElementById('search-button');
const currentWeatherDiv = document.getElementById('current-weather-div');
let cityInput = document.getElementById('search-input');

const getCurrentWeather = () => {

  const APIkey = "ff74d3c9ca5275d0eae234af4f58526d";
  cityInput = document.getElementById('search-input').value;
  const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + APIkey;

  axios.get(queryURL)
  .then(function(response){
    clearCurrentWeather();
    console.log(response.data);
    // Grab the weather icon and set it to a variable
    // Create an h3 with a class of "city-name" and add it to the div of current weather with the name of the city
    const newH3 = document.createElement("h3");
    newH3.classList.add("city-name");
    newH3.innerHTML = response.data.name;
    const imgIcon = document.createElement("img");
    const iconcode = response.data.weather[0].icon;
    var iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";
    imgIcon.setAttribute("src", iconurl);
    newH3.append(imgIcon);
    currentWeatherDiv.append(newH3);
    // Create p tag with a class of current-data and add it to the div of current weather with the temperature
    const tempP = document.createElement("p");
    tempP.classList.add("current-data");
    const temperatureFahrenheit = (response.data.main.temp - 273.15) * 1.80 + 32;
    tempP.innerHTML = "Temperature: " + Math.round(temperatureFahrenheit) + " °F";
    currentWeatherDiv.append(tempP);
    // Create p tag with a class of current-data and add it to the div of the current weather with the humidity
    const humidityP = document.createElement("p");
    humidityP.classList.add("current-data");
    humidityP.innerHTML = "Humidity: " + response.data.main.humidity + "%";
    currentWeatherDiv.append(humidityP);
    // Create p tag with a class of current-data and add it to the div of the current weather with the Wind
    const windP = document.createElement("p");
    windP.classList.add("current-data");
    windP.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
    currentWeatherDiv.append(windP);
    // Grab the lat and lon coords from the json object
    const lat = response.data.coord.lat;
    const lon = response.data.coord.lon;
    const queryUVURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIkey + "&lat=" + lat + "&lon=" + lon;
    // New call to grab the UV index
    axios.get(queryUVURL)
    .then(function(response){
      console.log(response.data);
      // Create a new p tag with a class of current-data and add it to the div of the current weather with the uv index
      const uvIndexP = document.createElement("p");
      uvIndexP.classList.add("current-data");
      uvIndexP.innerHTML = "UV Index: " + response.data.value;
      currentWeatherDiv.append(uvIndexP);
    });
  });


}

const clearCurrentWeather = () => {
  while(currentWeatherDiv.firstChild){
    currentWeatherDiv.removeChild(currentWeatherDiv.firstChild);
  }
  cityInput = document.getElementById('search-input').value = "";
}

const getForecast = () => {

}

const updateSearchHistory = () => {

}

searchBtn.addEventListener("click", getCurrentWeather);
