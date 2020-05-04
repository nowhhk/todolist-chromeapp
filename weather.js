const weather = document.querySelector(".js-weather");

const API_KEY = "33e96425a4a5e936a5f72d8513b6d09b";
const COORDS = 'coords';

function getWeather(lat, lng){
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        console.log(json)
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature}℃ @ ${place}`
    });

}

function saveCoord(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoord(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log('cant access geo location');
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoord = localStorage.getItem(COORDS);
    if(loadedCoord === null){
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoord);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}


function init(){
    loadCoords();
}
init();