const API_KEY = 'cbe3dd267a18f6c89943b3eff94f1ed7';

// Fetch weather data for a given city
const requestCity = async (city) => {
    const baseURL = 'https://api.openweathermap.org/data/2.5/weather';

    // Sanitize input
    const trimmedCity = city.trim();
    if (!trimmedCity) {
        alert('Please enter a city name.');
        throw new Error('City input is empty.');
    }

    // Optional: set units to metric (Celsius) and language to English
    const query = `?q=${encodeURIComponent(trimmedCity)}&appid=${API_KEY}&units=metric&lang=en`;

    try {
        const response = await fetch(baseURL + query);
        const data = await response.json();

        if (!response.ok) {
            alert(`Error: ${data.message || 'Unable to fetch weather data'}`);
            throw new Error(data.message || 'Weather API error');
        }

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Something went wrong. Please check your connection or try again later.');
        throw error;
    }
};
