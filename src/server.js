
const app = require('./app');
// const { pool } = require('./config/database');
// const { tedious } = require('./config/database');
// const Connection = require('tedious').Connection;



const PORT = process.env.PORT || 3000;

// Verificar conexión a la base de datos al iniciar
// Connection.on()
//   .then(client => {
//     console.log('Conexión exitosa a SqlServer');
//     client.release();
//   })
//   .catch(err => {
//     console.error('Error conectando a SqlServer:', err.message);
//     process.exit(1);
//   });


const Connection = require('tedious').Connection;
const Request = require('tedious').Request;

const config = {
  server: 'localhost',
  authentication: {
    type: 'default',
    options: {
      userName: 'sa',
      password: 'ClaveSegura2026.',
    },
  },
};

const connection = new Connection(config);

connection.on('connect', (err) => {
  if (err) {
    console.log(err);
  } else {
    executeStatement();
  }
});



const server = app.listen(PORT, () => {
  console.log(`Servidor Estudiantes API ejecutándose en puerto ${PORT}`);
  console.log(`Documentación disponible en http://localhost:${PORT}/api/docs`);
});

// Manejo graceful de cierre del servidor
process.on('SIGTERM', () => {
  console.log(' Cerrando servidor...');
  server.close(() => {
    console.log('Servidor cerrado correctamente');
    tedious.end();
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log(' Cerrando servidor...');
  server.close(() => {
    console.log('Servidor cerrado correctamente');
    tedious.end();
    process.exit(0);
  });
});
