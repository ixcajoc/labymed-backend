
const express = require('express');
const router = express.Router();

// Todas las rutas
const estudiantesRoutes = require('./estudiantes');

// Montar las rutas
router.use('/estudiantes', estudiantesRoutes);


// Ruta de información de la API
router.get('/', (req, res) => {
  res.json({
    name: 'Academica API',
    version: '1.0.0',
    description: 'API REST para sistema de gestión academica',
    status: 'active',
    endpoints: {
      estudiantes: {
        description: 'Gestión de estudiantes',
        routes: [
          'GET /api/estudiantes - Listar estudiantes',
          
        ]
      },
    },
    documentation: 'https://github.com...',
  });
});

module.exports = router;
