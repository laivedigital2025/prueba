document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registroForm');
    const notification = document.getElementById('notification');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                showNotification(result.message, 'success');
                form.reset();
            } else {
                const errorMessage = result.errors ? 
                    result.errors.map(err => err.msg).join('\n') : 
                    'Error al procesar el registro';
                showNotification(errorMessage, 'error');
            }
        } catch (error) {
            showNotification('Error al conectar con el servidor', 'error');
        }
    });

    function showNotification(message, type = 'success') {
        notification.textContent = message;
        notification.style.background = type === 'success' ? '#6B21A8' : '#DC2626';
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }
}); 