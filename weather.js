// API keys and URLs
const geoDB_API_KEY = 'YOUR_RAPIDAPI_KEY';
const weather_API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';

// Fetch the list of countries
function fetchCountries() {
    fetch('https://wft-geo-db.p.rapidapi.com/v1/geo/countries', {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': geoDB_API_KEY,
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
    })
    .then(response => response.json())
    .then(data => {
        const countrySelect = document.getElementById('country-select');
        data.data.forEach(country => {
            const option = document.createElement('option');
            option.value = country.code;
            option.textContent = country.name;
            countrySelect.appendChild(option);
        });
    })
    .catch(error => console.error('Error fetching countries:', error));
}

// Fetch cities based on the selected country
function fetchCities(countryCode) {
    const citySelect = document.getElementById('city-select');
    citySelect.innerHTML = '<option value="" disabled selected>Select City</option>';
    citySelect.disabled = true;

    fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${countryCode}/regions`, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': geoDB_API_KEY,
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
    })
    .then(response => response.json())
    .then(data => {
        data.data.forEach(region => {
            fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${countryCode}/regions/${region.code}/cities`, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': geoDB_API_KEY,
                    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
                }
            })
            .then(response => response.json())
            .then(cityData => {
                cityData.data.forEach(city => {
                    const option = document.createElement('option');
                    option.value = city.name;
                    option.textContent = city.name;
                    citySelect.appendChild(option);
                });
                citySelect.disabled = false;
            })
            .catch(error => console.error('Error fetching cities:', error));
        });
    })
    .catch(error => console.error('Error fetching regions:', error));
}

// Fetch weather data based on selected city
function fetchWeather(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weather_API_KEY}&units=metric`)
    .then(response => response.json())
    .then(data => {
        const weatherInfo = document.getElementById('weather-info');
        weatherInfo.innerHTML = `
            <h2>Weather in ${data.name}</h2>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
        `;
    })
    .catch(error => console.error('Error fetching weather data:', error));
}

// Event listeners
document.getElementById('country-select').addEventListener('change', function() {
    const countryCode = this.value;
    fetchCities(countryCode);
});

document.getElementById('city-select').addEventListener('change', function() {
    const cityName = this.value;
    fetchWeather(cityName);
});

// Initial fetch of countries
fetchCountries();
