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
📅 Pronóstico extendido (pronostico.html)

Esta sección muestra el pronóstico climático de los próximos 5 días de la ciudad seleccionada.

Incluye información detallada sobre las condiciones meteorológicas futuras para ayudar al usuario a planificar actividades o viajes.

⭐ Ciudades favoritas (favoritas.html)

En esta sección el usuario puede administrar sus ciudades favoritas.

Funcionalidades:

Mostrar la lista de ciudades guardadas.
Evitar ciudades repetidas.
Agregar una descripción personalizada mediante un textarea.
Guardar observaciones o notas sobre cada ciudad.
❌ Eliminar ciudades de favoritos.
ℹ️ Sobre nosotros (info.html)

La sección “Sobre Nosotros” brinda información general sobre la aplicación ClimaNow.

Además, incluye:

Un pequeño formulario de contacto.
✅ Validación en tiempo real de los campos del formulario.
🛠️ Tecnologías utilizadas
HTML5
CSS3
JavaScript
APIs de clima
APIs de mapas
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