let pantalla = document.getElementById("pantalla");
let igual = document.getElementById("igual");
let teclas = document.getElementsByClassName("tecla");
let operaciones = document.getElementsByClassName("operacion");
let clear = document.getElementById("clear"); // Referencia al botón Clear

let operacion = "";
let operando1 = "";
let operando2 = "";
let resultadoMostrado = false;

// Manejo de clics en los botones de números
for (let i = 0; i < teclas.length; i++) {
    teclas[i].addEventListener("click", () => {
        if (resultadoMostrado) {
            pantalla.innerText = "";
            resultadoMostrado = false;
        }

        if (operacion === "") {
            operando1 += teclas[i].innerText;
            pantalla.innerText = operando1; // Mostrar operando1 en la pantalla
        } else {
            operando2 += teclas[i].innerText;
            pantalla.innerText = operando2; // Mostrar operando2 en la pantalla
        }
    });
}

// Manejo de clics en los botones de operaciones
for (let i = 0; i < operaciones.length; i++) {
    operaciones[i].addEventListener("click", () => {
        if (operando1 === "") return; // Evita iniciar una operación sin un primer operando

        if (operacion !== "" && operando2 !== "") {
            // Si ya hay una operación pendiente, resuélvela antes de establecer una nueva operación
            realizarOperacion();
            operando1 = pantalla.innerText; // El resultado se convierte en el nuevo operando1
            operando2 = "";
        }

        switch (operaciones[i].innerText) {
            case "+":
                operacion = "suma";
                break;
            case "-":
                operacion = "resta";
                break;
            case "*":
                operacion = "multiplicación";
                break;
            case "/":
                operacion = "division";
                break;
            default:
                console.log("Operación no válida");
        }
        pantalla.innerText = ""; // Limpiar la pantalla para el segundo operando
    });
}

// Manejo de clic en el botón de igual
igual.addEventListener("click", () => {
    if (operando1 === "" || operando2 === "") return; // Asegura que hay dos operandos
    realizarOperacion();
    operacion = ""; // Restablecer la operación después de mostrar el resultado
    resultadoMostrado = true; // Indica que se ha mostrado un resultado
});

function realizarOperacion() {
    operando1 = parseFloat(operando1);
    operando2 = parseFloat(operando2);

    let resultado;
    switch (operacion) {
        case "suma":
            resultado = operando1 + operando2;
            break;
        case "resta":
            resultado = operando1 - operando2;
            break;
        case "multiplicación":
            resultado = operando1 * operando2;
            break;
        case "division":
            resultado = operando1 / operando2;
            break;
        default:
            console.log("Operación no válida");
            return;
    }
    pantalla.innerText = resultado.toString();
    operando1 = resultado.toString(); // Permite continuar operando con el resultado
    operando2 = "";
}

// Manejo de clic en el botón Clear
clear.addEventListener("click", () => {
    pantalla.innerText = ""; // Limpiar la pantalla
    operacion = "";
    operando1 = "";
    operando2 = "";
    resultadoMostrado = false;
});