import { Router } from 'express';
import { alumnoController } from '../controllers/alumnoController';

const router = Router();

router.get('/', alumnoController.getAll);
router.get('/:lu', alumnoController.getById);
router.post('/', alumnoController.create);
router.put('/:lu', alumnoController.update);
router.delete('/:lu', alumnoController.delete);

export default router;
