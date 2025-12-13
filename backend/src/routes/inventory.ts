// Inventory routes with role-based access control
import { Router } from 'express';
import { InventoryController } from '../controllers/InventoryController';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();
const inventoryController = new InventoryController();

// POST /api/inventory/purchase - Purchase sweet (authenticated users)
router.post('/purchase', authenticate, inventoryController.purchaseSweet);

// POST /api/inventory/restock - Restock sweet (admin only)
router.post('/restock', authenticate, requireAdmin, inventoryController.restockSweet);

// GET /api/inventory/status - Get inventory status (admin only)
router.get('/status', authenticate, requireAdmin, inventoryController.getInventoryStatus);

// GET /api/inventory/low-stock - Get low stock items (admin only)
router.get('/low-stock', authenticate, requireAdmin, inventoryController.getLowStockItems);

export default router;