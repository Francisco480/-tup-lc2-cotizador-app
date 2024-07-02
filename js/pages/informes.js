

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



