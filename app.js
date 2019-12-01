let appId = "0ccb533d897cd90cce0c87cb4db7910c";
let units = "metric";
let searchMethod = "q";
let counter = 0;

function searchWeather(searchTerm) {
  fetch(
    `http://api.openweathermap.org/data/2.5/forecast?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`
  )
    .then(result => {
      return result.json();
    })
    .then(result => {
      init(result);
    })
    .catch(err => {
      cardContainer.style.display = "none";
      Swal.fire("Any fool can use a computer - couldn't find a weather.");
    });
}

function init(resultFromServer) {
  let currentDate = document.getElementById("current-date");
  let day1 = document.getElementById("date1");
  let day2 = document.getElementById("date2");
  let day3 = document.getElementById("date3");
  let day4 = document.getElementById("date4");

  let cityName = resultFromServer.city.name;

  setDayWeather(currentDate, resultFromServer.list[0 + counter], cityName);
  setDayWeather(day1, resultFromServer.list[1 + counter], cityName);
  setDayWeather(day2, resultFromServer.list[2 + counter], cityName);
  setDayWeather(day3, resultFromServer.list[3 + counter], cityName);
  setDayWeather(day4, resultFromServer.list[4 + counter], cityName);
}

document.getElementById("flexForm").addEventListener("click", function(e) {
  e.preventDefault();
});

let cardContainer = document.querySelector(".cards-container");
let skipDate = document.querySelector(".skip-date");

document.getElementById("searchBtn").addEventListener("click", () => {
  counter = 0;
  let searchTerm = document.getElementById("searchInput").value;
  if (searchTerm) {
    searchWeather(searchTerm);
  }

  cardContainer.style.display = "flex";
  skipDate.style.display = "flex";
});

document.getElementById("prevDateBtn").addEventListener("click", () => {
  if (counter > 0) {
    counter--;
  }
  let searchTerm = document.getElementById("searchInput").value;
  if (searchTerm) {
    searchWeather(searchTerm);
  }
});

document.getElementById("nextDateBtn").addEventListener("click", e => {
  if (counter < 35) {
    counter++;
  }
  let searchTerm = document.getElementById("searchInput").value;
  if (searchTerm) {
    searchWeather(searchTerm);
  }
});

function setDayWeather(dayDiv, resultElement, cityName) {
  let city = dayDiv.querySelector(".card-location");
  let imgWeather = dayDiv.querySelector(".document-icon-img");
  let temperature = dayDiv.querySelector(".temperature-value");
  let weatherDescription = dayDiv.querySelector(".temperature-description");
  let date = dayDiv.querySelector(".card-date");

  let iconId = resultElement.weather[0].icon;

  imgWeather.src = `img/${iconId}.png`;

  let resultDescription = resultElement.weather[0].description;

  weatherDescription.innerText =
    resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

  temperature.innerHTML = Math.floor(resultElement.main.temp) + "&#x2103";

  city.innerHTML = `<h2>${cityName}</h2>`;

  let currentDate = new Date(resultElement.dt * 1000);
  let dayWrapper = moment(currentDate);
  let dayString = dayWrapper.format("D MMMM YYYY, h:mm:ss a");
  date.innerHTML = `<h4>${dayString}</h4><hr/>`;
}
