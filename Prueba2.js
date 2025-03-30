const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  function ingresarNombre() {
    return new Promise(resolve => {
      readline.question('Ingrese el nombre completo del estudiante: ', nombre => {
        resolve(nombre);
      });
    });
  }
  
  function ingresarNotas() {
    return new Promise(resolve => {
      let notas = [];
      let contador = 1;
  
      function pedirNota() {
        readline.question(`Ingrese la nota ${contador} (0-10): `, nota => {
          const notaNum = parseFloat(nota);
          if (isNaN(notaNum) || notaNum < 0 || notaNum > 10) {
            console.log('Nota inválida. Ingrese una nota entre 0 y 10.');
            pedirNota();
          } else {
            notas.push(notaNum);
            contador++;
            if (contador <= 4) {
              pedirNota();
            } else {
              resolve(notas);
            }
          }
        });
      }
  
      pedirNota();
    });
  }
  
  function calcularPromedio(notas) {
    const suma = notas.reduce((total, nota) => total + nota, 0);
    return suma / notas.length;
  }
  
  async function main() {
    readline.question('¿Cuántos estudiantes va a registrar?: ', async cantidad => {
      const nombres = [];
      const notasEstudiantes = [];
      const promedios = [];
      let aprobados = 0;
      let reprobados = 0;
  
      for (let i = 0; i < cantidad; i++) {
        const nombre = await ingresarNombre();
        const notas = await ingresarNotas();
        const promedio = calcularPromedio(notas);
  
        nombres.push(nombre);
        notasEstudiantes.push(notas);
        promedios.push(promedio);
  
        console.log(`\nReporte de ${nombre}:`);
        console.log(`Notas: ${notas.join(', ')}`);
        console.log(`Promedio: ${promedio.toFixed(2)}`);
        console.log(promedio >= 7 ? 'Aprobado' : 'Reprobado');
        console.log('---');
  
        if (promedio >= 7) {
          aprobados++;
        } else {
          reprobados++;
        }
      }
  
      console.log(`\nResumen General:`);
      console.log(`Aprobados: ${aprobados}`);
      console.log(`Reprobados: ${reprobados}`);
  
      readline.close();
    });
  }
  
  main();