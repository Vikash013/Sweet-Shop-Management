// Sweet routes with role-based access control
import { Router } from 'express';
import { SweetController } from '../controllers/SweetController';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();
const sweetController = new SweetController();

// GET /api/sweets - Get all sweets (with optional search)
router.get('/', authenticate, sweetController.getAllSweets);

// GET /api/sweets/:id - Get sweet by ID
router.get('/:id', authenticate, sweetController.getSweetById);

// POST /api/sweets - Create sweet (admin only)
router.post('/', authenticate, requireAdmin, sweetController.createSweet);

// PUT /api/sweets/:id - Update sweet (admin only)
router.put('/:id', authenticate, requireAdmin, sweetController.updateSweet);

// DELETE /api/sweets/:id - Delete sweet (admin only)
router.delete('/:id', authenticate, requireAdmin, sweetController.deleteSweet);

export default router;