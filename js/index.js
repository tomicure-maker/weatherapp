const errorMessage = document.getElementById("error-message");

let tempContainer = document.querySelector(".temp");
let icon = document.querySelector("#icon");
let weatherType = document.querySelector("#weather-type");
let humidity = document.querySelector("#humidity");
let windSpeed = document.querySelector("#wind-speed");

const feelsLike = document.getElementById("feels-like");

let locationContainer = document.querySelector("#location");

const searchInput = document.querySelector("#search-input");

const btnSearch = document.getElementById("search-button");

const searchResults = document.getElementById("search-results");

const apiKey =
"ee2bbf259064f981ca49b2daa8440fc9";

let loc = "rosario";

searchInput.addEventListener('input', () =>{
    if(searchInput.value === ""){
        searchResults.style.display = 'none';
    }
})



async function submitLocation(event) {
    event.preventDefault();
    loc = searchInput.value.trim();
    if (!loc){
        searchResults.style.display = 'none';
        return;
    }
    searchResults.style.display = 'block';
    await apiFetch();
}



export async function apiFetch() {
    try {

        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${loc}&limit=5&appid=${apiKey}`;

        const geoRes = await fetch(geoUrl);

        const geoData = await geoRes.json();

        if (geoData.length === 0) {
            console.log("Ciudad no encontrada");
            errorMessage.style.display = "block";
            setTimeout(() => {
                errorMessage.style.display = "none";
                searchInput.value = "";
            }, 2000);
            return;
        }
        console.log( "Resultados de geocodificación:",geoData);
        searchResults.innerHTML = "";
        geoData.forEach(locationInfo => {
            const item = document.createElement("div");
            item.classList.add("result-item");
            item.textContent =`${locationInfo.name}${locationInfo.state? ", " + locationInfo.state: ""} (${locationInfo.country})`; 
            item.addEventListener("click", async () => {
                searchResults.innerHTML = "";
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
                const windKm =(data.wind.speed * 3.6).toFixed(1);
                if ( window.location.pathname.includes("index.html") || window.location.pathname === "/") {
                    renderIndex(
                        data,
                        cityName,
                        countryCode,
                        windKm
                    );
                }
                searchInput.value = `${cityName}, ${countryCode}`;
            });
            searchResults.appendChild(item);
        });
    }
    catch (err) {
        console.error(err);
        alert(
            "Error al conectar con el servicio"
        );
    }
}

function renderIndex(
    data,
    cityName,
    countryCode,
    windKm
) 

{
    tempContainer.innerHTML = `${Math.round(data.main.temp)}°C`;
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherType.innerHTML =
    data.weather[0].description;
    humidity.innerHTML =
    `💧 Humedad: ${data.main.humidity}%`;
    feelsLike.innerHTML =
    `🌡️ Sensación térmica:
    ${Math.round(data.main.feels_like)}°C`;
    windSpeed.innerHTML =
    `🌬️ Viento: ${windKm} km/h`;
    locationContainer.innerHTML =
    `${cityName}, ${countryCode}`;
}



const searchForm = document.querySelector(".search-box");
if (searchForm) {
    searchForm.addEventListener(
        "submit",
        submitLocation
    );
}
apiFetch();