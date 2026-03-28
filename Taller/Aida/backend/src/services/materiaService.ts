import pool from '../database/connection';

export interface Materia {
  codigo_materia: string;
  nombre: string;
  descripcion?: string;
  creditos?: number;
  horas?: number;
}

export const materiaService = {
  getAll: async (): Promise<Materia[]> => {
    const result = await pool.query('SELECT * FROM materias ORDER BY codigo_materia');
    return result.rows;
  },

  getById: async (codigo_materia: string): Promise<Materia | null> => {
    const result = await pool.query('SELECT * FROM materias WHERE codigo_materia = $1', [codigo_materia]);
    return result.rows[0] || null;
  },

  create: async (materia: Materia): Promise<Materia> => {
    const { codigo_materia, nombre, descripcion, creditos, horas } = materia;
    const result = await pool.query(
      'INSERT INTO materias (codigo_materia, nombre, descripcion, creditos, horas) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [codigo_materia, nombre, descripcion, creditos, horas]
    );
    return result.rows[0];
  },

  update: async (codigo_materia: string, materia: Partial<Materia>): Promise<Materia | null> => {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (materia.nombre !== undefined) {
      fields.push(`nombre = $${paramCount++}`);
      values.push(materia.nombre);
    }
    if (materia.descripcion !== undefined) {
      fields.push(`descripcion = $${paramCount++}`);
      values.push(materia.descripcion);
    }
    if (materia.creditos !== undefined) {
      fields.push(`creditos = $${paramCount++}`);
      values.push(materia.creditos);
    }
    if (materia.horas !== undefined) {
      fields.push(`horas = $${paramCount++}`);
      values.push(materia.horas);
    }

    if (fields.length === 0) return await materiaService.getById(codigo_materia);

    values.push(codigo_materia);
    const query = `UPDATE materias SET ${fields.join(', ')} WHERE codigo_materia = $${paramCount} RETURNING *`;
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  },

  delete: async (codigo_materia: string): Promise<boolean> => {
    const result = await pool.query('DELETE FROM materias WHERE codigo_materia = $1', [codigo_materia]);
    return result.rowCount! > 0;
  },
};
