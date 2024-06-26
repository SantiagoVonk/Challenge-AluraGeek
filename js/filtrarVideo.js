import { conexionAPI } from "./conexionAPI.js";
import crearCard from "./mostrarVideos.js"; 

const botonBusqueda = document.querySelector("[data-boton-busqueda]") 

async function filtrarVideo(evento) {
    evento.preventDefault(); 

    const datosBusqueda = document.querySelector("[data-busqueda]").value 
    const busqueda = await conexionAPI.buscarVideo(datosBusqueda);
    
    const lista = document.querySelector("[data-lista]") 
    
    while (lista.firstChild) {  
        lista.removeChild(lista.firstChild) 
    }
    busqueda.forEach(video => lista.appendChild(crearCard(video.titulo, video.descripcion, video.url, video.imagen)))
    if(busqueda == 0) { 
        lista.innerHTML = `<h2 class="mensaje__titulo">No se encontro ningun video con ${datosBusqueda}</h2>`
    }
    
}

botonBusqueda.addEventListener("click", evento => filtrarVideo(evento))


/*
Este código realiza lo siguiente:

Primero, obtiene el elemento de entrada (input) con el id "buscar" en el documento.
Luego, agrega un evento de escucha (event listener) al elemento, que se activa cuando se presiona una tecla (keyup).
Cuando se detecta una pulsación de tecla, se obtiene el código de la tecla presionada (keycode).
Si el código de la tecla es 13 ASCII, que corresponde a la tecla Enter, se ejecuta la función "filtrarVideo" pasando el evento (e) como argumento.
En resumen, este código captura la pulsación de la tecla Enter en un campo de entrada y realiza una acción (filtrarVideo) cuando esto ocurre.
*/ 

const inputBuscar = document.getElementById('buscar');
inputBuscar.addEventListener('keyup', function(e){
    let key = e.which || e.keyCode;
    if (key == 13) {
    filtrarVideo(e)
    }
});