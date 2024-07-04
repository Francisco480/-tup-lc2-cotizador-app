
/*
document.addEventListener('DOMContentLoaded', function () {
  const cotizaciones = JSON.parse(localStorage.getItem('cotizaciones')) || [];
  const comboBox = document.getElementById('combobox');
  const cuerpoTabla = document.querySelector('.tabla tbody');
  const ctx = document.getElementById('myChart').getContext('2d');
  let chart;

  // Mapeo para el combobox
  const mapeoCombobox = {
      "Seleccionar todos": null,
      "Dólar Oficial": "Oficial",
      "Dólar Blue": "Blue",
      "Dólar Bolsa (MEP)": "Bolsa",
      "Dólar Contado con Liqui (CCL)": "Contado con liquidación",
      "Dólar Mayorista": "Mayorista",
      "Dólar Cripto": "Cripto",
      "Dólar Tarjeta": "Tarjeta",
      "Euro": "Euro",
      "Real Brasileño": "Real Brasileño",
      "Peso Chileno": "Peso Chileno",
      "Peso Uruguayo": "Peso Uruguayo"
  };

  // Función para cargar las cotizaciones en la tabla
  function cargarCotizaciones(nombreMoneda) {
      cuerpoTabla.innerHTML = '';

      // Filtrar cotizaciones según el nombre de moneda seleccionado en el combobox
      let cotizacionesFiltradas = [];
      if (nombreMoneda === "Seleccionar todos" || !nombreMoneda) {
          cotizacionesFiltradas = cotizaciones;
      } else {
          const monedaFiltrar = mapeoCombobox[nombreMoneda];
          cotizacionesFiltradas = cotizaciones.filter(cotizacion => cotizacion.nombre === monedaFiltrar);
      }

      // Ordenar cotizaciones por moneda y fecha descendente
      const cotizacionesOrdenadas = {};
      cotizacionesFiltradas.forEach(cotizacion => {
          const moneda = cotizacion.nombre;
          if (!cotizacionesOrdenadas[moneda]) {
              cotizacionesOrdenadas[moneda] = [];
          }
          cotizacionesOrdenadas[moneda].push(cotizacion);
      });

      // Crear filas en la tabla
      Object.keys(cotizacionesOrdenadas).forEach(moneda => {
          let primeraFila = true;
          cotizacionesOrdenadas[moneda].forEach((cotizacion, index) => {
              const filaMoneda = document.createElement('tr');
              filaMoneda.classList.add('fila-contenido-moneda');

              // Celda para el nombre de la moneda (solo en la primera fila de cada moneda)
              const celdaMoneda = document.createElement('td');
              celdaMoneda.classList.add('columna-moneda');
              if (primeraFila) {
                  celdaMoneda.textContent = moneda;
                  celdaMoneda.setAttribute('rowspan', cotizacionesOrdenadas[moneda].length);
                  primeraFila = false;
              } else {
                  celdaMoneda.classList.add('columna-moneda-vacia');
              }
              filaMoneda.appendChild(celdaMoneda);

              // Celda para la fecha
              const celdaFecha = document.createElement('td');
              celdaFecha.classList.add('columna-fecha');
              celdaFecha.textContent = formatoFecha(cotizacion.fechaActualizacion);
              filaMoneda.appendChild(celdaFecha);

              // Celda para la compra
              const celdaCompra = document.createElement('td');
              celdaCompra.textContent = cotizacion.compra;
              filaMoneda.appendChild(celdaCompra);

              // Celda para la venta
              const celdaVenta = document.createElement('td');
              celdaVenta.textContent = cotizacion.venta;
              filaMoneda.appendChild(celdaVenta);

              // Celda para la variación
              const celdaVariacion = document.createElement('td');
              const iconoVariacion = document.createElement('i');
              iconoVariacion.classList.add('fa-regular', calcularVariacionIcono(cotizacion));
              celdaVariacion.appendChild(iconoVariacion);
              filaMoneda.appendChild(celdaVariacion);

              cuerpoTabla.appendChild(filaMoneda);
          });
      });

      actualizarGrafico(nombreMoneda);
  }

  // Función para formatear la fecha
  function formatoFecha(fecha) {
      const fechaObj = new Date(fecha);
      return fechaObj.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  // Función para actualizar el gráfico
  function actualizarGrafico(nombreMoneda) {
      if (chart) {
          chart.destroy();
      }

      const labels = [];
      const data = [];
      cotizaciones.forEach(cotizacion => {
          if (!nombreMoneda || cotizacion.nombre === mapeoCombobox[nombreMoneda]) {
              labels.push(cotizacion.nombre);
              data.push(parseFloat(cotizacion.venta.replace('$', '').replace(',', '.')));
          }
      });

      chart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: labels,
              datasets: [{
                  label: 'Precio de Venta',
                  data: data,
                  backgroundColor: 'rgba(54, 162, 235, 0.2)',
                  borderColor: 'rgba(54, 162, 235, 1)',
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

  // Función para calcular el ícono de variación
  function calcularVariacionIcono(cotizacion) {
      const variacion = parseFloat(cotizacion.venta) - parseFloat(cotizacion.compra);
      if (variacion > 0) {
          return 'fa-circle-up';
      } else if (variacion < 0) {
          return 'fa-circle-down';
      } else {
          return 'fa-circle';
      }
  }

  // Evento al hacer clic en el icono de filtro
  const iconoFiltro = document.querySelector('.fa-solid.fa-filter');
  if (iconoFiltro) {
      iconoFiltro.addEventListener('click', function () {
          const monedaSeleccionada = comboBox.value;
          cargarCotizaciones(monedaSeleccionada);
      });
  }

  // Función inicial para cargar todas las cotizaciones al cargar la página
  cargarCotizaciones();
});
*/




