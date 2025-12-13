// TDD: RED PHASE - Write failing tests for Inventory Management
import request from 'supertest';
import { app } from '../src/app';
import { InventoryService } from '../src/services/InventoryService';

describe('Inventory Management System - TDD', () => {
  let adminToken: string;
  let userToken: string;

  beforeAll(async () => {
    // Setup tokens (assuming auth system is working)
    const adminResponse = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'admin.inventory@sweetshop.com',
        password: 'admin123',
        name: 'Inventory Admin',
        role: 'admin'
      });
    adminToken = adminResponse.body.token;

    const userResponse = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'customer@sweetshop.com',
        password: 'user123',
        name: 'Customer'
      });
    userToken = userResponse.body.token;
  });

  describe('InventoryService', () => {
    let inventoryService: InventoryService;

    beforeEach(() => {
      inventoryService = new InventoryService();
    });

    // RED: This test will fail initially
    it('should purchase sweet and decrease stock', async () => {
      const sweetId = 1;
      const purchaseQuantity = 2;
      const initialQuantity = 10;

      // Mock initial sweet with quantity
      const result = await inventoryService.purchaseSweet(sweetId, purchaseQuantity);
      
      expect(result.success).toBe(true);
      expect(result.newQuantity).toBe(initialQuantity - purchaseQuantity);
      expect(result.message).toContain('purchased successfully');
    });

    // RED: This test will fail initially
    it('should not allow purchase when insufficient stock', async () => {
      const sweetId = 1;
      const purchaseQuantity = 15; // More than available
      
      const result = await inventoryService.purchaseSweet(sweetId, purchaseQuantity);
      
      expect(result.success).toBe(false);
      expect(result.message).toContain('insufficient stock');
    });

    // RED: This test will fail initially
    it('should not allow purchase when quantity is zero', async () => {
      const sweetId = 2; // Sweet with 0 quantity
      const purchaseQuantity = 1;
      
      const result = await inventoryService.purchaseSweet(sweetId, purchaseQuantity);
      
      expect(result.success).toBe(false);
      expect(result.message).toContain('out of stock');
    });

    // RED: This test will fail initially
    it('should restock sweet inventory', async () => {
      const sweetId = 1;
      const restockQuantity = 5;
      const currentQuantity = 8;
      
      const result = await inventoryService.restockSweet(sweetId, restockQuantity);
      
      expect(result.success).toBe(true);
      expect(result.newQuantity).toBe(currentQuantity + restockQuantity);
      expect(result.message).toContain('restocked successfully');
    });

    // RED: This test will fail initially
    it('should get inventory status', async () => {
      const inventory = await inventoryService.getInventoryStatus();
      
      expect(Array.isArray(inventory)).toBe(true);
      inventory.forEach(item => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('name');
        expect(item).toHaveProperty('quantity');
        expect(item).toHaveProperty('status'); // 'in-stock', 'low-stock', 'out-of-stock'
      });
    });

    // RED: This test will fail initially
    it('should identify low stock items', async () => {
      const lowStockItems = await inventoryService.getLowStockItems(5); // threshold = 5
      
      expect(Array.isArray(lowStockItems)).toBe(true);
      lowStockItems.forEach(item => {
        expect(item.quantity).toBeLessThanOrEqual(5);
      });
    });
  });

  describe('Inventory API Endpoints', () => {
    describe('POST /api/inventory/purchase', () => {
      // RED: This test will fail initially
      it('should allow user to purchase sweet', async () => {
        const purchaseData = {
          sweetId: 1,
          quantity: 2
        };

        const response = await request(app)
          .post('/api/inventory/purchase')
          .set('Authorization', `Bearer ${userToken}`)
          .send(purchaseData)
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body).toHaveProperty('newQuantity');
        expect(response.body).toHaveProperty('message');
      });

      // RED: This test will fail initially
      it('should not allow purchase without authentication', async () => {
        const purchaseData = {
          sweetId: 1,
          quantity: 2
        };

        await request(app)
          .post('/api/inventory/purchase')
          .send(purchaseData)
          .expect(401);
      });

      // RED: This test will fail initially
      it('should not allow purchase with invalid quantity', async () => {
        const purchaseData = {
          sweetId: 1,
          quantity: -1 // Invalid quantity
        };

        await request(app)
          .post('/api/inventory/purchase')
          .set('Authorization', `Bearer ${userToken}`)
          .send(purchaseData)
          .expect(400);
      });
    });

    describe('POST /api/inventory/restock', () => {
      // RED: This test will fail initially
      it('should allow admin to restock sweet', async () => {
        const restockData = {
          sweetId: 1,
          quantity: 10
        };

        const response = await request(app)
          .post('/api/inventory/restock')
          .set('Authorization', `Bearer ${adminToken}`)
          .send(restockData)
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body).toHaveProperty('newQuantity');
      });

      // RED: This test will fail initially
      it('should not allow regular user to restock', async () => {
        const restockData = {
          sweetId: 1,
          quantity: 10
        };

        await request(app)
          .post('/api/inventory/restock')
          .set('Authorization', `Bearer ${userToken}`)
          .send(restockData)
          .expect(403);
      });
    });

    describe('GET /api/inventory/status', () => {
      // RED: This test will fail initially
      it('should allow admin to view inventory status', async () => {
        const response = await request(app)
          .get('/api/inventory/status')
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
      });

      // RED: This test will fail initially
      it('should not allow regular user to view full inventory status', async () => {
        await request(app)
          .get('/api/inventory/status')
          .set('Authorization', `Bearer ${userToken}`)
          .expect(403);
      });
    });

    describe('GET /api/inventory/low-stock', () => {
      // RED: This test will fail initially
      it('should allow admin to view low stock items', async () => {
        const response = await request(app)
          .get('/api/inventory/low-stock?threshold=5')
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
      });
    });
  });
});