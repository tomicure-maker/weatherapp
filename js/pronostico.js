const table = document.getElementById('table');
const tableBody = document.getElementById('tableBody');


const apiKey = "ee2bbf259064f981ca49b2daa8440fc9";
const ciudad = "Rosario";

const url = `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;

export async function fetchForecast(){

    try {

        const response = await fetch(url);

        const data = await response.json();

        if (!response.ok) {
            console.error(data);
            alert('No se pudo obtener el pronóstico');
            return;
        }
        const pronosticosPorDia = {};

        // AGRUPAR DATOS
        data.list.forEach(item => {
            
            const fecha = item.dt_txt.split(" ")[0];

            if(!pronosticosPorDia[fecha]){

                pronosticosPorDia[fecha] = {
                    min: item.main.temp,
                    max: item.main.temp,
                    clima: item.weather[0].description,
                    icono: item.weather[0].icon,
                    pop: item.pop
                };

            } else {

                if(item.main.temp <
                    pronosticosPorDia[fecha].min){

                    pronosticosPorDia[fecha].min =
                        item.main.temp;
                }

                if(item.main.temp >
                    pronosticosPorDia[fecha].max){

                    pronosticosPorDia[fecha].max =
                        item.main.temp;
                }

                // MAYOR PROBABILIDAD DE LLUVIA
                if(item.pop > pronosticosPorDia[fecha].pop){
                    pronosticosPorDia[fecha].pop = item.pop;
                }
            }
        });
        // CREAR TABLA
        for(const fecha in pronosticosPorDia){

            const pronostico =
                pronosticosPorDia[fecha];

            const fila =
                document.createElement('tr');

            const celdaFecha =
                document.createElement('td');

            const celdaCondicion =
                document.createElement('td');

            const celdaTempMin =
                document.createElement('td');

            const celdaTempMax =
                document.createElement('td');

            const celdaPop =
                document.createElement('td');

            celdaFecha.textContent = fecha;
            celdaCondicion.textContent =
                pronostico.clima;
            celdaTempMin.textContent =
                `${Math.round(pronostico.min)}°C`;
            celdaTempMax.textContent =
                `${Math.round(pronostico.max)}°C`;
            const lluvia = Math.max(Math.round(pronostico.pop * 100));
            console.log(pronostico.pop)
            celdaPop.textContent =
                `${lluvia}%`;
            fila.appendChild(celdaFecha);
            fila.appendChild(celdaCondicion);
            fila.appendChild(celdaTempMin);
            fila.appendChild(celdaTempMax);
            fila.appendChild(celdaPop);
            tableBody.appendChild(fila);
        }
    }
    catch (err) {
        console.error(err);
    }

}

fetchForecast();