const sql = require('mssql');

const config = {
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

// No intentamos conectar automáticamente
module.exports = {
    config,
    sql
};