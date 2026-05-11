const errorMessage = document.getElementById("error-message");

let tempContainer = document.querySelector(".temp");
let icon = document.querySelector("#icon");
let weatherType = document.querySelector("#weather-type");
let humidity = document.querySelector("#humidity");
let windSpeed = document.querySelector("#wind-speed");

const container = document.querySelector('.container flex')
const feelsLike = document.getElementById("feels-like");

let locationContainer = document.querySelector("#location");

const searchInput = document.querySelector("#search-input");

const btnSearch = document.getElementById("search-button");

const searchResults = document.getElementById("search-results");

const apiKey =
"ee2bbf259064f981ca49b2daa8440fc9";

let loc = "rosario";


const savedLoc = JSON.parse(localStorage.getItem("loc"));
if(savedLoc){
    renderIndex(savedLoc)
}

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
                //Creo el objeto LOC con los valores para poder renderizar
                const loc = {
                    cityName,
                    countryCode,
                    temp: Math.round(data.main.temp),
                    icon: data.weather[0].icon,
                    description: data.weather[0].description,
                    humidity: data.main.humidity,
                    feelsLike:Math.round(data.main.feels_like),
                    windSpeed: windKm
                    };
                localStorage.setItem("loc", JSON.stringify(loc));
                    renderIndex(loc);
                
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
    loc
) 
{
    if ( window.location.pathname.includes("index.html") || window.location.pathname === "/") {
        tempContainer.innerHTML = `${Math.round(loc.temp)}°C`;
        icon.src = `https://openweathermap.org/img/wn/${loc.icon}@2x.png`;
        weatherType.innerHTML = loc.description;
        humidity.innerHTML = `💧 Humedad: ${loc.humidity}%`;
        feelsLike.innerHTML = `🌡️ Sensación térmica:${loc.feelsLike}°C`;
        windSpeed.innerHTML = `🌬️ Viento: ${loc.windSpeed} km/h`;
        locationContainer.innerHTML =`${loc.cityName}, ${loc.countryCode}`;
        } 
}



const searchForm = document.querySelector(".search-box");
if (searchForm) {
    searchForm.addEventListener(
        "submit",
        submitLocation
    );
}
apiFetch();