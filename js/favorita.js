const listaFavoritos = document.getElementById('listaFavoritos');

let ciudadesFavoritas = JSON.parse(localStorage.getItem('listaFavoritos'));


console.log(ciudadesFavoritas);

if(ciudadesFavoritas.length > 0){
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


        //Le asignamos el evento al boton de eliminar para borrar la ciudad favorita guardada
        btnEliminar.addEventListener('click', () => {
            const message = document.getElementById('message');
            const p = document.getElementById('messageText');
            //Eliminamos las clases
            message.classList.remove('fav-message-upgrade', 'fav-message-remove');
            //Le asignamos la clase correspondiente
            message.classList.add('fav-message-remove')

            ciudadesFavoritas = ciudadesFavoritas.filter((_, i) => i !== index);
            localStorage.setItem('listaFavoritos',JSON.stringify(ciudadesFavoritas));
            // Eliminar el elemento visualmente
            item.remove();
            p.textContent = 'Ciudad eliminada correctamente ❌';
            // Mostrar mensaje
            message.style.display = "block";
            setTimeout(() => {
                message.style.display = "none";
            }, 1500);
        });
//Le asignamos el evento al boton de guardar/modificar para que se guarden los datos del TEXTAREA
        btnModificar.addEventListener('click', () => {
            const message = document.getElementById('message');
            const p = document.getElementById('messageText');
            message.classList.add('fav-message-upgrade');
            ciudadesFavoritas[index].note = descripcion.value;

            localStorage.setItem('listaFavoritos',JSON.stringify(ciudadesFavoritas));
            p.textContent = 'Ciudad añadida a favoritos ✅';
            // Mostrar mensaje
            message.style.display = "block";

            setTimeout(() => {
                message.style.display = "none";
            }, 1500);
        });



        listaFavoritos.appendChild(item); //Agregamos el LI al UL
        item.appendChild(descripcion); // Agregamos el textArea al li
        item.appendChild(btnModificar); //Agregamos el boton de modificar el li
        item.appendChild(btnEliminar); //Agregamos el boton de eliminar al li
    });

} else{
const message = document.createElement('p');
message.textContent = 'No se han guardado ciudades Favoritas!';
message.classList.add('empty-message');

const container = document.createElement('div');
container.classList.add('empty-container');

container.appendChild(message);

const section = document.getElementById('sectionFav');
section.appendChild(container);
}
