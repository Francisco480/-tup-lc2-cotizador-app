document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.form'); // Selección del formulario por su clase

    // Configuración de EmailJS
    emailjs.init('hvwQ-bV8E0i3YrkrW'); // Reemplaza YOUR_USER_ID con tu User ID de EmailJS

    // Manejo del envío del formulario
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita que el formulario se envíe automáticamente

        // Recolectar datos del formulario
        const formData = new FormData(form);
        const name = formData.get('Nombre');
        const email = formData.get('email');
        const message = formData.get('message');

        // Configuración del servicio de EmailJS
        const serviceID = 'service_15etgsb'; // Reemplaza YOUR_SERVICE_ID con tu Service ID de EmailJS
        const templateID = 'template_72s4h35'; // Reemplaza YOUR_TEMPLATE_ID con tu Template ID de EmailJS

        // Objeto con los datos del email a enviar
        const emailParams = {
            from_name: name,
            from_email: email,
            message: message
        };

        // Envío del email utilizando EmailJS
        emailjs.send(serviceID, templateID, emailParams)
            .then(function () {
                alert('Email enviado correctamente.');
                form.reset(); // Limpiar el formulario después del envío exitoso
            }, function (error) {
                console.error('Error al enviar el email:', error);
                alert('Hubo un problema al enviar el email. Por favor, inténtelo más tarde.');
            });
    });
});


