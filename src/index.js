let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let week = document.querySelector("#selector-week");
week.innerHTML = `${day} ${hours}:${minutes}`;

let apiKey = "b8b2182b5c88a4be00e7803c6396e4a0";

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#inlineFormInputName2");

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=b8b2182b5c88a4be00e7803c6396e4a0`;

  function showTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#temperature");
    let windElement = document.querySelector("#wind");
    let humidityElement = document.querySelector("#humidity");
    let description = document.querySelector("#description");
    let iconElement = document.querySelector("#icon");
    temperatureElement.innerHTML = `${temperature}`;
    windElement.innerHTML = `Wind: ${response.data.wind.speed} Km/h`;
    humidityElement.innerHTML = `Humidity: ${response.data.main.humidity} %`;
    description.innerHTML = `${response.data.weather[0].description}`;
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }

  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function degrees(event) {
  event.preventDefault();
  let title = document.querySelector("#temperature");
  title.innerHTML = `18`;
}

let h2title = document.querySelector("#celsius");
h2title.addEventListener("click", degrees);

function unit(event) {
  event.preventDefault();
  let link = document.querySelector("#temperature");
  link.innerHTML = `64,4`;
}

let h2link = document.querySelector("#fahrenheit");
h2link.addEventListener("click", unit);

function showPosition(position) {
  let apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;

  function showCity(response) {
    let newCurrentTemperature = Math.round(response.data.main.temp);
    let newCurrentTemperatureElement = document.querySelector("#temperature");
    let cityName = document.querySelector("h1");
    let currentWindElement = document.querySelector("#wind");
    let currentHumidityElement = document.querySelector("#humidity");
    let currentDescriptionElement = document.querySelector("#description");
    cityName.innerHTML = `${response.data.name}`;
    newCurrentTemperatureElement.innerHTML = `${newCurrentTemperature}`;
    currentWindElement.innerHTML = `Wind: ${response.data.wind.speed} Km/h`;
    currentHumidityElement.innerHTML = `Humidity: ${response.data.main.humidity} %`;
    currentDescriptionElement.innerHTML = `${response.data.weather[0].description}`;
  }

  axios.get(apiUrlCurrent).then(showCity);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#selector-button");
button.addEventListener("click", getCurrentPosition);
