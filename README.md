# Alpine Co. – E-Commerce Platform

A full-stack e-commerce platform for snow gear, built with .NET 9, React 19 and Redux Toolkit Query (RTK Query). It covers the complete shopping flow: product catalog, basket, secure checkout with Stripe, order history, user authentication and an admin inventory.

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
- Entity Framework Core with SQL Server
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
- .NET SDK
- Node.js (LTS)
- Docker Desktop (for the SQL Server database)
- A Stripe account (test mode) and a Cloudinary account

### 1. Clone the repository
```bash
git clone https://github.com/ambrishnath7/Restore.git
cd Restore
```

### 2. Start the database
```bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<your-password>" -p 1433:1433 --name sql -d mcr.microsoft.com/mssql/server:2022-latest
```

### 3. Configure the API
Add your database connection string, Stripe keys and Cloudinary keys to `api/appsettings.Development.json` or use user secrets. Never commit real keys.

### 4. Run the API
```bash
cd api
dotnet restore
dotnet watch
```
The API runs at https://localhost:5004.

### 5. Run the client
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

**Ambrish**
Software Developer, Conprg Technologies
GitHub: https://github.com/ambrishnath7