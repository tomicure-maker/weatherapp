const apiKey = "ee2bbf259064f981ca49b2daa8440fc9";
//ESPERAR UNAS HORAS A QUE FUNCIONE 
let loc = "rosario";
const api = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}&units=metric`;

function apiFetch(){
    fetch(api)
    .then((res) => res.json())
    .then((data) =>{
        console.log(data);
    
        let temp = data.main.temp;
        let icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        let weatherType = data.weather[0].description;
        let humidity = data.main.humidity;
        let windspeed = data.wind.speed;
        let cityName = data.name;
        let countryName = data.sys.country;

        console.log(cityName, countryName, temp, icon, weatherType, humidity, windspeed);

    });
    }

apiFetch();
