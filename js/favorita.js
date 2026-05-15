const listaFavoritos = document.getElementById('listaFavoritos');

const ciudadesFavoritas = JSON.parse(localStorage.getItem('listaFavoritos'));

//  Mostrar mensaje si existe el flag
const removeMessage = document.getElementById("removeMessage");
if (localStorage.getItem("ciudadEliminada") === "true") {
    removeMessage.style.display = "block";
    setTimeout(() => {
        removeMessage.style.display = "none";
    }, 2000);
    localStorage.removeItem("ciudadEliminada"); // borramos el flag
}

console.log(ciudadesFavoritas);

if(ciudadesFavoritas){
    ciudadesFavoritas.forEach((ciudad, index) => { //Le decimos al forEach que devuelva tambien el INDICE
        //Creamos los elementos HTML
        const item = document.createElement('li');
        const descripcion = document.createElement('textarea')
        const btnEliminar = document.createElement('button');
        const btnModificar = document.createElement('button');

        //le asignamos contenido de texto
        btnEliminar.textContent = 'Eliminar'; 
        btnModificar.textContent = 'Guardar';
        item.textContent = ciudad.cityName+ ', ' + ciudad.countryCode;
        descripcion.value = ciudad.note || "";

        //Le agregamos clases
        item.classList.add('ciudad')
        btnEliminar.classList.add('btnEliminar');
        btnModificar.classList.add('btnModificar');

        //Le asignamos el evento al boton de guardar/modificar para que se guarden los datos del TEXTAREA
        btnModificar.addEventListener('click', () => {
        ciudadesFavoritas[index].note = descripcion.value;
        localStorage.setItem('listaFavoritos', JSON.stringify(ciudadesFavoritas))});

        //Le asignamos el evento al boton de eliminar para borrar la ciudad favorita guardada
        btnEliminar.addEventListener('click', () => {
            //El .filter((_, i) => i !== index) Filtra el elemento segun con quien esta asociado el boton.  (Closure)
            const nuevasCiudades = ciudadesFavoritas.filter((_, i) => i !== index);
            localStorage.setItem('listaFavoritos', JSON.stringify(nuevasCiudades));

        // Guardamos el flag antes de recargar
            localStorage.setItem("ciudadEliminada", "true");

            location.reload();
        });



        listaFavoritos.appendChild(item); //Agregamos el LI al UL
        item.appendChild(descripcion); // Agregamos el textArea al li
        item.appendChild(btnModificar); //Agregamos el boton de modificar el li
        item.appendChild(btnEliminar); //Agregamos el boton de eliminar al li
    });






} else{
    const message = document.createElement('p');
    message.textContent = 'No se han guardado ciudades Favoritas!'
    const container = document.createElement('div');
    container.appendChild(message);
    const section = document.getElementById('sectionFav');
    section.appendChild(container);
}
