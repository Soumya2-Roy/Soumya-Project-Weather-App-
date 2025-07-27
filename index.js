const searchForm = document.querySelector('.search-loaction');
const cityValue = document.querySelector('.search-loaction input');
const cityName = document.querySelector('.city-name p');
const cardBody = document.querySelector('.card-body');
const timeImage = document.querySelector('.card-top img');
const cardInfo = document.querySelector('.back-card');

// Helper: Check if icon is day or night
const isDayTime = (iconCode) => iconCode.includes('d');

// Helper: Change background class
const updateBackground = (iconCode) => {
    document.body.classList.toggle('day', isDayTime(iconCode));
    document.body.classList.toggle('night', !isDayTime(iconCode));
};

// Helper: Update the UI with weather data
const updateWeatherApp = (weather) => {
    const { name } = weather;
    const { temp, temp_max, temp_min, feels_like, humidity } = weather.main;
    const { icon, description } = weather.weather[0];

    const iconSrc = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    // Set city name
    cityName.textContent = name;

    // Build inner content
    cardBody.innerHTML = `
        <div class="card-mid row">
            <div class="col-8 text-center temp">
                <span>${Math.round(temp)}&deg;C</span>
            </div>
            <div class="col-4 condition-temp">
                <p class="condition">${description}</p>
                <p class="high">${Math.round(temp_max)}&deg;C</p>
                <p class="low">${Math.round(temp_min)}&deg;C</p>
            </div>
        </div>

        <div class="icon-container card shadow mx-auto">
            <img src="${iconSrc}" alt="Weather icon" />
        </div>

        <div class="card-bottom px-5 py-4 row">
            <div class="col text-center">
                <p>${Math.round(feels_like)}&deg;C</p>
                <span>Feels Like</span>
            </div>
            <div class="col text-center">
                <p>${humidity}%</p>
                <span>Humidity</span>
            </div>
        </div>
    `;

    // Update time image and text color
    const dayMode = isDayTime(icon);
    timeImage.setAttribute('src', dayMode ? 'img/day_image.svg' : 'img/night_image.svg');
    cityName.classList.toggle('text-white', !dayMode);
    cityName.classList.toggle('text-black', dayMode);

    // Update background
    updateBackground(icon);

    // Show card
    cardInfo.classList.remove('d-none');
};

// Event: Search Form Submission
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const citySearched = cityValue.value.trim();

    if (!citySearched) {
        alert('Please enter a city name.');
        return;
    }

    searchForm.reset();

    try {
        const data = await requestCity(citySearched);
        updateWeatherApp(data);
    } catch (error) {
        console.error('Error updating weather app:', error.message);
        alert('City not found or API error. Please try again.');
    }
});
