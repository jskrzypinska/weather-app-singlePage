let appId = "0ccb533d897cd90cce0c87cb4db7910c";
let units = "metric";
let searchMethod = "q";

let cardContainer = document.querySelector(".cards-container");

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
  cardContainer.style.display = "flex";

  let currentDate = document.getElementById("current-date");
  let day1 = document.getElementById("date1");
  let day2 = document.getElementById("date2");
  let day3 = document.getElementById("date3");
  let day4 = document.getElementById("date4");

  let cityName = resultFromServer.city.name;

  setDayWeather(currentDate, resultFromServer.list[0], cityName);
  setDayWeather(day1, resultFromServer.list[1], cityName);
  setDayWeather(day2, resultFromServer.list[2], cityName);
  setDayWeather(day3, resultFromServer.list[3], cityName);
  setDayWeather(day4, resultFromServer.list[4], cityName);
}

document.getElementById("flexForm").addEventListener("click", function(e) {
  e.preventDefault();
});

document.getElementById("searchBtn").addEventListener("click", () => {
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

  city.innerHTML = `<h1>${cityName}</h1>`;

  let currentDate = new Date(resultElement.dt * 1000);
  let dayWrapper = moment(currentDate);
  let dayString = dayWrapper.format("D MMMM YYYY, h:mm:ss a");
  date.innerHTML = `<h4>${dayString}</h4><hr/>`;
}
