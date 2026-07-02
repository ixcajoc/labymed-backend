
const { query } = require('../config/database');

// Factory para crear operaciones CRUD básicas
const createCrudController = (tableName, primaryKey = 'id') => {
  return {
    // Obtener todos los registros
    getAll: async (req, res, next) => {
      try {
        const {orderBy = primaryKey, order = 'ASC' } = req.query;

        // Validar parámetros de ordenamiento
        const validOrders = ['ASC', 'DESC'];
        const finalOrder = validOrders.includes(order.toUpperCase()) ? order.toUpperCase() : 'ASC';

        const countResult = await query(`SELECT COUNT(*) FROM ${tableName}`);
        const total = parseInt(countResult.rows[0].count);

        const result = await query(
          `SELECT * FROM ${tableName} ORDER BY ${orderBy} ${finalOrder}`
        );

        res.json({
          success: true,
          data: result.rows,
        });
      } catch (error) {
        next(error);
      }
    },
  };
};

module.exports = { createCrudController };
