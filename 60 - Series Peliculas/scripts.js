//VARIABLES
let selector = document.getElementById('miSelector');
let input = document.getElementById('miInput');
let boton = document.getElementById('miBoton');
let lista = document.getElementById('miListado');

let archivo = 'peliculas.json';


// ESCUCHADORES DE EVENTOS
// Agregar un escuchador de eventos al elemento 'selector' para el evento 'change'
selector.addEventListener('change', cambiarArchivo);
// Agregar un escuchador de eventos al elemento 'selector' para el evento personalizado 'cambioModo'
selector.addEventListener('cambioModo', mensajeModo);
// Agregar un escuchador de eventos al elemento 'input' para el evento 'keydown'
input.addEventListener('keydown', verificarInput);
// Agregar un escuchador de eventos al elemento 'boton' para el evento 'click'
boton.addEventListener('click', buscar);


// FUNCIONES
// Definir una función llamada cambiarArchivo
function cambiarArchivo() {
    // Actualizar la variable 'archivo' con el valor seleccionado en el 'selector'
    archivo = selector.value;
    
    // Crear un evento personalizado 'cambioModo'
    let evento = new CustomEvent('cambioModo');
    
    // Despachar (disparar) el evento en el 'selector'
    selector.dispatchEvent(evento);
}

// Definir una función llamada mensajeModo
function mensajeModo() {
    // Mostrar una alerta indicando que el archivo de búsqueda ha cambiado
    alert("El archivo de búsqueda ahora es " + selector.value);
}

// Definir una función llamada verificarInput que toma un evento como parámetro
function verificarInput(evento) {
    // Verificar si la tecla presionada no es una letra (A-Z), espacio (32), ni retroceso (8)
    if((evento.keyCode < 65 || evento.keyCode > 90) && evento.keyCode != 32 && evento.keyCode != 8) {
        // Prevenir el comportamiento predeterminado (evitar que se registre la tecla)
        evento.preventDefault();
    }
}

// Definir una función llamada buscar
function buscar() {
    // Limpiar el contenido del elemento 'lista'
    lista.innerHTML = "";

    // Realizar una solicitud fetch para obtener datos del archivo especificado en 'archivo'
    fetch(archivo)
    .then(respuesta => respuesta.json())
    .then(function(salida) {
        // Iterar sobre los elementos de la respuesta
        for(let item of salida.data){
            // Verificar si el nombre del elemento comienza con la entrada del usuario (en mayúsculas)
            if(item.nombre.startsWith(input.value.toUpperCase())) {
                // Crear un nuevo párrafo 'p'
                let p = document.createElement('p');
                p.id = item.nombre;
                p.innerHTML = item.sinopsis;
                p.style.display = "none";

                // Crear un nuevo elemento de lista 'li'
                let li = document.createElement('li');
                li.innerHTML = item.nombre;

                // Agregar escuchadores de eventos al elemento 'li' para mostrar/ocultar el párrafo 'p'
                li.addEventListener('mouseover', function() {
                    let p = document.getElementById(item.nombre);
                    p.style.display = 'block';
                });

                li.addEventListener('mouseout', function() {
                    let p = document.getElementById(item.nombre);
                    p.style.display = 'none';
                });

                // Agregar el párrafo 'p' como hijo del elemento 'li'
                li.appendChild(p);
                
                // Agregar el elemento 'li' como hijo del elemento 'lista'
                lista.appendChild(li);
            }
        }
    })
    .catch(function(error) {
        // Manejar errores imprimiéndolos en la consola
        console.log(error);
    })
}
