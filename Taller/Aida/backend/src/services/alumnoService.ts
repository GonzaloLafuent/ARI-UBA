import pool from '../database/connection';

export interface Alumno {
  lu: number;
  nombre: string;
  apellido: string;
  email: string;
  fecha_inscripcion: string;
  estado: string;
}

export const alumnoService = {
  getAll: async (): Promise<Alumno[]> => {
    const result = await pool.query('SELECT * FROM alumnos ORDER BY lu');
    return result.rows;
  },

  getById: async (lu: number): Promise<Alumno | null> => {
    const result = await pool.query('SELECT * FROM alumnos WHERE lu = $1', [lu]);
    return result.rows[0] || null;
  },

  create: async (alumno: Alumno): Promise<Alumno> => {
    const { lu, nombre, apellido, email, fecha_inscripcion, estado } = alumno;
    const result = await pool.query(
      'INSERT INTO alumnos (lu, nombre, apellido, email, fecha_inscripcion, estado) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [lu, nombre, apellido, email, fecha_inscripcion, estado]
    );
    return result.rows[0];
  },

  update: async (lu: number, alumno: Partial<Alumno>): Promise<Alumno | null> => {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (alumno.nombre !== undefined) {
      fields.push(`nombre = $${paramCount++}`);
      values.push(alumno.nombre);
    }
    if (alumno.apellido !== undefined) {
      fields.push(`apellido = $${paramCount++}`);
      values.push(alumno.apellido);
    }
    if (alumno.email !== undefined) {
      fields.push(`email = $${paramCount++}`);
      values.push(alumno.email);
    }
    if (alumno.estado !== undefined) {
      fields.push(`estado = $${paramCount++}`);
      values.push(alumno.estado);
    }

    if (fields.length === 0) return await alumnoService.getById(lu);

    values.push(lu);
    const query = `UPDATE alumnos SET ${fields.join(', ')} WHERE lu = $${paramCount} RETURNING *`;
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  },

  delete: async (lu: number): Promise<boolean> => {
    const result = await pool.query('DELETE FROM alumnos WHERE lu = $1', [lu]);
    return result.rowCount! > 0;
  },
};
