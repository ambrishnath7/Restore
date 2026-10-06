# Restore – E-Commerce Store

A full-stack e-commerce application built with .NET 9, React 19 and Redux Toolkit Query (RTK Query). It includes a product catalog, shopping basket, Stripe checkout, order history, authentication, and an admin inventory.

## Features

- Product catalog with paging, sorting, searching and filtering
- Product details page
- Shopping basket
- Registration and login with ASP.NET Core Identity
- Checkout with Stripe payments (3D Secure supported)
- Order creation and order history
- Admin inventory: create, edit and delete products, with image upload to Cloudinary
- Role-based access: admin-only routes, hidden menu links, and 403 handling
- Light and dark mode
- Global error handling with toast notifications

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

## Getting Started

### Prerequisites
- .NET 9 SDK
- Node.js (LTS)
- A Stripe account (test mode) and a Cloudinary account

### 1. Clone the repository
```bash
git clone https://github.com/ambrishnath7/Restore.git
cd Restore
```

### 2. Configure the API
Add your Stripe and Cloudinary keys to `API/appsettings.Development.json` or use user secrets. Never commit real keys.

### 3. Run the API
```bash
cd API
dotnet restore
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

## What I Learned

- Building a REST API with .NET, EF Core and Identity
- Managing client state and server cache with RTK Query
- Integrating third-party services (Stripe payments, Cloudinary image uploads)
- Sending files with FormData from React to .NET
- Role-based authorization on both the API and the client

## Roadmap

- Coupon codes using Stripe promotion codes
- Email confirmation for orders
- Deployment

## Author

Ambrish – https://github.com/ambrishnath7

Built by Ambrish, Software Developer at Conprg Technologies, as a full-stack learning project.
