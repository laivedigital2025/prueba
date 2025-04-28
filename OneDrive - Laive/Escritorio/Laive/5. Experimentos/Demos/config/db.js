const sql = require('mssql');

const dbConfig = {
    user: 'Distribuidores',
    password: 'Laive1234',
    server: 'satel',
    database: 'LaiveDistribuidoras',
    port: 1433,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

async function getConnection() {
    try {
        const pool = await sql.connect(dbConfig);
        console.log('✅ Conexión exitosa a SQL Server');
        return pool;
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        throw error;
    }
}

module.exports = {
    getConnection
};
