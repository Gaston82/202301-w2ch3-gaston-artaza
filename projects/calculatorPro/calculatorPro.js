let resultadosObtenidos = [];
let numerosIntroducidos = [];
const datosObtenidos = [];

function iniciamosCalculadoraPRO() {
  const introducirNum = () => {
    let datos;
    do {
      datos = Number(prompt("Introduce un número."));
      if (isNaN(datos)) {
        alert("Debes introducir solo números NO letras.");
        return introducirNum();
      }

      datosObtenidos.push(datos);
    } while (datos !== 0);

    return datosObtenidos;
  };

  numerosIntroducidos = introducirNum();
  arrayNumbers = numerosIntroducidos.pop();

  const operacionesCalculadora = () => {
    const operaciones = [];
    if (numerosIntroducidos.length > 1) {
      const suma = numerosIntroducidos.reduce(
        (valorInicial, segundoValor) => valorInicial + segundoValor
      );

      const resta = numerosIntroducidos.reduce(
        (valorInicial, segundoValor) => valorInicial - segundoValor
      );
      const multiplicacion = numerosIntroducidos.reduce(
        (valorInicial = 1, segundoValor) => valorInicial * segundoValor
      );
      const division = numerosIntroducidos.reduce(
        (valorInicial = numerosIntroducidos[0], segundoValor) =>
          valorInicial / segundoValor
      );
      operaciones.push(
        "La suma es: " +
          suma +
          " La resta es: " +
          resta +
          " La multiplicación es: " +
          multiplicacion +
          " La división es: " +
          division
      );
      return operaciones;
    }
  };

  resultadosObtenidos = operacionesCalculadora();
  const mostramosResultadosOperaciones = () => {
    if (numerosIntroducidos.length > 2) {
      alert("Los resultados son: " + resultadosObtenidos);
    }
  };

  mostramosResultadosOperaciones();
  const repetimosProceso = () => {
    if (confirm("Quieres volver hacer calculos?")) {
      return iniciamosCalculadoraPRO();
    }

    alert("Gracias por usar nuestra calculadora PRO.");
  };

  repetimosProceso();
}

iniciamosCalculadoraPRO();
