
const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weatherDescription');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const weatherIcon = document.getElementById('weatherIcon');
const weatherInfo = document.querySelector('.weather-info');
const dateElement = document.getElementById('date');

const apiKey = '3724d98ae9a8ad6a5f4fd8472a46a74e'; // Replace with your actual API key

searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getWeatherData(city);
    }
});

cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const city = cityInput.value;
        if (city) {
            getWeatherData(city);
        }
    }
});


async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();

        // Update UI with weather data
        cityName.textContent = data.name + ", " + data.sys.country;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        wind.textContent = `Wind: ${data.wind.speed} m/s`;

        const iconCode = data.weather[0].icon;
        weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/w/${iconCode}.png" alt="Weather Icon">`;

        // Get and display the current date
        const currentDate = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = currentDate.toLocaleDateString('en-US', options);

        weatherInfo.style.display = 'block'; // Show the weather info
    } catch (error) {
        console.error('Error fetching weather data:', error);
        cityName.textContent = 'City not found'; // Or display a more user-friendly message
        weatherInfo.style.display = 'none'; // Hide the weather info if there's an error
    }
}