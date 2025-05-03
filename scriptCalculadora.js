const display = document.getElementById('display'); //capturo el nodo de clase display donde se me mostrara el calculo//
let memoriaCalculadora = ''; //guarda el número que el usuario va escribiendo (aparece vacio al empezar)//
let primerNumero = null;  //guarda el primer número que el usuario escribió, tiene el valor "null" ya que no esta definido su valor//
let operadores = null; //guarda qué operación se debe hacer (+, -, *, /) tiene el valor "null" ya que no esta definido su valor//

const botones= document.querySelectorAll('.boton'); //capturo los nodos llamados con la clase boton//

botones.forEach(button => {
    button.addEventListener('click', () => {   //según el tipo de botón, llamamos a funciones diferentes//

        if (button.classList.contains('number')) {  //esta condicional me indica si el usuario apreta un boton, corresponde a un numero y llama a la funcion numero//
            numero (button.textContent);

        } else if (button.classList.contains('operator')) {  //esta condicional me indica si el usuario apreta un boton, corresponde a una operacion y llama a la funcion operacion//
            operacion (button.textContent);

        } else if (button.classList.contains('clearAll')) {  //esta condicional me indica si el usuario apreta el boton AC, corresponde a Borrar todo y llama a la funcion borrarTodo//
            borrarTodo();

        } else if (button.classList.contains('deleteLast')) {  //esta condicional me indica si el usuario apreta el boton DEL, corresponde a Borrar el ultimo digito marcado y llama a la funcion borrarUltimoDigito//
            borrarUltimoDigito();

        } else if (button.classList.contains('igual')) {  //esta condicional me indica si el usuario apreta el boton "=", corresponde a calcular la operacion y llama a la funcion calcular//
            calcular();

        }
    });
});

function ActualizarDisplay() {         //Si la variable memoriaCalculadora tiene algo, lo muestra en pantalla, y si está vacío (''), muestra 0//
    display.textContent = memoriaCalculadora || '0';
}
function numero (number) {
    if (memoriaCalculadora === '0' && number !== '.') {  //esta funcion explica que si en la variable memoriaCalculadora hay solo un cero (0) y escribes otro número, lo reemplaza//
        memoriaCalculadora = number;
    } else {                            //Si no, suma el número o el punto a la variable memoriaCalculadora//
        memoriaCalculadora += number;
    }
    ActualizarDisplay(); //actualiza la variable memoriaCalculadora (muestra lo que estas escribiendo//
}

function operacion (op) {
    if (memoriaCalculadora === '') return;  //Si no has escrito nada (memoriaCalculadora vacía ``), no hace nada//
    if (primerNumero === null) {            //Si todavía no había un número guardado, la variable primerNumero guarda el número que escribiste//
        primerNumero = parseFloat(memoriaCalculadora);
    } else if (operadores !== null) {       //Si ya había un numero en la variable primerNumero, hace un cálculo intermedio con la funcion operacionesAritmeticas (por ejemplo, cuando haces 10 + 6 - 2 seguido)//
        primerNumero = operacionesAritmeticas(primerNumero, parseFloat(memoriaCalculadora), operadores);
    }
    operadores = op; //Guarda el operador que tocaste (+,-,*,/)
    memoriaCalculadora = '';  // Limpia la variable memoriaCalculadora para que puedas escribir el segundo número//
}

function borrarTodo () {
    memoriaCalculadora = ''; //limpia la variable memoriaCalculadora//
    primerNumero = null;    //limpia la variable primerNumero//
    operadores = null;      //limpia la variable operadores//
    ActualizarDisplay();    //actualiza la variable memoriaCalculadora (muestra lo que estas escribiendo//
}

function borrarUltimoDigito() {
    memoriaCalculadora = memoriaCalculadora.substring(0, memoriaCalculadora.length - 1); //substring (permite extraer una parte de una cadena de texto original (0 es el inicio, memoriaCalculadora.lenght es el largo de los numeros escritos, -1 le resta el ultimo digito)//
    ActualizarDisplay();    //actualiza la variable memoriaCalculadora (muestra lo que estas escribiendo//
}

function calcular() {
    if (primerNumero !== null && operadores !== null && memoriaCalculadora !== '') {    //si hay un primer número, un operador, y un segundo número escrito hace lo siguiente: //
        memoriaCalculadora = operacionesAritmeticas(primerNumero, parseFloat(memoriaCalculadora), operadores).toString();   //realiza la operación con la funcion operacionesAritmeticas y el resultado se guarda en la variable memoriaCalculadora//
        primerNumero = null;    //limpia la variable primerNumero//
        operadores = null;      //limpia la variable operadores//
    }
    ActualizarDisplay();    //actualiza la variable memoriaCalculadora (muestra lo que estas escribiendo//
}

function operacionesAritmeticas(a, b, op) {     //realiza la operacion (suma, resta, multiplicacion y division de acuerdo al boton que se presione)//
    switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b === 0) {
                return 'Error';  // Previene la division por cero (0)//
            }
            return a / b;
        default:
            return b;
    }
}
