// const cotizaciones = [];

// fetch("https://dolarapi.com/v1/dolares/oficial")
//   .then(response => response.json())
//   .then(dataDolarOficial => {
//     cotizaciones.push(dataDolarOficial);
//     return fetch("https://dolarapi.com/v1/dolares/blue");
//   })
//   .then(response => response.json())
//   .then(dataDolarBlue => {
//     cotizaciones.push(dataDolarBlue);
//     return fetch("https://dolarapi.com/v1/dolares/bolsa");
//   })
//   .then(response => response.json())
//   .then(dataDolarBolsa => {
//     cotizaciones.push(dataDolarBolsa);
//     return fetch("https://dolarapi.com/v1/dolares/contadoconliqui");
//   })
//   .then(response => response.json())
//   .then(dataDolarCC => {
//     cotizaciones.push(dataDolarCC);
//     return fetch("https://dolarapi.com/v1/dolares/tarjeta");
//   })
//   .then(response => response.json())
//   .then(dataDolarTarjeta => {
//     cotizaciones.push(dataDolarTarjeta);
//     return fetch("https://dolarapi.com/v1/dolares/mayorista");
//   })
//   .then(response => response.json())
//   .then(dataDolarMayorista => {
//     cotizaciones.push(dataDolarMayorista);
//     return fetch("https://dolarapi.com/v1/dolares/cripto");
//   })
//   .then(response => response.json())
//   .then(dataDolarCripto => {
//     cotizaciones.push(dataDolarCripto);
//     return fetch("https://dolarapi.com/v1/cotizaciones/eur");
//   })
//   .then(response => response.json())
//   .then(dataEuro => {
//     cotizaciones.push(dataEuro);
//     return fetch("https://dolarapi.com/v1/cotizaciones/brl");
//   })
//   .then(response => response.json())
//   .then(dataReal => {
//     cotizaciones.push(dataReal);
//     return fetch("https://dolarapi.com/v1/cotizaciones/clp");
//   })
//   .then(response => response.json())
//   .then(dataChile => {
//     cotizaciones.push(dataChile);
//     return fetch("https://dolarapi.com/v1/cotizaciones/uyu");
//   })
//   .then(response => response.json())
//   .then(dataUruguay => {
//     cotizaciones.push(dataUruguay);

//     // Una vez que todas las solicitudes han sido completadas, creas el objeto cotizacionesObjeto
//     const cotizacionesObjeto = {
//       dolarOficial: cotizaciones[0],
//       dolarBlue: cotizaciones[1],
//       dolarBolsa: cotizaciones[2],
//       dolarCC: cotizaciones[3],
//       dolarTarjeta: cotizaciones[4],
//       dolarMayorista: cotizaciones[5],
//       dolarCripto: cotizaciones[6],
//       euro: cotizaciones[7],
//       real: cotizaciones[8],
//       chileno: cotizaciones[9],
//       uruguayo: cotizaciones[10]
//     };

//     console.log(cotizacionesObjeto); // Aquí puedes hacer lo que quieras con los datos
//     console.log(cotizaciones)
//   })
//   .catch(error => {
//     console.error("Error al obtener datos de cotización:", error);
//   });




//   /*
// var arrayCotizaciones = [];
// var objetoCotizaciones = {};

//   // Todos los fetchs por separado
//   fetch 1 -- > URL1;
// arrayCotizaciones.push(resultado);

//   fetch 2 -- -> URL2;
// arrayCotizaciones.push(resultado2);

// */

let arregloNuevo = []

fetch("https://dolarapi.com/v1/dolares")
  .then(response => response.json())
  .then(dataDolar => {
    console.log(dataDolar)  // Para ver el tipo de dato
    arregloNuevo = dataDolar;  // Arreglo nuevo
    return fetch("https://dolarapi.com/v1/cotizaciones/eur")
  })
  .then(response => response.json())
  .then(dataEuro => {
    arregloNuevo.push(dataEuro);
    return fetch("https://dolarapi.com/v1/cotizaciones/brl");
  })
  .then(response => response.json())
  .then(dataReal => {
    arregloNuevo.push(dataReal);
    return fetch("https://dolarapi.com/v1/cotizaciones/clp");
  })
  .then(response => response.json())
  .then(dataChile => {
    arregloNuevo.push(dataChile);
    return fetch("https://dolarapi.com/v1/cotizaciones/uyu");
  })
  .then(response => response.json())
  .then(dataUruguay => {
    arregloNuevo.push(dataUruguay);
  })  
  .catch(error => {
    console.error("Error al obtener datos de cotización:", error);
  });

  // en inicio se actualiza cada 5 minutos
  // en mi archivo en local storage ( se guardan el historial de la cotizacion en favoritos en mi archivo del index a mi archivo)
  // en mi informe se actualiza cada 5 minutos





  //ACÁ ESTOY PROBANDO EL CAMBIO DE OPINIONES
  // Array de opiniones (puedes agregar más si quieres)
  const opiniones = [
    {
      imagen: "img/fran.png",
        nombre: "Poli Veliz Francisco Alberto",
        comentario: "Formamos un gran equipo con Ninotti Cristian y Gonzalez Nahuel."
    },
    {
        imagen: "img/cris.jpg",
        nombre: "Ninotti Cristian",
        comentario: "Formamos un gran equipo con Poli Veliz Francisco y Gonzalez Nahuel."
    },
    {
        imagen: "img/nahue.jpg",
        nombre: "Gonzalez Nahuel",
        comentario: "Formamos un gran equipo con Ninotti Cristian y Poli Veliz Francisco."
    }
];

let index = 0;
const opinionContainer = document.getElementById('opinionContainer');

// Función para cambiar la opinión cada 5 segundos
function cambiarOpinion() {
    opinionContainer.innerHTML = `
        <div class="opinion-img">
            <img src="${opiniones[index].imagen}" alt="${opiniones[index].nombre}">
        </div>
        <div class="opinion-nombre">
            <h2>${opiniones[index].nombre}</h2>
            <p>${opiniones[index].comentario}</p>
        </div>
    `;
    index = (index + 1) % opiniones.length; // Avanza al siguiente índice circularmente
}

// Cambiar la opinión inicial
cambiarOpinion();

// Cambiar la opinión cada 5 segundos
setInterval(cambiarOpinion, 5000);




/*
//ACÁ PRUEBO EL TEMA DE GUARDAR EN EL STORAGE
// Función para manejar el clic en la estrella
function toggleFavorito(event) {
  const star = event.target;
  const tipoMoneda = star.parentElement.querySelector('h3').textContent;
  const cotizacion = arregloIndex.find(item => item.nombre === tipoMoneda);
  const ahora = new Date();
  const fechaHora = `${ahora.getDate()}/${ahora.getMonth() + 1}/${ahora.getFullYear()} ${ahora.getHours().toString().padStart(2, '0')}:${ahora.getMinutes().toString().padStart(2, '0')}hs`;

  const clave = `favorito_${tipoMoneda}_${fechaHora}`;

  if (localStorage.getItem(clave)) {
      mostrarMensajeError(`La cotización de ${tipoMoneda} ya se encuentra almacenada para la fecha y hora actual.`);
  } else {
      localStorage.setItem(clave, JSON.stringify(cotizacion));
      mostrarMensajeExito(`La cotización de ${tipoMoneda} ha sido agregada correctamente.`);
  }
}

// Agregar evento clic a todas las estrellas
document.addEventListener('DOMContentLoaded', () => {
  const estrellas = document.querySelectorAll('.fa-star');
  estrellas.forEach(star => {
      star.addEventListener('click', toggleFavorito);
  });
});
*/


