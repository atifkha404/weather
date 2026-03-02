// API key
const API_KEY = "f52f3de8f54e78638be183ab11060d0c";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// DOM Elements
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
const errorMessage = document.getElementById('error-message');

const cityName = document.getElementById('city-name');
const dateEl = document.getElementById('date');
const temp = document.getElementById('temp');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const feelsLike = document.getElementById('feels-like');
const description = document.getElementById('description');
const weatherIcon = document.getElementById('icon');

// Date update function
function updateDate() {
    const now = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    dateEl.textContent = now.toLocaleDateString('en-IN', options);
}

// Weather function
async function checkWeather(city) {
    try {
        weatherInfo.style.opacity = '0.5';
        weatherInfo.style.display = 'block';
        errorMessage.classList.remove('show');

        const response = await fetch(`${API_URL}${city}&appid=${API_KEY}`);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        cityName.textContent = `${data.name}, ${data.sys.country}`;
        temp.textContent = Math.round(data.main.temp);
        humidity.textContent = data.main.humidity;
        wind.textContent = Math.round(data.wind.speed * 3.6); // m/s → km/h
        feelsLike.textContent = Math.round(data.main.feels_like);
        description.textContent = data.weather[0].description;

        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        weatherInfo.style.opacity = '1';

    } catch (error) {
        weatherInfo.style.display = 'none';
        errorMessage.classList.add('show');
    }
}

// Button click
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        checkWeather(city);
    }
});


cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            checkWeather(city);
        }
    }
});

// Initialize
updateDate();
checkWeather('Delhi');
