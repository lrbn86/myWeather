<?php

  $units = $_GET["units"];
  if (!empty($_GET["location"])) {
    $api_key = '&APPID=5ba5ccfb59a0d086243722867e82b116';
    if ($units == 'C') {
      $units_m = "&units=metric";
    } else if ($units == 'F') {
      $units_m = "&units=imperial";
    }
    $api_url = "http://api.openweathermap.org/data/2.5/weather?q=" . urlencode($_GET["location"]) . $api_key . $units_m;
    $weather_json = file_get_contents($api_url);
    $weather_array = json_decode($weather_json, true);
    $location = $weather_array["name"];
    $temp = $weather_array["main"]["temp"];
    $weather_desc = $weather_array["weather"][0]["description"];
    $weatherMain = $weather_array["weather"][0]["main"];
    // Rain, Clouds, Clear, Thunderstorm, Drizzle, Snow
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>myWeather</title>
  <link rel="stylesheet" type="text/css" href="css/styles.css">
</head>
<?php
  if ($weatherMain == 'Clouds') {
    $BG = "(gray, lightblue)";
  } else if ($weatherMain == 'Rain') {
    $BG = "(black, lightblue)";
  } else if ($weatherMain == "Mist") {
    $BG = "(gray, white)";
  } else if ($weatherMain == "Snow") {
    $BG = "(lightblue, white)";
  } else if ($weatherMain == "Clear") {
    $BG = "(white, lightblue)";
  } else {
    $BG = "(orange, red)";
  }
  echo "<body style='background-image:linear-gradient" . $BG . ";'>";
?>
  <h1 id="app-title" >my<span style="color:orange;">Weather</span></h1>
  <form action="">
    <select id="units" name="units">
      <option value="C">C</option>
      <option value="F">F</option>
    </select>
    <input id="location-input" type="text" name="location" placeholder="Enter a city name" />
    <button id="get-weather-btn">Get Weather</button>
  </form>
  <div id="weather-info">
    <p id="location-name">
      <?php
        echo $location;
      ?>
    </p>
    <p id="location-temp">
      <?php
        if ($_GET["location"] != "") {
          echo $temp . "&#176" . $units;
        }
      ?>
    </p>
    <p id="location-weather-desc">
      <?php
        echo $weather_desc;
      ?>
    </p>
  </div>
  <footer>
    By Brandon Nguyen (<a href="https://www.brandonnguyen.dev/" target="_blank">@lrbn86</a>). 
    Data: <a href="https://openweathermap.org/" target="_blank">OpenWeatherMap</a>
  </footer>
</body>
</html>
