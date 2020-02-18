const locationInput = document.getElementById("location-input");
const getWeatherBtn = document.getElementById("get-weather-btn");
const weatherInfo = document.getElementById("weather-info");
locationInput.value = "";
locationInput.focus();

const API_KEY = "&APPID=5ba5ccfb59a0d086243722867e82b116";
const API_URL = "http://api.openweathermap.org/data/2.5/weather?q=";
const LOCATION = "Kokomo&mode=json&units=imperial";
const units = "imperial";
// units=metric for C or units=imperial for F

getWeatherBtn.addEventListener("click", function() {
  const xhr = new XMLHttpRequest();
  const LOCATION = locationInput.value + "&mode=json&units="+units;
  const testURL = API_URL + LOCATION + API_KEY;
  xhr.open("GET", testURL, true);
  xhr.onload = function() {
    var weatherData = JSON.parse(xhr.responseText);
    if (xhr.status == 404) {
      alert("Please enter a proper location.");
      locationInput.value = "";
      locationInput.focus();
      return;
    }
    const locationName = weatherData["name"];
    const weatherDescription = weatherData["weather"][0]["description"];
    weatherInfo.insertAdjacentHTML("beforeend", "<p>" + locationName +"</p>");
    weatherInfo.insertAdjacentHTML("beforeend", "<p>" + weatherDescription +"</p>");
  }
  xhr.send();
  locationInput.value = "";
  locationInput.focus();
});
