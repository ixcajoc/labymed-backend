
const { query } = require('../config/database');

class Estudiante {
  static async getAll() {
    const result = await query(
      `SELECT * from Estudiantes`,
    );
    return result.rows[0];
  }

}

module.exports = Estudiante;
