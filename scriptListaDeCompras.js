
const inputDeItems = document.getElementById('agregarProducto'); // Se captura el nodo del campo de entrada de texto (input) con el id 'agregarProducto'//
const botonAgregar = document.getElementById('botonAgregarItem');  // Se captura el nodo del botón de agregar con el id 'botonAgregarItem'//
const lista = document.getElementById('listaCompras');  // Se captura el nodo de la lista de compras (ul) con el id 'listaCompras'//
let listaItems = [];    // agregamos un arreglo vacío que almacenará los ítems de la lista de compras//

botonAgregar.addEventListener('click', () => {      // Se agrega un "escuchador" de eventos al botón agregar con el id 'botonAgregarItem'. Cuando se hace clic en el botón //
    const texto= inputDeItems.value.trim();      // Se obtiene el texto que el usuario ha escrito en el campo de entrada y se elimina cualquier espacio extra al inicio o final con .trim//

    if (texto !== '') {     // Si el texto no está vacío (el usuario no dejó el campo de entrada vacío) pasa lo siguiente://
        listaItems.push({ texto, completado: false });  // Se agrega un nuevo ítem a la listaItems, con el texto ingresado (como texto me coincide con el nombre de mi variable coloco directamente texto) y 'completado' como false por defecto ya que aun no se encuentra completada dicho item.//
        inputDeItems.value = '';  // Se limpia el campo de entrada para que el usuario pueda escribir un nuevo ítem //
        ActualizarLista();          // Se llama a la función ActualizarLista() para actualizar la lista visible en la página //
    }
});

function ActualizarLista() {    // Función para actualizar la lista de compras en la página//
    lista.textContent = '';     // Se limpia el contenido de la lista para evitar duplicar elementos al volver a actualizar //

    listaItems.forEach((item, index) => {   // Recorremos todos los ítems de la lista de compras (listaItems) - item es el elemento e index es la posicion en el arreglo //
        const itemsAgregados = document.createElement('li');    // Se crea un nuevo elemento <li> para agregar a la lista de compras//
        if (item.completado) itemsAgregados.classList.add('completado');    // Si el ítem está marcado como completado, se agrega una clase 'completado' al <li> para cambiar su estilo//
        const textoItem = document.createElement('span');   // Se crea un nuevo elemento <span> para mostrar el texto del ítem //
        textoItem.textContent = item.texto; //Asigna el nombre del producto (guardado en item.texto) al texto visible dentro del <span> que muestra ese producto en la lista//
        const opcionesBotones = document.createElement('div');  // Se crea un contenedor <div> para los botones de opciones (completar, editar, eliminar)//
        opcionesBotones.classList.add('opciones');     //se le agrega la clase opciones a estos botones (completar,editar, eliminar) //
        const completarBoton = document.createElement('button');    // Se crea el botón "completar" que marca el ítem como completado//
        completarBoton.textContent = '✔';  //el boton de completar aparece con el tilde//
        completarBoton.setAttribute('title', 'Marcar como completado'); //le agrego un atributo al boton de completar, cuando paso el mouse por encima del boton aparece como "marcar como completado" //

    completarBoton.addEventListener('click', () => {    // Se agrega un "escuchador" de eventos al botón "completar". Al hacer clic en él...//
            item.completado = !item.completado; // Cambia el estado de 'completado' del ítem (lo alterna entre true y false)//
            ActualizarLista();  // Se llama a la función ActualizarLista() para actualizar la lista visible en la página //
        });

        const editarBoton = document.createElement('button');   // Se crea el botón "editar", que permite al usuario editar el texto del ítem//
        editarBoton.textContent = '✎';     //el boton de editar aparece con un lapíz//
        editarBoton.setAttribute('title', 'Editar');    //le agrego un atributo al boton de editar, cuando paso el mouse por encima del boton aparece como "editar" //

        editarBoton.addEventListener('click', () => {   // Se agrega un "escuchador" de eventos al botón "editar". Al hacer clic en él...//
            const inputEditar = document.createElement('input');    // Se crea un campo de entrada para permitir al usuario editar el texto del ítem.//
            inputEditar.type = 'text';  //se agrego el atributo tipo texto al input de editar//
            inputEditar.value = item.texto; // Se coloca el texto actual del ítem en el campo de entrada.//
            inputEditar.classList.add('editar-input'); // Se agrega una clase al input de editar//
            itemsAgregados.replaceChild(inputEditar, textoItem);    // Se reemplaza el <span> con el campo de entrada para que el usuario pueda editar el texto.//

            const guardarBotonEditar = document.createElement('button');    // Se crea un botón de "guardar" para confirmar la edición.//
            guardarBotonEditar.textContent = 'Guardar';     //le asigno el nombre al boton de guardar//
            guardarBotonEditar.setAttribute('title', 'Guardar edición');    //le asigno un atributo para cuando pase el mouse encima al boton de guardar edicion//

            guardarBotonEditar.addEventListener('click', () => {    // Cuando se hace clic en el botón de "guardar edicion"...//
                if (inputEditar.value.trim() !== '') {          // Si el campo de entrada no está vacío, se actualiza el texto del ítem//
                    item.texto = inputEditar.value.trim();
                }
                ActualizarLista();      // Se llama a la función ActualizarLista() para actualizar la lista visible en la página //
            });

            opcionesBotones.appendChild(guardarBotonEditar);    // Se agrega el botón de "guardar edicion" al contenedor de opciones de botones.//
            itemsAgregados.appendChild(opcionesBotones);    // Se agrega el contenedor de opciones (con el botón de guardar) al <li>.//
        });

        const eliminarBoton = document.createElement('button');   // Se crea el botón "eliminar", que elimina el ítem de la lista.//
        eliminarBoton.textContent = '🗑';   //le asigno al boton de eliminar el icono del tacho de basura//
        eliminarBoton.setAttribute('title', 'Eliminar');  // le asigno un atributo cuando paso el mouse encima que diga "Eliminar"//

        
        eliminarBoton.addEventListener('click', () => { // Se agrega un "escuchador" de eventos al botón "eliminar". Al hacer clic en él...//
            listaItems.splice(index, 1); // uso splice para eliminar un item dentro del arreglo "listaItems" a traves de la ubicacion que tiene dentro del arreglo con "index" y el 1 me indica la cantidad de elementos a eliminar//
            ActualizarLista();  // Se llama a la función ActualizarLista() para actualizar la lista visible en la página //
        });

        opcionesBotones.appendChild(completarBoton);    // Se agrega el boton de completar al contenedor de opcionesBotones.//
        opcionesBotones.appendChild(editarBoton);       // Se agrega el boton editar al contenedor de opcionesBotones.//
        opcionesBotones.appendChild(eliminarBoton);     // Se agrega el boton eliminar al contenedor de opcionesBotones.//

        itemsAgregados.appendChild(textoItem);  // Se agregan el texto del ítem y el contenedor de opciones al <li>.//
        itemsAgregados.appendChild(opcionesBotones);    // Se agregan el texto del ítem y el contenedor de opciones al <li>.//

        lista.appendChild(itemsAgregados);  // Se agrega el <li> a la lista (UL) en el HTML.//
    });
}
