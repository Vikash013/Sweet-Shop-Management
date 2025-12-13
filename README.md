# Sweet Shop Management System

A full-stack application built with Test-Driven Development (TDD) principles.

## 🤖 AI Co-Authorship Acknowledgment
This project was developed with AI assistance (Amazon Q Developer) following TDD best practices and SOLID principles.

## Tech Stack

### Backend
- Node.js + TypeScript + Express
- PostgreSQL with Prisma ORM
- JWT Authentication
- Jest for testing

### Frontend
- React + TypeScript
- React Testing Library
- Axios for API calls

## Features

### Authentication
- User registration/login
- JWT-based authentication
- Role-based access (user/admin)

### Sweet Management
- CRUD operations for sweets
- Search and filtering
- Admin-only management

### Inventory Management
- Purchase system (stock decrease)
- Restock functionality (admin-only)
- Real-time stock tracking

## TDD Approach

This project follows strict TDD methodology:
1. **Red**: Write failing tests first
2. **Green**: Write minimal code to pass tests
3. **Refactor**: Improve code while keeping tests green

## Getting Started

### Backend Setup
```bash
cd backend
npm install
npm run test
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm test
npm start
```

## Testing Strategy

- Unit tests for all business logic
- Integration tests for API endpoints
- Component tests for React components
- High test coverage (>90%)

## SOLID Principles Applied

- **S**ingle Responsibility: Each class/function has one purpose
- **O**pen/Closed: Extensible without modification
- **L**iskov Substitution: Proper inheritance usage
- **I**nterface Segregation: Focused interfaces
- **D**ependency Inversion: Depend on abstractions