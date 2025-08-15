# DAIVerse Governance Frontend

A React-based frontend for the DAIVerse governance system, providing a user interface for managing AI datasets, training jobs, and participating in governance decisions.

## Features

- **Dashboard**: Overview of token balance, voting power, and recent activity
- **Token Management**: Transfer and approve DAIV tokens
- **Governance**: View and vote on governance proposals
- **Dataset Registry**: Register and manage AI datasets
- **Training Jobs**: Create and monitor AI training jobs
- **Treasury**: View treasury balance and transactions
- **Wallet Integration**: MetaMask wallet connection

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MetaMask browser extension

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Configuration

Before using the application, you need to update the contract addresses in the following files:

- `src/pages/Dashboard.tsx`
- `src/pages/TokenManagement.tsx`

Replace the placeholder addresses (`0x...`) with your actual deployed contract addresses.

## Usage

1. Connect your MetaMask wallet
2. Navigate through the different sections using the navigation menu
3. Participate in governance, manage datasets, and monitor training jobs

## Project Structure

```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
│   └── useWallet.ts    # Wallet connection hook
├── lib/                # Contract ABIs and utilities
│   ├── DAIVToken.ts    # DAIV token contract interface
│   └── Governor.ts     # Governance contract interface
├── pages/              # Page components
│   ├── Dashboard.tsx
│   ├── TokenManagement.tsx
│   ├── Governance.tsx
│   ├── DatasetRegistry.tsx
│   ├── TrainingJobs.tsx
│   └── Treasury.tsx
├── types/              # TypeScript type definitions
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## Technologies Used

- React 18
- TypeScript
- Vite
- Ethers.js
- React Router
- MetaMask integration
