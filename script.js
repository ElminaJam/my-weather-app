// Date & hour
let now = new Date();
let div = document.querySelector(".day");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
div.innerHTML = `${day} ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
              <div class="weather-forecast-date">${formatDay(
                forecastDay.time
              )}</div><img src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
          forecastDay.condition.icon
        }.png" alt="" width="42"/>
              <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-max">${Math.round(
                  forecastDay.temperature.maximum
                )}°</span>
                <span class="weather-forecast-temperature-min">${Math.round(
                  forecastDay.temperature.minimum
                )}°</span>
              </div>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=231802987t6b86727b0cd8a49eao449f&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// Search city
function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.temperature.current
  );
  celsiusTemperature = response.data.temperature.current;

  document.querySelector("#feelslike").innerHTML = Math.round(
    response.data.temperature.feels_like
  );
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}

function searchCity(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=231802987t6b86727b0cd8a49eao449f&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=231802987t6b86727b0cd8a49eao449f&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let form = document.querySelector("#search-form");
form.addEventListener("submit", submit);

searchCity("Rome");

//Change background image
let hour = new Date().getHours();
const backgroundImageContainer = document.querySelector(
  "#background-image-container"
);
if (hour > 17 && hour < 21) {
  backgroundImageContainer.style.backgroundImage = `url("https://s3.amazonaws.com/shecodesio-production/uploads/files/000/081/044/original/dusk.jpg?1683561814")`;
} else if (hour > 20 || hour < 5) {
  backgroundImageContainer.style.backgroundImage = `url("https://s3.amazonaws.com/shecodesio-production/uploads/files/000/081/045/original/night-sky.jpg?1683561828")`;
}
//Change text color
let time = new Date().getHours();
body = document.querySelector("body");
id = document.querySelector("#forecast");
if (time > 20 || time < 5) {
  id.style.color = "#fff195";
  id.style.textShadow = "#000 0px 0px 5px";
  body.style.color = "#fff195";
  body.style.textShadow = "#000 0px 0px 5px";
}
