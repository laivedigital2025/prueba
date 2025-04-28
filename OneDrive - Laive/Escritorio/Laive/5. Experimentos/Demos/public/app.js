document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const eventSelect = document.getElementById('event');
    const messageDiv = document.getElementById('message');

    // Cargar eventos disponibles
    async function loadEvents() {
        try {
            const response = await fetch('/api/events');
            const events = await response.json();
            
            eventSelect.innerHTML = '<option value="">Selecciona un evento</option>';
            
            events.forEach(event => {
                const option = document.createElement('option');
                option.value = event.EventId;
                option.textContent = `${event.EventName} (${event.CurrentCapacity}/${event.MaxCapacity} cupos)`;
                
                if (event.CurrentCapacity >= event.MaxCapacity) {
                    option.disabled = true;
                    option.textContent += ' - No disponible';
                }
                
                eventSelect.appendChild(option);
            });
        } catch (error) {
            showMessage('Error al cargar los eventos', 'error');
        }
    }

    // Mostrar mensajes al usuario
    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = `message ${type}`;
        messageDiv.style.display = 'block';
        
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }

    // Manejar el envío del formulario
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const eventId = eventSelect.value;
        
        if (!email || !eventId) {
            showMessage('Por favor completa todos los campos', 'error');
            return;
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, eventId })
            });

            const data = await response.json();

            if (response.ok) {
                showMessage('¡Registro exitoso!', 'success');
                form.reset();
                loadEvents(); // Recargar eventos para actualizar cupos
            } else {
                showMessage(data.error || 'Error al registrar', 'error');
            }
        } catch (error) {
            showMessage('Error al conectar con el servidor', 'error');
        }
    });

    // Cargar eventos al iniciar
    loadEvents();
}); 