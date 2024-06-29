// Variables globales
let arregloIndex = []; // Para almacenar las cotizaciones obtenidas de la API

// Función para cargar y mostrar cotizaciones al inicio
function cargarCotizaciones() {
    // Obtener cotizaciones generales (dataDolar)
    fetch("https://dolarapi.com/v1/dolares")
        .then(response => response.json())
        .then(dataDolar => {
            // Limpiar arregloIndex antes de agregar nuevas cotizaciones
            arregloIndex = [];

            // Agregar cotizaciones de dataDolar
            arregloIndex.push(...dataDolar);

            // Obtener cotizaciones específicas
            return Promise.all([
                fetch("https://dolarapi.com/v1/cotizaciones/eur").then(response => response.json()),
                fetch("https://dolarapi.com/v1/cotizaciones/brl").then(response => response.json()),
                fetch("https://dolarapi.com/v1/cotizaciones/clp").then(response => response.json()),
                fetch("https://dolarapi.com/v1/cotizaciones/uyu").then(response => response.json())
            ]);
        })
        .then(data => {
            // Agregar cotizaciones específicas
            arregloIndex.push(...data);

            // Mostrar las cotizaciones en la interfaz
            mostrarCotizaciones();
            actualizarFechaHora(); // Actualizar fecha y hora de la última actualización
            actualizarCada5Minutos(); // Actualizar automáticamente cada 5 minutos
        })
        .catch(error => {
            console.error("Error al obtener datos de cotización:", error);
            mostrarMensajeError("Error al cargar las cotizaciones. Por favor, inténtelo nuevamente más tarde.");
        });
}

// Función para mostrar todas las cotizaciones en la interfaz
function mostrarCotizaciones() {
    const plantillaPrecios = document.querySelector('.plantilla-precios');
    // Limpiar el contenido actual antes de mostrar las nuevas cotizaciones
    plantillaPrecios.innerHTML = '';

    arregloIndex.forEach(cotizacion => {
        const item = document.createElement('div');
        item.classList.add('item');

        const tipoMoneda = document.createElement('div');
        tipoMoneda.classList.add('tipo-moneda');

        const tituloMoneda = document.createElement('h3');
        tituloMoneda.textContent = cotizacion.nombre; // Mostrar el nombre de la moneda correctamente

        const compraVenta = document.createElement('div');
        compraVenta.classList.add('compra-venta');

        const compra = document.createElement('div');
        compra.classList.add('compra');
        compra.innerHTML = `<h4>Compra</h4>$${cotizacion.compra || cotizacion.valor_compra}`; // Ajustar según la estructura de los datos

        const venta = document.createElement('div');
        venta.classList.add('venta');
        venta.innerHTML = `<h4>Venta</h4>$${cotizacion.venta || cotizacion.valor_venta}`; // Ajustar según la estructura de los datos

        tipoMoneda.appendChild(tituloMoneda);
        compraVenta.appendChild(compra);
        compraVenta.appendChild(venta);

        item.appendChild(tipoMoneda);
        item.appendChild(compraVenta);

        plantillaPrecios.appendChild(item);
    });
}

// Función para mostrar mensajes de error en la interfaz
function mostrarMensajeError(mensaje) {
    const mensajeError = document.createElement('div');
    mensajeError.classList.add('mensaje-error');
    mensajeError.textContent = mensaje;

    const contenedorPrincipal = document.querySelector('.contenedor-principal');
    // Limpiar mensajes de error anteriores
    contenedorPrincipal.innerHTML = '';
    contenedorPrincipal.appendChild(mensajeError);
}

// Función para actualizar automáticamente cada 5 minutos
function actualizarCada5Minutos() {
    setInterval(() => {
        cargarCotizaciones(); // Volver a cargar las cotizaciones cada 5 minutos
    }, 300000); // 5 minutos en milisegundos (300000)
}

// Al cargar la página, iniciar la carga de cotizaciones
document.addEventListener('DOMContentLoaded', () => {
    cargarCotizaciones();
});

// Función para mostrar la fecha y hora de la última actualización
function actualizarFechaHora() {
    const fechaHoraElemento = document.querySelector('.actualizacion-datos-fecha-hora');
    if (fechaHoraElemento) {
        const ahora = new Date();
        const fechaFormateada = `${ahora.getDate()}/${ahora.getMonth() + 1}/${ahora.getFullYear()}`;
        const horaFormateada = `${ahora.getHours()}:${ahora.getMinutes().toString().padStart(2, '0')}hs`;
        fechaHoraElemento.innerHTML = `<p>Datos Actualizados al ${fechaFormateada} ${horaFormateada}</p>`;
    }
}
