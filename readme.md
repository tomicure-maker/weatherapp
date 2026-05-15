🌦️ ClimaNow

ClimaNow es una aplicación web de clima que permite buscar ciudades y visualizar información meteorológica en tiempo real, además de gestionar ciudades favoritas y consultar el pronóstico extendido.

🚀 Funcionalidades
🔍 Búsqueda de ciudades (index.html)

En la página principal el usuario puede buscar una ciudad mediante un buscador conectado a una API de clima.

Al realizar una búsqueda:

Se muestra una lista de ciudades coincidentes.
Al seleccionar una ciudad se visualiza:
🌡️ Temperatura
💧 Humedad
🌬️ Velocidad del viento
🥵 Sensación térmica
Se muestra un 🗺️ mapa interactivo con la ubicación de la ciudad.
Permite ⭐ agregar la ciudad a favoritos.

<img width="1355" height="1232" alt="index" src="https://github.com/user-attachments/assets/bb4fc9f9-4493-41dc-aed7-ee69b4b5ded7"/>

📅 Pronóstico extendido (pronostico.html)

Esta sección muestra el pronóstico climático de los próximos 5 días de la ciudad seleccionada.

Incluye información detallada sobre las condiciones meteorológicas futuras para ayudar al usuario a planificar actividades o viajes.

<img width="1355" height="968" alt="pronostico" src="https://github.com/user-attachments/assets/a236d34b-731d-4c6f-bccf-50d8f15f542b" />


⭐ Ciudades favoritas (favoritas.html)

En esta sección el usuario puede administrar sus ciudades favoritas.

Funcionalidades:

Mostrar la lista de ciudades guardadas.
Evitar ciudades repetidas.
Agregar una descripción personalizada mediante un textarea.
Guardar observaciones o notas sobre cada ciudad.
❌ Eliminar ciudades de favoritos.

<img width="1355" height="802" alt="favoritas" src="https://github.com/user-attachments/assets/9ad360f4-525e-4bf4-a978-875be29e0b52" />

ℹ️ Sobre nosotros (info.html)

La sección “Sobre Nosotros” brinda información general sobre la aplicación ClimaNow.

Además, incluye:

Un pequeño formulario de contacto.
✅ Validación en tiempo real de los campos del formulario.

<img width="1355" height="1345" alt="nosotros" src="https://github.com/user-attachments/assets/7ba1780e-05e6-459d-9bdd-64835465de6e" />


🛠️ Tecnologías utilizadas
HTML5
CSS3
JavaScript
APIs de clima (OpenWeather)
APIs de mapas (Meteo Blue)
📌 Futuras mejoras
🔎 Optimización del buscador

Actualmente, el usuario debe presionar Enter para realizar la búsqueda de ciudades.

En futuras versiones se planea implementar una búsqueda automática en tiempo real mientras el usuario escribe.

Para lograrlo, será necesario aplicar técnicas como:

Debounce
Control de solicitudes a la API
Optimización de peticiones

Esto permitirá:

Mejor experiencia de usuario.
Menor consumo de recursos.
Evitar demasiadas solicitudes por cada letra ingresada.
