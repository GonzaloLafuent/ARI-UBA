import { Request, Response } from 'express';
import { materiaService } from '../services/materiaService';

export const materiaController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const materias = await materiaService.getAll();
      res.json(materias);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener materias' });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const codigo = req.params.codigo_materia;
      const materia = await materiaService.getById(codigo);
      if (!materia) {
        return res.status(404).json({ error: 'Materia no encontrada' });
      }
      res.json(materia);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener materia' });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const materia = await materiaService.create(req.body);
      res.status(201).json(materia);
    } catch (error: any) {
      if (error.code === '23505') {
        return res.status(409).json({ error: 'El código de materia ya existe' });
      }
      res.status(500).json({ error: 'Error al crear materia' });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const codigo = req.params.codigo_materia;
      const materia = await materiaService.update(codigo, req.body);
      if (!materia) {
        return res.status(404).json({ error: 'Materia no encontrada' });
      }
      res.json(materia);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar materia' });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const codigo = req.params.codigo_materia;
      const deleted = await materiaService.delete(codigo);
      if (!deleted) {
        return res.status(404).json({ error: 'Materia no encontrada' });
      }
      res.json({ message: 'Materia eliminada' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar materia' });
    }
  },
};
