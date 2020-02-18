const unitsSelect = document.getElementById("units");
const getWeatherBtn = document.getElementById("get-weather-btn");
const weatherInfo = document.getElementById("weather-info");

const locationInput = document.getElementById("location-input");
locationInput.value = "";
locationInput.focus();

const locationNameDisplay = document.getElementById("location-name");
const locationTempDisplay = document.getElementById("location-temp");
const locationWeatherDescDisplay = document.getElementById("location-weather-desc");
const API_KEY = '5ba5ccfb59a0d086243722867e82b116';
const API_URL = "http://api.openweathermap.org/data/2.5/weather?q=";
var units = "imperial";
// units=metric for C or units=imperial for F
// Listen for Enter key on input field
locationInput.addEventListener("keyup", function onEvent(e) {
  if (e.keyCode === 13) {
    getWeatherInfo();
  }
});

getWeatherBtn.addEventListener("click", getWeatherInfo);

function getWeatherInfo() {
  if (unitsSelect.value === "C") {
    units = "metric";
  } else if (unitsSelect.value == "F") {
    units = "imperial";
  }
  
  const xhr = new XMLHttpRequest();
  const LOCATION = locationInput.value + "&mode=json&units=" + units;
  const testURL = API_URL + LOCATION + API_KEY;
  
  xhr.open("GET", testURL, true);
  xhr.onload = function() {
    var weatherData = JSON.parse(xhr.responseText);
    if (xhr.status >= 400) {
      alert("Please enter a proper location.");
      locationInput.value = "";
      locationInput.focus();
      return;
    }
    
    const weatherReport = {
      locationName : weatherData["name"],
      weatherDescription : weatherData["weather"][0]["description"],
      temperature : weatherData["main"]["temp"]
    };
    
    locationNameDisplay.innerHTML = weatherReport["locationName"];
    locationTempDisplay.innerHTML = Math.round(weatherReport["temperature"]) + "&#176" + unitsSelect.value;
    locationWeatherDescDisplay.innerHTML = weatherReport["weatherDescription"];
    // Weather Conditions to use (there are more): Clouds, Rain, Snow, Thunderstorm, Drizzle
    // TODO: Change background image depending on current weather...
    const currentWeather = weatherData["weather"][0]["main"];
    if (currentWeather === "Rain") {
      IMAGE_URL = "linear-gradient(black, lightblue)";
    } else if (currentWeather === "Clouds") {
      IMAGE_URL = "linear-gradient(gray, lightblue)";
    } else if (currentWeather === "Mist") {
      IMAGE_URL = "linear-gradient(gray, white)";
    } else if (currentWeather === "Snow") {
      IMAGE_URL = "linear-gradient(lightblue, white)";
    } else {
      IMAGE_URL = "linear-gradient(orange, red)";
    }
    document.body.style.backgroundImage = IMAGE_URL;
  }
  xhr.send();
  locationInput.value = "";
  locationInput.focus();
}
