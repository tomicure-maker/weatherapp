
const errorMessage = document.getElementById("error-message");
let tempContainer = document.querySelector(".temp");
let icon = document.querySelector("#icon");
let weatherType = document.querySelector("#weather-type");
let humidity = document.querySelector("#humidity");
let windSpeed = document.querySelector("#wind-speed");
let locationContainer = document.querySelector("#location");
const searchInput = document.querySelector("#search-input");




const apiKey = "ee2bbf259064f981ca49b2daa8440fc9";
let loc = "rosario"; //VALOR INICIAL (PREGUNTAR AL USUARIO)

async function submitLocation(event) {
    event.preventDefault();
    loc = searchInput.value.trim();
    if (!loc) return;
    await apiFetch();
}

async function apiFetch() {
    try {
        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${loc}&limit=5&appid=${apiKey}`;
        const geoRes = await fetch(geoUrl);
        const geoData = await geoRes.json();

        if (geoData.length === 0) {
            console.log("Ciudad no encontrada");
            setTimeout(() => {
                errorMessage.style.display = "none"; //Ocultamos el mensaje de error
                searchInput.value = ""; //Limpiamos el input para que el usuario pueda buscar otra ciudad
            }, 2000);
            errorMessage.style.display = "block"; //Mostramos el mensaje de error
            return;
        }

        console.log("Resultados de geocodificación:", geoData);
        console.log("Nombres posibles:", geoData.map(item => `${item.name}${item.state ? ", " + item.state : ""}, ${item.country}`));

        const locationInfo = geoData[0];
        const latitude = locationInfo.lat;
        const longitude = locationInfo.lon;

        const cityName = locationInfo.local_names?.es || locationInfo.name || loc;
        const countryCode = locationInfo.country || "";

        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=es&units=metric`;
        const weatherRes = await fetch(weatherUrl);
        const data = await weatherRes.json();

        if (!weatherRes.ok) {
            console.error(data);
            alert("No se pudo obtener el clima");
            return;
        }

        tempContainer.innerHTML = `${data.main.temp}°C`;
        icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        weatherType.innerHTML = data.weather[0].description;
        humidity.innerHTML = `Humedad: ${data.main.humidity}%`;
        windSpeed.innerHTML = `Velocidad del viento: ${data.wind.speed} km/h`;
        locationContainer.innerHTML = `${cityName}, ${countryCode}`;
    } 
    catch (err) {
        console.error(err);
        alert("Error al conectar con el servicio");
    }
}

apiFetch();
