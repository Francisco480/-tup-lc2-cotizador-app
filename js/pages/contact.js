document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        // Configuración de EmailJS (reemplaza con tus propios valores)
        emailjs.init('tu_user_id_de_emailjs'); // Reemplaza 'tu_user_id_de_emailjs' con tu User ID de EmailJS

        // Variables con los datos del formulario
        let formData = {
            Nombre: document.getElementById('Nombre').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Enviar el email mediante EmailJS
        emailjs.send('tu_service_id', 'tu_template_id', formData)
            .then(function(response) {
                console.log('Email enviado con éxito!', response.status, response.text);
                alert('Email enviado con éxito!');
                form.reset(); // Limpiar el formulario después de enviar
            }, function(error) {
                console.error('Error al enviar el email:', error);
                alert('Error al enviar el email. Por favor, inténtelo nuevamente más tarde.');
            });
    });
});
