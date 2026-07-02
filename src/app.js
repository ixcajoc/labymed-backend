
const express = require('express');
const cors = require('cors');
require('dotenv').config();



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

function executeStatement() {
  request = new Request("select * from Estudiantes", (err, rowCount) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`${rowCount} rows`);
    }
    connection.close();
  });

  request.on('row', (columns) => {
    columns.forEach((column) => {
      if (column.value === null) {
        console.log('NULL');
      } else {
        console.log(column.value);
      }
    });
  });

  connection.execSql(request);
}


const routes = require('./routes');
// const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();


// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


// Rutas principales
app.use('/api', routes);



// Documentación básica
app.get('/api/docs', (req, res) => {
  res.json({
    name: 'GESTION ACADEMICA API',
    version: '1.0.0',
    description: 'API REST para sistema de gestión academica',
    endpoints: {
      estudiantes: '/api/estudiantes',
   
    },
    documentation: 'https://github.com/ixcajoc'
  });
});

// Middleware de manejo de errores
// app.use(notFound);
// app.use(errorHandler);

module.exports = app;
