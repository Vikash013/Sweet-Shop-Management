// Shop routes
import { Router } from 'express';
import { ShopController } from '../controllers/ShopController';
import { authenticate } from '../middleware/auth';

const router = Router();
const shopController = new ShopController();

router.get('/', authenticate, shopController.getAllShops);
router.get('/:id', authenticate, shopController.getShopById);
router.get('/:id/sweets', authenticate, shopController.getShopSweets);

export default router;