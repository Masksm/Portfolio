const weather_API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';

function showStatusMessage(message, isError = false) {
    const statusMessage = document.getElementById('status-message');
    statusMessage.textContent = message;
    statusMessage.style.color = isError ? 'red' : 'black';
}

// Fetch weather data based on geolocation
function fetchWeatherByCoords(lat, lon) {
    showStatusMessage('Fetching weather data...', false);
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weather_API_KEY}&units=metric`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Weather data fetch failed');
        }
        return response.json();
    })
    .then(data => {
        displayWeather(data);
        fetchNearbyWeather(lat, lon);
        showStatusMessage('Weather data loaded successfully', false);
    })
    .catch(error => {
        showStatusMessage(error.message, true);
        console.error('Error fetching weather data by coordinates:', error);
    });
}

// Fetch weather data for nearby locations
function fetchNearbyWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=5&appid=${weather_API_KEY}&units=metric`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Nearby weather data fetch failed');
        }
        return response.json();
    })
    .then(data => {
        displayNearbyWeather(data.list);
    })
    .catch(error => {
        showStatusMessage('Error fetching nearby weather data', true);
        console.error('Error fetching nearby weather data:', error);
    });
}

// Display the weather information for the current location
function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `
        <h2>Current Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
    `;
}

// Display weather information for nearby locations
function displayNearbyWeather(locations) {
    const nearbyWeather = document.getElementById('nearby-weather');
    nearbyWeather.innerHTML = `<h2>Nearby Weather</h2>`;
    
    locations.forEach(location => {
        nearbyWeather.innerHTML += `
            <div class="location-weather">
                <h3>${location.name}</h3>
                <p>Temperature: ${location.main.temp} °C</p>
                <p>Weather: ${location.weather[0].description}</p>
                <p>Humidity: ${location.main.humidity}%</p>
            </div>
        `;
    });
}

// Handle the "Get Weather" button click
document.getElementById('location-button').addEventListener('click', function() {
    if (navigator.geolocation) {
        showStatusMessage('Retrieving your location...', false);
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByCoords(lat, lon);
        }, () => {
            showStatusMessage('Unable to retrieve your location. Please allow location access.', true);
        });
    } else {
        showStatusMessage('Geolocation is not supported by your browser', true);
    }
});
