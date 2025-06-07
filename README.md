# Locked-In Admin Dashboard

A comprehensive admin dashboard for managing and monitoring the Locked-In game platform. This dashboard provides tools for tracking player progress, managing game content, and analyzing player statistics. Currently using mock data for demonstration purposes.

## Project Structure

```
locked-in-admin-dashboard/
├── src/              # Source code
│   ├── services/     # Mock data and services
│   └── components/   # React components
├── public/           # Static assets
├── package.json      # Project dependencies
└── README.md         # This file
```

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd locked-in-admin-dashboard
```

2. Install dependencies:
```bash
npm install
```

## Development

To run the development server:

```bash
npm run dev
```

This will start the development server (default: http://localhost:3000)

## Available Scripts

- `npm run dev`: Runs the development server
- `npm run build`: Builds the application for production
- `npm run preview`: Previews the production build locally

## Mock Data

The application currently uses mock data located in `src/services/mockData.js`. This includes:
- Player statistics
- Game progress
- Upgrade usage
- Death locations
- Riddle statistics
- Platform distribution

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
