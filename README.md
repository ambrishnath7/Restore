# Alpine Co. – E-Commerce Platform

A full-stack e-commerce platform built with .NET 9, React 19 and Redux Toolkit Query (RTK Query). It covers the complete shopping flow: product catalog, basket, secure checkout with Stripe, order history, user authentication and an admin inventory.

## Key Features

- Product catalog with paging, sorting, searching and filtering
- Shopping basket and checkout with Stripe payments (3D Secure supported)
- Order creation and order history
- User registration and login with ASP.NET Core Identity
- Admin inventory: create, edit and delete products, with image upload to Cloudinary
- Role-based access control on the API and the client
- Global error handling with toast notifications
- Light and dark mode

## Tech Stack   

**Backend**
- .NET 9 Web API (C#)
- Entity Framework Core with SQLite
- ASP.NET Core Identity
- AutoMapper
- Stripe API
- Cloudinary

**Frontend**
- React 19 with TypeScript
- Vite
- Redux Toolkit and RTK Query
- React Router
- Material UI v6
- React Hook Form with Zod validation
- React Toastify

## Architecture

- **API:** a REST API with controllers, services and Entity Framework Core for data access
- **Client:** a single-page React application that uses RTK Query for data fetching and caching
- **Authentication:** cookie-based, using ASP.NET Core Identity with admin and member roles
- **Payments:** Stripe payment intents, confirmed on the client and verified on the server

## Getting Started

### Prerequisites
- .NET 9 SDK
- Node.js (LTS)
- A Stripe account (test mode) and a Cloudinary account

### 1. Clone the repository
```bash
git clone https://github.com/ambrishnath7/Alpine Co..git
cd Alpine Co.
```

### 2. Configure the API
Add your Stripe and Cloudinary keys to `API/appsettings.Development.json` or use user secrets. Never commit real keys.

### 3. Run the API
```bash
cd API
dotnet Alpine Co.
dotnet watch
```
The API runs at http://localhost:5004.

### 4. Run the client
```bash
cd client
npm install
npm run dev
```
The client runs at https://localhost:3000.

### Stripe test card
`4242 4242 4242 4242`, any future expiry date and any CVC.

## Roadmap

- Coupon codes using Stripe promotion codes
- Email confirmation for orders
- Cloud deployment

## Author

Ambrish – https://github.com/ambrishnath7

Built while following the "Learn to build an e-commerce store with .NET, React & Redux" course on Udemy.