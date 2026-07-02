
const { body, validationResult } = require('express-validator');
const Estudiante = require('../models/Estudiante');
const { createCrudController } = require('../utils/crudFactory');

// Validaciones para Estudiante
const EstudianteValidation = [
 
  body('nombre')
    .isLength({ min: 1, max: 100 })
    .withMessage('El nombre es requerido y debe tener máximo 100 caracteres')
    .trim(),
  
    body('apellido')
    .isLength({ min: 1, max: 100 })
    .withMessage('El apellido es requerido y debe tener máximo 100 caracteres')
    .trim(),
  
];

// Usar CRUD básico como base
const baseCrud = createCrudController('Estudiantes', 'id_estudiante');

// all estudiantes
const getAllEstudiantes = async (req, res, next) => {
  try {
    
    const result = await Estudiante.getAll();
    
    res.json({
      success: true,
      data: result.Estudiantes
      
    });
  } catch (error) {
    next(error);
  }
};



module.exports = {
  getAllEstudiantes,
  EstudianteValidation
};
