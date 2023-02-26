var RESPONCE = {
  data: {
    city: "Lisbon",
    country: "Portugal",
    coordinates: {
      longitude: -9.1365919,
      latitude: 38.7077507,
    },
    daily: [
      {
        condition: {
          description: "overcast clouds",
          icon_url:
            "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png",
          icon: "broken-clouds-day",
        },
        temperature: {
          day: 16.9,
          minimum: 11.86,
          maximum: 18.52,
          humidity: 57,
        },
        wind: {
          speed: 4.81,
        },
        time: 1676721600,
      },
      {
        condition: {
          description: "light rain",
          icon_url:
            "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png",
          icon: "rain-day",
        },
        temperature: {
          day: 17.18,
          minimum: 10.46,
          maximum: 19.84,
          humidity: 54,
        },
        wind: {
          speed: 4.73,
        },
        time: 1676808000,
      },
      {
        condition: {
          description: "light rain",
          icon_url:
            "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png",
          icon: "rain-day",
        },
        temperature: {
          day: 17.13,
          minimum: 12.22,
          maximum: 18.49,
          humidity: 62,
        },
        wind: {
          speed: 2.84,
        },
        time: 1676894400,
      },
      {
        condition: {
          description: "light rain",
          icon_url:
            "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png",
          icon: "rain-day",
        },
        temperature: {
          day: 16.45,
          minimum: 11.61,
          maximum: 17.77,
          humidity: 68,
        },
        wind: {
          speed: 4.79,
        },
        time: 1676980800,
      },
      {
        condition: {
          description: "broken clouds",
          icon_url:
            "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png",
          icon: "broken-clouds-day",
        },
        temperature: {
          day: 15.3,
          minimum: 12.19,
          maximum: 15.84,
          humidity: 61,
        },
        wind: {
          speed: 4.78,
        },
        time: 1677067200,
      },
      {
        condition: {
          description: "overcast clouds",
          icon_url:
            "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png",
          icon: "broken-clouds-day",
        },
        temperature: {
          day: 14.49,
          minimum: 11.43,
          maximum: 16.1,
          humidity: 60,
        },
        wind: {
          speed: 6.13,
        },
        time: 1677153600,
      },
      {
        condition: {
          description: "sky is clear",
          icon_url:
            "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png",
          icon: "clear-sky-day",
        },
        temperature: {
          day: 12.19,
          minimum: 8.73,
          maximum: 12.6,
          humidity: 42,
        },
        wind: {
          speed: 8.7,
        },
        time: 1677240000,
      },
    ],
  },
};

function getWeekDay(offset) {
  let DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const todaysWeekDayIndex = new Date().getDay();
  const weekDayIndex = (todaysWeekDayIndex + offset) % 7;
  const weekDay = DAYS[weekDayIndex];
  return weekDay;
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
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
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function displayForecast(response) {
  let forcast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="forcast-row">`;

  forcast.forEach(function (dailyForcast, index) {
    let maxTemp = Math.round(dailyForcast.temperature.maximum);
    let minTemp = Math.round(dailyForcast.temperature.minimum);
    let weekDay = getWeekDay(index);
    forecastHTML =
      forecastHTML +
      `
    <div class="forcast-column">
        <div class="weather-forecast-date">
          ${weekDay}
        </div>
        <img
          src=${dailyForcast.condition.icon_url}
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-min"> ${minTemp}° </span>
          <span class="weather-forecast-temperature-max"> ${maxTemp}° </span>
        </div>
    </div>
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios
    .get(apiUrl)
    .then(displayTemperature)
    .then(() => {
      let apiKey = "8a42d63ca72b703e22234f6otedfed64";
      let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
      axios.get(apiUrl).then(displayForecast);
    });
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");
