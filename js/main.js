const weatherInfo = document.getElementById("weather-info");

const API_KEY = "&APPID=5ba5ccfb59a0d086243722867e82b116";
const API_URL = "http://api.openweathermap.org/data/2.5/weather?q=";
const LOCATION = "Kokomo";
const testURL = API_URL + LOCATION + API_KEY;

const xhr = new XMLHttpRequest();
xhr.open("GET", testURL, true);
xhr.onload = function() {
  var ourData = JSON.parse(xhr.responseText);
  const locationName = ourData["name"];
  const weatherDesc = ourData["weather"][0]["description"];
  // name
  // weather - description
  //
  console.log(ourData);
  console.log(ourData["name"])
  console.log(ourData["weather"][0]["description"]);
}
xhr.send();
