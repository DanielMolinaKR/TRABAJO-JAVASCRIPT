// Referencias a elementos HTML
const inputDeItems = document.getElementById('actividadInput'); // Se captura el nodo del campo de entrada de texto (input) con el id 'actividadInput'//
const botonAgregar = document.getElementById('botonAgregarItem'); // Se captura el nodo del botón de agregar con el id 'botonAgregarItem'//
const lista = document.getElementById('listaActividades'); // Se captura el nodo de la lista de actividades (ul) con el id 'listaActividades'//
let listaActividades = []; // agregamos un arreglo vacío que almacenará los ítems de la lista de actividades//

botonAgregar.addEventListener('click', () => {   // Se agrega un "escuchador" de eventos al botón agregar con el id 'botonAgregarItem'. Cuando se hace clic en el botón //
    const texto = inputDeItems.value.trim();    // Se obtiene el texto que el usuario ha escrito en el campo de entrada y se elimina cualquier espacio extra al inicio o final con .trim//
    if (texto !== '') {     // Si el texto no está vacío (el usuario no dejó el campo de entrada vacío) pasa lo siguiente://
        listaActividades.push({ texto, completado: false });    // Se agrega un nuevo ítem a la listaActividades, con el texto ingresado (como texto me coincide con el nombre de mi variable coloco directamente texto) y 'completado' como false por defecto ya que aun no se encuentra completada dicho item.//
        inputDeItems.value = '';    // Se limpia el campo de entrada para que el usuario pueda escribir un nuevo ítem //
        actualizarActividades();    // Se llama a la función actualizarActividades() para actualizar la lista visible en la página //
    }
});

function actualizarActividades() {  // Función para actualizar la lista de actividades en la página//
    lista.textContent = '';     // Se limpia el contenido de la lista para evitar duplicar elementos al volver a actualizar //

    listaActividades.forEach((actividad, index) => {    // Recorremos todos los ítems de la lista de Actividades (listaActividades) - actividad es el elemento e index es la posicion en el arreglo //
        const actividadesAgregadas = document.createElement('li');  // Se crea un nuevo elemento <li> para agregar a la lista de actividades//
        if (actividad.completado) actividadesAgregadas.classList.add('completado'); // Si la actividad está marcado como completado, se agrega una clase 'completado' al <li> para cambiar su estilo//

        const textoActividad = document.createElement('span');  // Se crea un nuevo elemento <span> para mostrar el texto de la actividad //
        textoActividad.textContent = actividad.texto;   //Asigna el nombre del producto (guardado en actividad.texto) al texto visible dentro del <span> que muestra ese producto en la lista//

        const opcionesBotones = document.createElement('div');  // Se crea un contenedor <div> para los botones de opciones (completar, editar, eliminar)//
        opcionesBotones.classList.add('opciones');  //se le agrega la clase opciones a estos botones (completar,editar, eliminar) //

        const completarBoton = document.createElement('button');   // Se crea el botón "completar" que marca el ítem como completado// 
        completarBoton.textContent = '✔';  //el boton de completar aparece con el tilde//
        completarBoton.setAttribute('title', 'Marcar como completado'); //le agrego un atributo al boton de completar, cuando paso el mouse por encima del boton aparece como "marcar como completado" //

        completarBoton.addEventListener('click', () => {    // Se agrega un "escuchador" de eventos al botón "completar". Al hacer clic en él...//
            actividad.completado = !actividad.completado;   // Cambia el estado de 'completado' del actividad (lo alterna entre true y false)//
            actualizarActividades();    // Se llama a la función actualizarActividades() para actualizar la lista visible en la página //
        });

        const editarBoton = document.createElement('button');   // Se crea el botón "editar", que permite al usuario editar el texto de la actividad//
        editarBoton.textContent = '✎';     //el boton de editar aparece con un lapíz//
        editarBoton.setAttribute('title', 'Editar');    //le agrego un atributo al boton de editar, cuando paso el mouse por encima del boton aparece como "editar" //
        editarBoton.addEventListener('click', () => {   // Se agrega un "escuchador" de eventos al botón "editar". Al hacer clic en él...//
            const inputEditar = document.createElement('input');    // Se crea un campo de entrada para permitir al usuario editar el texto de la actividad//
            inputEditar.type = 'text';  //se agrego el atributo tipo texto al input de editar//
            inputEditar.value = actividad.texto;  // Se coloca el texto actual de la actividad en el campo de entrada.//  
            inputEditar.classList.add('editar-input');   // Se agrega una clase al input de editar//

            actividadesAgregadas.replaceChild(inputEditar, textoActividad); // Se reemplaza el <span> con el campo de entrada para que el usuario pueda editar el texto.//

            const guardarBoton = document.createElement('button');    // Se crea un botón de "guardar" para confirmar la edición.//
            guardarBoton.textContent = 'Guardar';   //le asigno el nombre al boton de guardar//
            guardarBoton.setAttribute('title', 'Guardar edición');  //le asigno un atributo para cuando pase el mouse encima al boton de guardar edicion//
            guardarBoton.addEventListener('click', () => {  // Cuando se hace clic en el botón de "guardar edicion"...//
                if (inputEditar.value.trim() !== '') {      // Si el campo de entrada no está vacío, se actualiza el texto del ítem//
                    actividad.texto = inputEditar.value.trim();
                }
                actualizarActividades();    // Se llama a la función actualizarActividades() para actualizar la lista visible en la página //
            });

            opcionesBotones.appendChild(guardarBoton);  // Se agrega el botón de "guardar edicion" al contenedor de opciones de botones.//
            actividadesAgregadas.appendChild(opcionesBotones); // Se agrega el contenedor de opciones (con el botón de guardar) al <li>.//
        });

        const eliminarBoton = document.createElement('button'); // Se crea el botón "eliminar", que elimina la actividad de la lista.//
        eliminarBoton.textContent = '🗑';   //le asigno al boton de eliminar el icono del tacho de basura//
        eliminarBoton.setAttribute('title', 'Eliminar');    // le asigno un atributo cuando paso el mouse encima que diga "Eliminar"//
        eliminarBoton.addEventListener('click', () => {     // Se agrega un "escuchador" de eventos al botón "eliminar". Al hacer clic en él...//
            listaActividades.splice(index, 1);  // uso splice para eliminar una actividad dentro del arreglo "listaActividades" a traves de la ubicacion que tiene dentro del arreglo con "index" y el 1 me indica la cantidad de elementos a eliminar//
            actualizarActividades();    // Se llama a la función actualizarActividades() para actualizar la lista visible en la página //
        });

        opcionesBotones.appendChild(completarBoton);    // Se agrega el boton de completar al contenedor de opcionesBotones.//
        opcionesBotones.appendChild(editarBoton);   // Se agrega el boton editar al contenedor de opcionesBotones.//
        opcionesBotones.appendChild(eliminarBoton); // Se agrega el boton eliminar al contenedor de opcionesBotones.//

        actividadesAgregadas.appendChild(textoActividad);   // Se agregan el texto de la actividad y el contenedor de opciones al <li>.//
        actividadesAgregadas.appendChild(opcionesBotones);  // Se agregan el texto de la actividad y el contenedor de opciones al <li>.//
        lista.appendChild(actividadesAgregadas);    // Se agrega el <li> a la lista (UL) en el HTML.//
    });
}