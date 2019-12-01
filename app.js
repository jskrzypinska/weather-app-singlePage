const appId = '8ff59c308b48432bbbb3259838f7c7f7';
const units = 'metric';
let searchMethod = 'q';
let counter = 0;

function searchWeather(cityName) {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?${searchMethod}=${cityName}&APPID=${appId}&units=${units}`)
        .then((result) => {
            return result.json();
        }).then((result) => {
           init(result);
        }).catch(err => {
           showError(err);
        });
    ;
}

function init(resultFromServer) {
    console.log(resultFromServer);

    const locationHeader = document.getElementsByClassName('locationHeader');
    const dateTime = document.getElementsByClassName('dateTime');
    const weatherIcon = document.getElementsByClassName('weatherIcon');    
    const temperatureValue = document.getElementsByClassName('temperatureValue');
    const weatherDescription = document.getElementsByClassName('weatherDescription');

    for(let i=0; i<locationHeader.length; i++){locationHeader[i].innerHTML = resultFromServer.city.name;}
    for(let i=0; i<dateTime.length; i++){dateTime[i].innerHTML = resultFromServer.list[i+counter].dt_txt;}
    for(let i=0; i<weatherIcon.length; i++){weatherIcon[i].src = 'img/' + resultFromServer.list[i+counter].weather[0].icon + '.png';}
    for(let i=0; i<temperatureValue.length; i++){temperatureValue[i].innerHTML = Math.floor(resultFromServer.list[i+counter].main.temp) + '&#176;C';}
    for(let i=0; i<weatherDescription.length; i++){weatherDescription[i].innerHTML = resultFromServer.list[i+counter].weather[0].description;}

}

document.getElementById('searchBtn').addEventListener('click', (e) => {
    e.preventDefault();
    counter = 0;
    let cityName = document.getElementById('searchInput').value;
    if(cityName) {
        searchWeather(cityName);
    }    
    document.querySelector(".cards-container").style.display = "flex";
    document.querySelector(".skip-date").style.display = "flex";    
});

document.getElementById('prevDateBtn').addEventListener('click', (e) => {
    if(counter > 0){ counter--; }     
    let cityName = document.getElementById('searchInput').value;
    if(cityName) {
        searchWeather(cityName);
    } 
});

document.getElementById('nextDateBtn').addEventListener('click', (e) => {
    if(counter < 35){ counter++; }
    let cityName = document.getElementById('searchInput').value;
    if(cityName) {
        searchWeather(cityName);
    } 
});

function showError(err) {
    alert("Can't show weather");
}