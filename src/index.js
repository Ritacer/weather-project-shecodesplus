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
    celsiusTemperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#temperature");
    let windElement = document.querySelector("#wind");
    let humidityElement = document.querySelector("#humidity");
    let description = document.querySelector("#description");
    let iconElement = document.querySelector("#icon");

    temperatureElement.innerHTML = `${celsiusTemperature}`;
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

function showPosition(position) {
  let apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;

  function showCity(response) {
    let newCurrentTemperature = Math.round(response.data.main.temp);
    let newCurrentTemperatureElement = document.querySelector("#temperature");
    let cityName = document.querySelector("h1");
    let currentWindElement = document.querySelector("#wind");
    let currentHumidityElement = document.querySelector("#humidity");
    let currentDescriptionElement = document.querySelector("#description");
    let currentIcon = document.querySelector("#icon");
    cityName.innerHTML = `${response.data.name}`;
    newCurrentTemperatureElement.innerHTML = `${newCurrentTemperature}`;
    currentWindElement.innerHTML = `Wind: ${response.data.wind.speed} Km/h`;
    currentHumidityElement.innerHTML = `Humidity: ${response.data.main.humidity} %`;
    currentDescriptionElement.innerHTML = `${response.data.weather[0].description}`;
    currentIcon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }

  axios.get(apiUrlCurrent).then(showCity);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = celsiusTemperature;
}

let celsiusTemperature = null;

let button = document.querySelector("#selector-button");
button.addEventListener("click", getCurrentPosition);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemperature);