/*
document.addEventListener('DOMContentLoaded', function () {
  const cotizaciones = JSON.parse(localStorage.getItem('cotizaciones')) || [];
  const comboBox = document.getElementById('combobox');
  const cuerpoTabla = document.querySelector('.tabla tbody');
  const ctx = document.getElementById('myChart').getContext('2d');
  let chart;

  // Mapeo para el combobox
  const mapeoCombobox = {
    "Seleccionar todos": null,
    "Dólar Oficial": "Oficial",
    "Dólar Blue": "Blue",
    "Dólar Bolsa (MEP)": "Bolsa",
    "Dólar Contado con Liqui (CCL)": "Contado con liquidación",
    "Dólar Mayorista": "Mayorista",
    "Dólar Cripto": "Cripto",
    "Dólar Tarjeta": "Tarjeta",
    "Euro": "Euro",
    "Real Brasileño": "Real Brasileño",
    "Peso Chileno": "Peso Chileno",
    "Peso Uruguayo": "Peso Uruguayo"
  };

  // Función para cargar las cotizaciones en la tabla
  function cargarCotizaciones(nombreMoneda) {
    cuerpoTabla.innerHTML = '';

    // Filtrar cotizaciones según el nombre de moneda seleccionado en el combobox
    let cotizacionesFiltradas = [];
    if (nombreMoneda === "Seleccionar todos" || !nombreMoneda) {
      cotizacionesFiltradas = cotizaciones;
    } else {
      const monedaFiltrar = mapeoCombobox[nombreMoneda];
      cotizacionesFiltradas = cotizaciones.filter(cotizacion => cotizacion.nombre === monedaFiltrar);
    }

    // Ordenar cotizaciones por moneda y fecha descendente
    const cotizacionesOrdenadas = {};
    cotizacionesFiltradas.forEach(cotizacion => {
      const moneda = cotizacion.nombre;
      if (!cotizacionesOrdenadas[moneda]) {
        cotizacionesOrdenadas[moneda] = [];
      }
      cotizacionesOrdenadas[moneda].push(cotizacion);
    });

    // Crear filas en la tabla
    Object.keys(cotizacionesOrdenadas).forEach(moneda => {
      let primeraFila = true;
      cotizacionesOrdenadas[moneda].forEach((cotizacion, index) => {
        const filaMoneda = document.createElement('tr');
        filaMoneda.classList.add('fila-contenido-moneda');

        // Celda para el nombre de la moneda (solo en la primera fila de cada moneda)
        const celdaMoneda = document.createElement('td');
        celdaMoneda.classList.add('columna-moneda');
        if (primeraFila) {
          celdaMoneda.textContent = moneda;
          celdaMoneda.setAttribute('rowspan', cotizacionesOrdenadas[moneda].length);
          primeraFila = false;
        } else {
          celdaMoneda.classList.add('columna-moneda-vacia');
        }
        filaMoneda.appendChild(celdaMoneda);

        // Celda para la fecha
        const celdaFecha = document.createElement('td');
        celdaFecha.classList.add('columna-fecha');
        celdaFecha.textContent = formatoFecha(cotizacion.fechaActualizacion);
        filaMoneda.appendChild(celdaFecha);

        // Celda para la compra
        const celdaCompra = document.createElement('td');
        celdaCompra.textContent = cotizacion.compra;
        filaMoneda.appendChild(celdaCompra);

        // Celda para la venta
        const celdaVenta = document.createElement('td');
        celdaVenta.textContent = cotizacion.venta;
        filaMoneda.appendChild(celdaVenta);

        // Celda para la variación
        const celdaVariacion = document.createElement('td');
        const iconoVariacion = document.createElement('i');
        iconoVariacion.classList.add('fa-regular', calcularVariacionIcono(cotizacion));
        celdaVariacion.appendChild(iconoVariacion);
        filaMoneda.appendChild(celdaVariacion);

        cuerpoTabla.appendChild(filaMoneda);
      });
    });

    actualizarGrafico(nombreMoneda);
  }

  // Función para formatear la fecha
  function formatoFecha(fecha) {
    const fechaObj = new Date(fecha);
    return fechaObj.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  // Función para actualizar el gráfico
  function actualizarGrafico(nombreMoneda) {
    if (chart) {
      chart.destroy();
    }

    const labels = [];
    const data = [];
    cotizaciones.forEach(cotizacion => {
      if (!nombreMoneda || cotizacion.nombre === mapeoCombobox[nombreMoneda]) {
        labels.push(cotizacion.nombre);
        data.push(parseFloat(cotizacion.venta.replace('$', '').replace(',', '.')));
      }
    });

    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Precio de Venta',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
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

  // Función para calcular el ícono de variación
  function calcularVariacionIcono(cotizacion) {
    const variacion = parseFloat(cotizacion.venta) - parseFloat(cotizacion.compra);
    if (variacion > 0) {
      return 'fa-circle-up';
    } else if (variacion < 0) {
      return 'fa-circle-down';
    } else {
      return 'fa-circle';
    }
  }

  // Evento al hacer clic en el icono de filtro
  const iconoFiltro = document.querySelector('.fa-solid.fa-filter');
  if (iconoFiltro) {
    iconoFiltro.addEventListener('click', function () {
      const monedaSeleccionada = comboBox.value;
      cargarCotizaciones(monedaSeleccionada);
    });
  }

  // Evento para abrir la ventana emergente al hacer clic en "Compartir Información"
  const compartirInfoLink = document.querySelector('.mail .Texto-info');
  compartirInfoLink.addEventListener('click', function (event) {
    event.preventDefault();

    // Abrir ventana emergente
    const popupWidth = 400;
    const popupHeight = 300;
    const left = (window.innerWidth - popupWidth) / 2;
    const top = (window.innerHeight - popupHeight) / 2;
    const popupOptions = `width=${popupWidth}, height=${popupHeight}, top=${top}, left=${left}, resizable=yes, scrollbars=yes, status=yes`;

    const popupWindow = window.open('', 'Compartir Información', popupOptions);
    if (popupWindow) {
      popupWindow.document.body.style.backgroundColor = 'yellow';
      popupWindow.document.body.innerHTML = `
        <div style="padding: 20px;">
          <h2 style="font-weight: bold;">DATOS DEL DESTINATARIO</h2>
          <form>
            <label for="nombre">Nombre:</label><br>
            <input type="text" id="nombre" name="nombre"><br><br>
            <label for="email">Email:</label><br>
            <input type="email" id="email" name="email"><br><br>
            <button type="button" onclick="window.close()">CERRAR</button>
            <button type="submit">ENVIAR</button>
          </form>
        </div>
      `;
    } else {
      alert('No se pudo abrir la ventana emergente. Verifique la configuración de su navegador.');
    }
  });

  // Función inicial para cargar todas las cotizaciones al cargar la página
  cargarCotizaciones();
});

*/

