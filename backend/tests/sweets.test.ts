// TDD: RED PHASE - Write failing tests for Sweet Management
import request from 'supertest';
import { app } from '../src/app';
import { SweetService } from '../src/services/SweetService';

describe('Sweet Management System - TDD', () => {
  let adminToken: string;
  let userToken: string;

  beforeAll(async () => {
    // Setup admin user
    const adminResponse = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'admin@sweetshop.com',
        password: 'admin123',
        name: 'Admin User',
        role: 'admin'
      });
    adminToken = adminResponse.body.token;

    // Setup regular user
    const userResponse = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'user@sweetshop.com',
        password: 'user123',
        name: 'Regular User'
      });
    userToken = userResponse.body.token;
  });

  describe('SweetService', () => {
    let sweetService: SweetService;

    beforeEach(() => {
      sweetService = new SweetService();
    });

    // RED: This test will fail initially
    it('should create a new sweet', async () => {
      const sweetData = {
        name: 'Chocolate Cake',
        description: 'Delicious chocolate cake',
        price: 15.99,
        quantity: 10,
        category: 'Cakes'
      };

      const sweet = await sweetService.createSweet(sweetData);
      
      expect(sweet).toHaveProperty('id');
      expect(sweet.name).toBe(sweetData.name);
      expect(sweet.price).toBe(sweetData.price);
      expect(sweet.quantity).toBe(sweetData.quantity);
    });

    // RED: This test will fail initially
    it('should get all sweets', async () => {
      const sweets = await sweetService.getAllSweets();
      expect(Array.isArray(sweets)).toBe(true);
    });

    // RED: This test will fail initially
    it('should search sweets by name', async () => {
      const searchTerm = 'chocolate';
      const sweets = await sweetService.searchSweets(searchTerm);
      
      expect(Array.isArray(sweets)).toBe(true);
      sweets.forEach(sweet => {
        expect(sweet.name.toLowerCase()).toContain(searchTerm.toLowerCase());
      });
    });

    // RED: This test will fail initially
    it('should update sweet quantity', async () => {
      const sweetId = 1;
      const newQuantity = 5;
      
      const updatedSweet = await sweetService.updateQuantity(sweetId, newQuantity);
      expect(updatedSweet.quantity).toBe(newQuantity);
    });
  });

  describe('Sweet API Endpoints', () => {
    describe('POST /api/sweets', () => {
      // RED: This test will fail initially
      it('should allow admin to create sweet', async () => {
        const sweetData = {
          name: 'Vanilla Cupcake',
          description: 'Sweet vanilla cupcake',
          price: 3.99,
          quantity: 20,
          category: 'Cupcakes'
        };

        const response = await request(app)
          .post('/api/sweets')
          .set('Authorization', `Bearer ${adminToken}`)
          .send(sweetData)
          .expect(201);

        expect(response.body.name).toBe(sweetData.name);
        expect(response.body.price).toBe(sweetData.price);
      });

      // RED: This test will fail initially
      it('should not allow regular user to create sweet', async () => {
        const sweetData = {
          name: 'Unauthorized Sweet',
          description: 'This should fail',
          price: 5.99,
          quantity: 10,
          category: 'Test'
        };

        await request(app)
          .post('/api/sweets')
          .set('Authorization', `Bearer ${userToken}`)
          .send(sweetData)
          .expect(403);
      });
    });

    describe('GET /api/sweets', () => {
      // RED: This test will fail initially
      it('should get all sweets for any user', async () => {
        const response = await request(app)
          .get('/api/sweets')
          .set('Authorization', `Bearer ${userToken}`)
          .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
      });

      // RED: This test will fail initially
      it('should search sweets with query parameter', async () => {
        const response = await request(app)
          .get('/api/sweets?search=cake')
          .set('Authorization', `Bearer ${userToken}`)
          .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
      });
    });

    describe('PUT /api/sweets/:id', () => {
      // RED: This test will fail initially
      it('should allow admin to update sweet', async () => {
        const updateData = {
          name: 'Updated Sweet Name',
          price: 12.99
        };

        const response = await request(app)
          .put('/api/sweets/1')
          .set('Authorization', `Bearer ${adminToken}`)
          .send(updateData)
          .expect(200);

        expect(response.body.name).toBe(updateData.name);
        expect(response.body.price).toBe(updateData.price);
      });
    });

    describe('DELETE /api/sweets/:id', () => {
      // RED: This test will fail initially
      it('should allow admin to delete sweet', async () => {
        await request(app)
          .delete('/api/sweets/1')
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(204);
      });

      // RED: This test will fail initially
      it('should not allow regular user to delete sweet', async () => {
        await request(app)
          .delete('/api/sweets/1')
          .set('Authorization', `Bearer ${userToken}`)
          .expect(403);
      });
    });
  });
});