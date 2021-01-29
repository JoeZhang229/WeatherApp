const form = document.querySelector('form');
const select = document.querySelector('select');
form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    inputWeather();
}

async function getWeather(loc, unit) {
    try {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${loc}&units=${unit}&appid=f5be0ad25837c2d433323e5dcb4603ec`,
    { 
         mode: 'cors' 
        });
    const weatherData = await response.json();
    const procData = processData(weatherData);
    displayData(procData);
    } catch (err) {
        console.log(err);
    }
}

function processData(weatherData) {
    const processed = {
        weather: weatherData.weather[0].description,
        feelsLike: weatherData.main.feels_like,
        currentTemp: weatherData.main.temp,
        wind: weatherData.wind.speed,
        humidity: weatherData.main.humidity,
        location: weatherData.name.toUpperCase(),
        country: weatherData.sys.country.toUpperCase(),
    };

    return processed;
}

function processDiv(input, output) {
    document.querySelector(input).textContent = output; 
}

function displayData(procData) {
    const displayWeather = document.getElementsByClassName('display');

    processDiv('.weather', `Description: ${procData.weather}`);
    processDiv('.location', `${procData.location}, ${procData.country}`);
    processDiv('.feels-like', `FEELS LIKE: ${Math.round(procData.feelsLike)}`);
    processDiv('.humidity', `HUMIDITY: ${procData.humidity}`);

    if (select.value === 'Celcius') {
        processDiv('.wind-speed', `WIND: ${procData.wind} KPH`);
        processDiv('.temperature', `Temperature: ${Math.round(procData.currentTemp)} C`);
    } else {
    processDiv('.wind-speed', `WIND: ${procData.wind} MPH`);
    processDiv('.temperature', `Temperature: ${Math.round(procData.currentTemp)} F`);
    }
}

function inputWeather() {
    const searchBar = document.querySelector('input[type="text"]');
    const locationInput = searchBar.value;
    const Fahrenheit = select.options[0].value;
    const Celcius = select.options[1].value;

    if (select.value === 'Fahrenheit') {
        getWeather(locationInput, 'imperial')
    } else if (select.value === 'Celcius') {
        getWeather(locationInput, 'metric')
    }
}

getWeather('San Francisco','imperial');