document.addEventListener('DOMContentLoaded', function () {
  const cotizaciones = JSON.parse(localStorage.getItem('cotizaciones')) || [];
  const comboBox = document.getElementById('combobox');
  const cuerpoTabla = document.querySelector('.tabla tbody');
  const ctx = document.getElementById('myChart').getContext('2d');
  let chart;

  // Mapeo para el combobox
  const mapeoCombobox = {
    "Seleccionar todos": null,
    "Dólar Oficial": "Oficial",
    "Dólar Blue": "Blue",
    "Dólar Bolsa (MEP)": "Bolsa",
    "Dólar Contado con Liqui (CCL)": "Contado con liquidación",
    "Dólar Mayorista": "Mayorista",
    "Dólar Cripto": "Cripto",
    "Dólar Tarjeta": "Tarjeta",
    "Euro": "Euro",
    "Real Brasileño": "Real Brasileño",
    "Peso Chileno": "Peso Chileno",
    "Peso Uruguayo": "Peso Uruguayo"
  };

  // Función para cargar las cotizaciones en la tabla
  function cargarCotizaciones(nombreMoneda) {
    cuerpoTabla.innerHTML = '';

    // Filtrar cotizaciones según el nombre de moneda seleccionado en el combobox
    let cotizacionesFiltradas = [];
    if (nombreMoneda === "Seleccionar todos" || !nombreMoneda) {
      cotizacionesFiltradas = cotizaciones;
      actualizarGraficoNull(nombreMoneda); // Llamar a actualizarGraficoNull
    } else {
      const monedaFiltrar = mapeoCombobox[nombreMoneda];
      cotizacionesFiltradas = cotizaciones.filter(cotizacion => cotizacion.nombre === monedaFiltrar);
      actualizarGrafico(nombreMoneda); // Llamar a actualizarGrafico con nombreMoneda específico
    }

    // Ordenar cotizaciones por fecha descendente
    cotizacionesFiltradas.sort((a, b) => new Date(b.fechaActualizacion) - new Date(a.fechaActualizacion));

    // Crear filas en la tabla
    const cotizacionesOrdenadas = {};
    cotizacionesFiltradas.forEach(cotizacion => {
      const moneda = cotizacion.nombre;
      if (!cotizacionesOrdenadas[moneda]) {
        cotizacionesOrdenadas[moneda] = [];
      }
      cotizacionesOrdenadas[moneda].push(cotizacion);
    });

    // Crear filas en la tabla
    Object.keys(cotizacionesOrdenadas).forEach(moneda => {
      let primeraFila = true;
      cotizacionesOrdenadas[moneda].forEach((cotizacion, index) => {
        const filaMoneda = document.createElement('tr');
        filaMoneda.classList.add('fila-contenido-moneda');

        // Celda para el nombre de la moneda (solo en la primera fila de cada moneda)
        const celdaMoneda = document.createElement('td');
        celdaMoneda.classList.add('columna-moneda');
        if (primeraFila) {
          celdaMoneda.textContent = moneda;
          celdaMoneda.setAttribute('rowspan', cotizacionesOrdenadas[moneda].length);
          primeraFila = false;
        } else {
          celdaMoneda.classList.add('columna-moneda-vacia');
        }
        filaMoneda.appendChild(celdaMoneda);

        // Celda para la fecha
        const celdaFecha = document.createElement('td');
        celdaFecha.classList.add('columna-fecha');
        celdaFecha.textContent = formatoFecha(cotizacion.fechaActualizacion);
        filaMoneda.appendChild(celdaFecha);

        // Celda para la compra
        const celdaCompra = document.createElement('td');
        celdaCompra.textContent = cotizacion.compra;
        celdaCompra.classList.add('columna-compra');
        filaMoneda.appendChild(celdaCompra);

        // Celda para la venta
        const celdaVenta = document.createElement('td');
        celdaVenta.textContent = cotizacion.venta;
        celdaVenta.classList.add('columna-venta');
        filaMoneda.appendChild(celdaVenta);

        // Celda para la variación
const celdaVariacion = document.createElement('td');
const iconoVariacion = document.createElement('i');
iconoVariacion.classList.add('fa-regular', calcularVariacionIcono(cotizacionesOrdenadas[moneda], index));
celdaVariacion.appendChild(iconoVariacion);
celdaVariacion.classList.add('columna-variacion');
filaMoneda.appendChild(celdaVariacion);

cuerpoTabla.appendChild(filaMoneda);

      });
    });
  }

// Función para calcular el ícono de variación
function calcularVariacionIcono(cotizaciones, index) {
  if (index === 0 || !cotizaciones[index - 1]) {
    return calcularVariacionIconoDirecto(cotizaciones[index]);
  }

  const cotizacionActual = cotizaciones[index];
  const cotizacionAnterior = cotizaciones[index - 1];

  // Comparar la fecha para decidir si ha subido o bajado
  if (cotizacionActual.fechaActualizacion > cotizacionAnterior.fechaActualizacion) {
    return 'fa-circle-down'; // Subió
  } else if (cotizacionActual.fechaActualizacion < cotizacionAnterior.fechaActualizacion) {
    return 'fa-circle-up'; // Bajó
  } else {
    return calcularVariacionIconoDirecto(cotizaciones[index]);
  }
}

function calcularVariacionIconoDirecto(cotizacion) {
  const variacion = parseFloat(cotizacion.venta) - parseFloat(cotizacion.compra);
  if (variacion > 0) {
    return 'fa-circle-down'; // Subió
  } else if (variacion < 0) {
    return 'fa-circle-up'; // Bajó
  } else if (variacion = 0) {
    return 'fa-circle';
  } 
  else {
    return 'fa-circle'; // Sin cambios
  }
}


  // Función para formatear la fecha
  function formatoFecha(fecha) {
    const fechaObj = new Date(fecha);
    return fechaObj.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  // Función para obtener un color aleatorio
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Función para actualizar el gráfico cuando se selecciona "Seleccionar todos"
  function actualizarGraficoNull(nombreMoneda) {
    if (chart) {
      chart.destroy();
    }

    // Filtrar y ordenar cotizaciones por fecha ascendente
    const cotizacionesFiltradas = cotizaciones.sort((b, a) => new Date(a.fechaActualizacion) - new Date(b.fechaActualizacion));

    const labels = [];
    const datasets = [];

    // Obtener todas las monedas disponibles
    const monedasDisponibles = Array.from(new Set(cotizaciones.map(cotizacion => cotizacion.nombre)));

    // Colores aleatorios para las líneas del gráfico
    const colores = [];

    // Asignar colores únicos a cada moneda
    monedasDisponibles.forEach((moneda, index) => {
      const color = getRandomColor();
      colores.push(color);

      const dataCompra = [];

      cotizacionesFiltradas.forEach(cotizacion => {
        if (cotizacion.nombre === moneda) {
          labels.unshift(formatoFecha(cotizacion.fechaActualizacion).slice(0, 10)); // Reducir a solo la fecha
          const compra = typeof cotizacion.compra === "string"
            ? parseFloat(cotizacion.compra.replace("$", "").replace(",", "."))
            : cotizacion.compra;
          dataCompra.unshift(compra);
        }
      });

      datasets.push({
        label: moneda,
        data: dataCompra,
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1,
      });
    });

    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Precio de Compra',
            font: {
              size: 20
            }
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Precios",
            },
            ticks: {
              stepSize: 50,
            },
          },
          x: {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 2 // Limitar el número de etiquetas en el eje x para hacerlas más pequeñas
            }
          }
        },
      },
    });
  }

  // Función para actualizar el gráfico cuando se selecciona una moneda específica
  function actualizarGrafico(nombreMoneda) {
    if (chart) {
      chart.destroy();
    }

    // Filtrar y ordenar cotizaciones por fecha ascendente
    const cotizacionesFiltradas = cotizaciones.filter(cotizacion =>
      !nombreMoneda || cotizacion.nombre === mapeoCombobox[nombreMoneda]
    ).sort((b, a) => new Date(a.fechaActualizacion) - new Date(b.fechaActualizacion));

    const labels = [];
    const compraData = [];
    const ventaData = [];

    cotizacionesFiltradas.forEach(cotizacion => {
      labels.unshift(formatoFecha(cotizacion.fechaActualizacion).slice(0, 10)); // Reducir a solo la fecha
      const compra = typeof cotizacion.compra === "string"
        ? parseFloat(cotizacion.compra.replace("$", "").replace(",", "."))
        : cotizacion.compra;
      const venta = typeof cotizacion.venta === "string"
        ? parseFloat(cotizacion.venta.replace("$", "").replace(",", "."))
        : cotizacion.venta;
      compraData.unshift(compra);
      ventaData.unshift(venta);
    });

    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
          label: `Compra de ${nombreMoneda}`,
          data: compraData,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1
        },
        {
          label: `Venta de ${nombreMoneda}`,
          data: ventaData,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: `Cotizaciones de ${nombreMoneda}`,
            font: {
              size: 20
            }
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Precios",
            },
            ticks: {
              stepSize: 50,
            },
          },
          x: {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10 // Limitar el número de etiquetas en el eje x para hacerlas más pequeñas
            }
          }
        },
      },
    });
  }

  // Evento change del combobox para cargar las cotizaciones correspondientes
  comboBox.addEventListener('change', function () {
    const nombreMoneda = this.value;
    cargarCotizaciones(nombreMoneda);
  });


    // Evento al hacer clic en el icono de filtro
    const iconoFiltro = document.querySelector('.fa-solid.fa-filter');
    if (iconoFiltro) {
      iconoFiltro.addEventListener('click', function () {
        const monedaSeleccionada = comboBox.value;
        cargarCotizaciones(monedaSeleccionada);
      });
    }
  
