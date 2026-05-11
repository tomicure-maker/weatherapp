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

let loc = 'rosario';
let currentLoc = null;

const savedLoc = JSON.parse(localStorage.getItem("loc"));
if(savedLoc){
    renderIndex(savedLoc) //Renderizo la informacion al cargar la pagina con la ultima ciudad buscada
    currentLoc = savedLoc; //Guardo en currentLoc el valor que tiene savedLoc
}

//Agregamos un evento al input para que cuando borremos todo oculte el resultado de busquedas
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
        //Realizamos el fetch a la API de OpenWeather
        const geoRes = await fetch(geoUrl);
        // Recibimos la respuesta de la api
        const geoData = await geoRes.json();
        //Verificamos que la ciudad buscada se haya encontrado
        if (geoData.length === 0) {
            console.log("Ciudad no encontrada");
            //Mostramos mensaje de que no se encontro la ciudad buscada al usuario.
            errorMessage.style.display = "block";
            setTimeout(() => {
                errorMessage.style.display = "none";
                searchInput.value = "";
            }, 2000);
            return;
        }
        console.log( "Resultados de geocodificación:",geoData);
        //limpiamos los resultados devueltos por la api que se le muestran al usuario
        searchResults.innerHTML = "";
        //realizamos un forEach para poder recolectar la informacion traida de la api y preguntarle al usuario
        geoData.forEach(locationInfo => {

            const item = document.createElement("div");
            item.classList.add("result-item");
            item.textContent =`${locationInfo.name}${locationInfo.state? ", " + locationInfo.state: ""} (${locationInfo.country})`;
            //Realizamos evento para el item (ciudad que selecciona el usuario)
            item.addEventListener("click", async () => {
                //creamos las variables y guardamos toda la informacion
                searchResults.innerHTML = ""; 
                const latitude = locationInfo.lat;
                const longitude = locationInfo.lon;
                const cityName = locationInfo.local_names?.es || locationInfo.name || loc;
                const countryCode = locationInfo.country || "";
                const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=es&units=metric`;
                const weatherRes = await fetch(weatherUrl);
                const data = await weatherRes.json();
                //verificamos que obtuvimos el clima
                if (!weatherRes.ok) {
                    console.error(data);
                    alert("No se pudo obtener el clima");
                    return;
                }
                //pasamos la velocidad del viento a km/h
                const windKm =(data.wind.speed * 3.6).toFixed(1);
                //Creo el objeto currentLoc con los valores para poder renderizar
                currentLoc = {
                    cityName,
                    countryCode,
                    latitude,
                    longitude,
                    temp: Math.round(data.main.temp),
                    icon: data.weather[0].icon,
                    description: data.weather[0].description,
                    humidity: data.main.humidity,
                    feelsLike:Math.round(data.main.feels_like),
                    windSpeed: windKm,
                    note: ''
                    };
                //guardamos el currentLoc en el localStorage para crear PERSISTENCIA 
                localStorage.setItem("loc", JSON.stringify(currentLoc));
                //Llamamos a la funcion para renderizar y le pasamos el objeto currentLoc
                renderIndex(currentLoc);
                //Limpiamos el input de busqueda
                searchInput.value = `${cityName}, ${countryCode}`;
            });
            //Agregamos los items (ciudades traidas por la API) a los resultados de busqueda
            searchResults.appendChild(item);
        });
    }
    catch (err) {
        //Manejamos los errores
        console.error(err);
        alert(
            "Error al conectar con el servicio"
        );
    }
}

function renderIndex(loc){ //Funcion para renderizar los datos traidos de la API
    if ( window.location.pathname.includes("index.html") || window.location.pathname === "/"){ //Validamos que el usuario este en la pagina del index.html antes de cargar.
        tempContainer.innerHTML = `${Math.round(loc.temp)}°C`;
        icon.src = `https://openweathermap.org/img/wn/${loc.icon}@2x.png`;
        weatherType.innerHTML = loc.description;
        humidity.innerHTML = `💧 Humedad: ${loc.humidity}%`;
        feelsLike.innerHTML = `🌡️ Sensación térmica:${loc.feelsLike}°C`;
        windSpeed.innerHTML = `🌬️ Viento: ${loc.windSpeed} km/h`;
        locationContainer.innerHTML =`${loc.cityName}, ${loc.countryCode}`;
        }}



const searchForm = document.querySelector(".search-box"); //Seleccionamos el formulario
if (searchForm) { //solamente si el formulario existe le aplicamos el evento submit (para enviarlo)
    searchForm.addEventListener("submit", submitLocation);
}



//METEMOS UNA CIUDAD A LA LISTA DE FAVORITOS CON UN BTN Y SE GUARDA EN LOCAL STORAGE
const btnFav = document.getElementById('btnFav');
const listaFavoritos = JSON.parse(localStorage.getItem('listaFavoritos')) || [] //Traigo la lista del localstorage
btnFav.addEventListener('click', () =>{
    console.log('Acabas de anadir una ciudad a favoritos');
    const existe = listaFavoritos.some(ciudad =>  //.some pregunta 'al menos existe un elemento que cumpla eso?'
        ciudad.cityName === currentLoc.cityName  //Con esto validamos que no se pueda guardar dos veces la misma ciudad
    );

    if(existe) return; //Preguntamos si existe ya esa ciudad en la lista
    
    listaFavoritos.push(currentLoc); //Agregamos la ciudad al array
    localStorage.setItem('listaFavoritos', JSON.stringify(listaFavoritos)); //guardamos el array actualizado en el localStorage
})


