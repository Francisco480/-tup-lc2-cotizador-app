let arregloGraficador = [];
let myChart;

fetch("https://dolarapi.com/v1/dolares")
  .then(response => response.json())
  .then(dataDolar => {
    arregloNuevo = dataDolar;
    return fetch("https://dolarapi.com/v1/cotizaciones/eur");
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
    if (arregloNuevo.length > 0) {
      generarGrafico(arregloNuevo);
      generarTabla(arregloNuevo);
    } else {
      mostrarMensajeError();
    }
  })
  .catch(error => {
    console.error("Error al obtener datos de cotización:", error);
    mostrarMensajeError();
  });

const combobox = document.getElementById('combobox');
combobox.addEventListener('change', function() {
  const selectedValue = combobox.value;
  if (selectedValue === "") {
    actualizarGrafico(arregloNuevo);
    generarTabla(arregloNuevo);
  } else {
    const monedaSeleccionada = arregloNuevo.filter(dato => dato.nombre === selectedValue);
    actualizarGrafico(monedaSeleccionada);
    generarTabla(monedaSeleccionada);
  }
});

function generarGrafico(datos) {
  const ctx = document.getElementById('myChart').getContext('2d');
  const etiquetas = datos.map(dato => dato.nombre);
  const valores = datos.map(dato => dato.compra);

  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: etiquetas,
      datasets: [{
        label: 'Cotización de Monedas',
        data: valores,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function actualizarGrafico(datos) {
  const etiquetas = datos.map(dato => dato.nombre);
  const valores = datos.map(dato => dato.compra);

  myChart.data.labels = etiquetas;
  myChart.data.datasets[0].data = valores;
  myChart.update();
}

function generarTabla(datos) {
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';

  datos.forEach(dato => {
    const trMoneda = document.createElement('tr');
    trMoneda.classList.add('fila');
    trMoneda.innerHTML = `<td class="moneda"><b>${dato.nombre}</b></td>`;
    tbody.appendChild(trMoneda);

    dato.cotizaciones.forEach(cotizacion => {
      const trCotizacion = document.createElement('tr');
      trCotizacion.classList.add('fila-contenido-moneda');
      trCotizacion.innerHTML = `
        <td></td>
        <td class="columna-fecha">${cotizacion.fecha}</td>
        <td>$${cotizacion.compra}</td>
        <td>$${cotizacion.venta}</td>
        <td class="columna-borrar">${getIconoVariacion(cotizacion.variacion)}</td>
      `;
      tbody.appendChild(trCotizacion);
    });
  });
}

function getIconoVariacion(variacion) {
  return variacion > 0 ? '<i class="fa-regular fa-circle-up"></i>' : '<i class="fa-regular fa-circle-down"></i>';
}

function mostrarMensajeError() {
  const contenidoCentral = document.querySelector('.contenido-central');
  const mensajeError = document.createElement('p');
  mensajeError.textContent = "No hay datos guardados hasta el momento.";
  contenidoCentral.appendChild(mensajeError);
}