// Función para abrir la modal
const abrirModal = () => {
  const modal = document.getElementById('modal');
  modal.style.display = 'block';

  // Agregar un evento para cerrar la modal al hacer clic fuera de ella
  window.addEventListener('click', outsideClick);

  // Agregar evento para cerrar la modal al hacer clic en la cruz (X)
  const cerrarSpan = document.querySelector('span.close');
  cerrarSpan.addEventListener('click', closeModal);

  // Evento para cerrar la modal al hacer clic en el botón "Cerrar"
  const cerrarModalBtn = document.getElementById('cerrarModal');
  cerrarModalBtn.addEventListener('click', closeModal);
}

// Función para cerrar la modal
const closeModal = () => {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';

  // Remover eventos al cerrar la modal
  window.removeEventListener('click', outsideClick);
  const cerrarSpan = document.querySelector('span.close');
  cerrarSpan.removeEventListener('click', closeModal);
}

// Función para cerrar la modal si se hace clic fuera de ella
const outsideClick = (event) => {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
    closeModal();
  }
}

// Evento para abrir la modal al hacer clic en el enlace
const compartirInfoLink = document.querySelector('.mail .Texto-info');
compartirInfoLink.addEventListener('click', function (event) {
  event.preventDefault();
  abrirModal();
});


  // Cargar las cotizaciones por defecto al cargar la página
  cargarCotizaciones("Seleccionar todos");
});

