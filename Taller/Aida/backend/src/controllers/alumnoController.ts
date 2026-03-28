import { Request, Response } from 'express';
import { alumnoService } from '../services/alumnoService';

export const alumnoController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const alumnos = await alumnoService.getAll();
      res.json(alumnos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener alumnos' });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const lu = parseInt(req.params.lu);
      const alumno = await alumnoService.getById(lu);
      if (!alumno) {
        return res.status(404).json({ error: 'Alumno no encontrado' });
      }
      res.json(alumno);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener alumno' });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const alumno = await alumnoService.create(req.body);
      res.status(201).json(alumno);
    } catch (error: any) {
      if (error.code === '23505') {
        return res.status(409).json({ error: 'El LU o email ya existe' });
      }
      res.status(500).json({ error: 'Error al crear alumno' });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const lu = parseInt(req.params.lu);
      const alumno = await alumnoService.update(lu, req.body);
      if (!alumno) {
        return res.status(404).json({ error: 'Alumno no encontrado' });
      }
      res.json(alumno);
    } catch (error: any) {
      if (error.code === '23505') {
        return res.status(409).json({ error: 'El email ya existe' });
      }
      res.status(500).json({ error: 'Error al actualizar alumno' });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const lu = parseInt(req.params.lu);
      const deleted = await alumnoService.delete(lu);
      if (!deleted) {
        return res.status(404).json({ error: 'Alumno no encontrado' });
      }
      res.json({ message: 'Alumno eliminado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar alumno' });
    }
  },
};
