# Locked In Admin Dashboard

A full-stack admin dashboard application with separate frontend and backend services.

## Project Structure

```
locked-in-admin-dashboard/
├── frontend/         # Frontend application
├── backend/          # Backend server
├── package.json      # Root package.json for managing both services
├── lockedin.sql      # Database schema and initial data
└── README.md         # This file
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- XAMPP (v8.0 or higher)

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

- Frontend development server
- Backend development server

## Available Scripts

- `npm run install-all`: Installs dependencies for all services
- `npm run dev`: Runs both frontend and backend services in development mode

## Database Schema

The application uses a MySQL database with the following main tables:

- `players`: Stores player information
- `player_stats`: Tracks player statistics and progress
- `level_history`: Records level completion history
- `death_logs`: Logs player deaths and attempts

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

[Add your license information here]
