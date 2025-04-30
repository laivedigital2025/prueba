# Sistema de Registro para Demos Laive

Sistema web moderno para el registro de participantes en demos y presentaciones internas de Laive.

## Características

- Diseño moderno y responsive
- Formulario de registro con validación
- Listado de próximas demos
- Notificaciones interactivas
- Conexión con SQL Server
- Listo para desplegar en Render

## Requisitos

- Node.js 14.x o superior
- SQL Server
- npm o yarn

## Configuración

1. Clona el repositorio:
```bash
git clone <repository-url>
cd demo-laive
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura la base de datos:

La aplicación ya está configurada para conectarse a SQL Server con las siguientes credenciales:
- Usuario: Distribuidores
- Contraseña: Laive1234
- Servidor: satel
- Base de datos: LaiveDistribuidoras
- Puerto: 1433

4. Crea la tabla necesaria en SQL Server:
```sql
CREATE TABLE RegistroDemos (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    NombreApellido VARCHAR(255) NOT NULL,
    Correo VARCHAR(255) NOT NULL,
    Evento VARCHAR(255) NOT NULL,
    FechaRegistro DATETIME NOT NULL
)
```

## Ejecución Local

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## Despliegue en Render

1. Crea una cuenta en Render (https://render.com)
2. Conecta tu repositorio de GitHub
3. Crea un nuevo Web Service
4. Configura el servicio:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment Variables: No se requieren ya que están en el código

## Personalización

### Logos
Reemplaza los archivos en la carpeta `/public/images/`:
- `laive-logo.png`
- `tedi-logo.png`

### Colores
Modifica las variables CSS en `/public/css/styles.css`:
```css
:root {
    --primary-color: #6B21A8;
    --secondary-color: #D946EF;
    --background-color: #581C87;
    /* ... */
}
```

## Estructura del Proyecto

```
demo-laive/
├── config/
│   └── db.js
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       ├── laive-logo.png
│       └── tedi-logo.png
├── views/
│   └── index.ejs
├── server.js
├── package.json
└── README.md
```

## Soporte

Para soporte o preguntas, contacta al equipo de TEDI. 