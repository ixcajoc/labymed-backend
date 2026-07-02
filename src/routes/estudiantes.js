
const express = require('express');
const router = express.Router();
const {

  estudianteValidation,
  getAllEstudiantes
} = require('../controllers/estudianteController');

// Rutas públicas
router.get('/', getAllEstudiantes);


// Rutas protegida
// router.post('/',);
// router.delete('/',);


module.exports = router;
