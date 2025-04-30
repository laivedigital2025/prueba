const express = require('express');
const path = require('path');
const cors = require('cors');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.get('/', (req, res) => {
    res.render('index', {
        demos: [
            {
                title: 'App de Ventas MAX',
                description: 'Aprende cómo nuestra fuerza de ventas gestiona a nuestros clientes y qué oferta valor les damos usando MAX.',
                fecha: 'Jueves 29 de Mayo',
                lugar: 'Oficinas Surco'
            },
            {
                title: 'Control Pro: OEE + TQM',
                description: 'Conozcamos la herramienta que utilizan las plantas de producción para hacer más eficiente su trabajo diario.',
                fecha: 'Jueves 19 de Junio',
                lugar: 'Planta Laive'
            }
        ]
    });
});

// Validación y registro de participantes (versión sin base de datos)
app.post('/registro', [
    body('nombreApellido').trim().notEmpty().withMessage('El nombre es requerido'),
    body('correo').isEmail().withMessage('Ingrese un correo válido'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Simulamos el registro exitoso
        console.log('Registro simulado:', req.body);
        res.json({ message: '¡Gracias por registrarte!' });
    } catch (error) {
        console.error('Error al registrar:', error);
        res.status(500).json({ error: 'Error al procesar el registro' });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});