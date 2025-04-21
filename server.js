const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { getConnection } = require('./config/db');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Rutas API
app.get('/api/events', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .query('SELECT * FROM Events WHERE IsActive = 1');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Error al obtener los eventos' });
    }
});

app.post('/api/register', async (req, res) => {
    const { email, eventId } = req.body;
    
    if (!email || !eventId) {
        return res.status(400).json({ error: 'Email y EventId son requeridos' });
    }

    try {
        const pool = await getConnection();
        
        // Verificar capacidad del evento
        const eventResult = await pool.request()
            .input('eventId', eventId)
            .query('SELECT CurrentCapacity, MaxCapacity FROM Events WHERE EventId = @eventId');
        
        if (eventResult.recordset.length === 0) {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }

        const event = eventResult.recordset[0];
        if (event.CurrentCapacity >= event.MaxCapacity) {
            return res.status(400).json({ error: 'El evento está lleno' });
        }

        // Registrar usuario
        await pool.request()
            .input('email', email)
            .input('eventId', eventId)
            .query(`
                INSERT INTO Registrations (Email, EventId)
                VALUES (@email, @eventId);
                UPDATE Events SET CurrentCapacity = CurrentCapacity + 1
                WHERE EventId = @eventId;
            `);

        res.json({ message: 'Registro exitoso' });
    } catch (error) {
        console.error('Error registering user:', error);
        if (error.number === 2627) { // Violación de clave única
            res.status(400).json({ error: 'Ya estás registrado en este evento' });
        } else {
            res.status(500).json({ error: 'Error al registrar usuario' });
        }
    }
});

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
}); 