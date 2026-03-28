import pool from '../database/connection';

export interface Inscripcion {
  lu: number;
  codigo_materia: string;
  fecha_inscripcion: string;
  calificacion?: number;
  estado: string;
}

export const inscripcionService = {
  getAll: async (): Promise<Inscripcion[]> => {
    const result = await pool.query('SELECT * FROM inscripciones ORDER BY lu, codigo_materia');
    return result.rows;
  },

  getByAlumno: async (lu: number): Promise<Inscripcion[]> => {
    const result = await pool.query('SELECT * FROM inscripciones WHERE lu = $1 ORDER BY codigo_materia', [lu]);
    return result.rows;
  },

  getByMateria: async (codigo_materia: string): Promise<Inscripcion[]> => {
    const result = await pool.query('SELECT * FROM inscripciones WHERE codigo_materia = $1 ORDER BY lu', [codigo_materia]);
    return result.rows;
  },

  getById: async (lu: number, codigo_materia: string): Promise<Inscripcion | null> => {
    const result = await pool.query('SELECT * FROM inscripciones WHERE lu = $1 AND codigo_materia = $2', [lu, codigo_materia]);
    return result.rows[0] || null;
  },

  create: async (inscripcion: Inscripcion): Promise<Inscripcion> => {
    const { lu, codigo_materia, fecha_inscripcion, calificacion, estado } = inscripcion;
    const result = await pool.query(
      'INSERT INTO inscripciones (lu, codigo_materia, fecha_inscripcion, calificacion, estado) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [lu, codigo_materia, fecha_inscripcion, calificacion, estado]
    );
    return result.rows[0];
  },

  update: async (lu: number, codigo_materia: string, inscripcion: Partial<Inscripcion>): Promise<Inscripcion | null> => {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (inscripcion.calificacion !== undefined) {
      fields.push(`calificacion = $${paramCount++}`);
      values.push(inscripcion.calificacion);
    }
    if (inscripcion.estado !== undefined) {
      fields.push(`estado = $${paramCount++}`);
      values.push(inscripcion.estado);
    }
    if (inscripcion.fecha_inscripcion !== undefined) {
      fields.push(`fecha_inscripcion = $${paramCount++}`);
      values.push(inscripcion.fecha_inscripcion);
    }

    if (fields.length === 0) {
      return await inscripcionService.getById(lu, codigo_materia);
    }

    values.push(lu, codigo_materia);
    const query = `UPDATE inscripciones SET ${fields.join(', ')} WHERE lu = $${paramCount} AND codigo_materia = $${paramCount + 1} RETURNING *`;
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  },

  delete: async (lu: number, codigo_materia: string): Promise<boolean> => {
    const result = await pool.query('DELETE FROM inscripciones WHERE lu = $1 AND codigo_materia = $2', [lu, codigo_materia]);
    return result.rowCount! > 0;
  },
};
