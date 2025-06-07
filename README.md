# Locked-In Admin Dashboard

A comprehensive admin dashboard for managing and monitoring the Locked-In game platform. This dashboard provides tools for tracking player progress, managing game content, and analyzing player statistics.

## Project Structure

```
locked-in-admin-dashboard/
├── frontend/         # Frontend application (React)
├── backend/          # Backend server (Node.js/Express)
├── package.json      # Root package.json for managing both services
├── lockedin.sql      # Database schema and initial data
└── README.md         # This file
```

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)
- XAMPP (for MySQL database)
- Git

## Database Setup

1. Install XAMPP:
   - Download XAMPP from [https://www.apachefriends.org/](https://www.apachefriends.org/)
   - Run the installer and follow the installation wizard
   - Start XAMPP Control Panel

2. Start MySQL and Apache:
   - Open XAMPP Control Panel
   - Click "Start" next to Apache
   - Click "Start" next to MySQL

3. Import Database:
   - Open your web browser and go to `http://localhost/phpmyadmin`
   - Click "New" to create a new database
   - Enter "lockedin" as the database name and click "Create"
   - Select the "lockedin" database from the left sidebar
   - Click the "Import" tab at the top
   - Click "Choose File" and select the `lockedin.sql` file from the project root
   - Click "Go" to import the database

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd locked-in-admin-dashboard
```

2. Install dependencies for all services:
```bash
npm run install-all
```

This will install dependencies for:
- Root project
- Frontend application
- Backend server

## Development

To run both frontend and backend services concurrently in development mode:

```bash
npm run dev
```

This will start:
- Frontend development server (default: http://localhost:3000)
- Backend development server (default: http://localhost:5000)

## Available Scripts

- `npm run install-all`: Installs dependencies for all services
- `npm run dev`: Runs both frontend and backend services in development mode
- `npm run build`: Builds the frontend application for production
- `npm run start`: Starts the production server


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
