# DAIVerse Governance

A decentralized governance system for AI datasets and training jobs, built with Solidity smart contracts and React frontend.

## 🚀 Features

### Smart Contracts
- **DAIV Token**: ERC-20 governance token with voting power delegation
- **Governance**: On-chain proposal creation and voting system
- **Dataset Registry**: Decentralized registry for AI datasets with external URL support
- **Training Job Registry**: Management system for AI training jobs
- **Treasury**: Fund management for the DAIVerse ecosystem
- **Parameters**: Configurable system parameters

### Frontend
- **Dashboard**: Overview of token balance, voting power, and recent activity
- **Token Management**: Transfer and approve DAIV tokens
- **Governance**: View and vote on governance proposals
- **Dataset Registry**: Register datasets via file upload or external URLs
- **Training Jobs**: Create and monitor AI training jobs
- **Treasury**: View treasury balance and transactions
- **Wallet Integration**: MetaMask wallet connection

## 📁 Project Structure

```
daiverse-governance/
├── contracts/                 # Solidity smart contracts
│   ├── DAIVToken.sol         # Governance token
│   ├── DatasetRegistry.sol   # Dataset management
│   ├── TrainingJobRegistry.sol # Training job management
│   ├── Treasury.sol          # Treasury management
│   └── Params.sol            # System parameters
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Contract ABIs and utilities
│   │   ├── pages/           # Page components
│   │   └── types/           # TypeScript definitions
│   └── package.json
├── scripts/                  # Deployment and utility scripts
├── test/                     # Smart contract tests
├── hardhat.config.ts         # Hardhat configuration
└── package.json
```

## 🛠️ Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MetaMask browser extension
- Git

## 📦 Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/daiverse-governance.git
cd daiverse-governance
```

### 2. Install dependencies
```bash
# Install root dependencies (Hardhat, etc.)
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
PRIVATE_KEY=your_private_key_here
INFURA_PROJECT_ID=your_infura_project_id
ETHERSCAN_API_KEY=your_etherscan_api_key
```

## 🚀 Development

### Smart Contracts

1. **Compile contracts**:
```bash
npx hardhat compile
```

2. **Run tests**:
```bash
npx hardhat test
```

3. **Deploy to local network**:
```bash
npx hardhat node
npx hardhat run scripts/01_deploy_all.ts --network localhost
```

4. **Deploy to testnet**:
```bash
npx hardhat run scripts/01_deploy_all.ts --network sepolia
```

### Frontend

1. **Start development server**:
```bash
cd frontend
npm run dev
```

2. **Build for production**:
```bash
npm run build
```

3. **Preview production build**:
```bash
npm run preview
```

## 🔧 Configuration

### Contract Addresses
After deployment, update the contract addresses in:
- `frontend/src/pages/Dashboard.tsx`
- `frontend/src/pages/TokenManagement.tsx`

### Network Configuration
Update `hardhat.config.ts` with your preferred networks and API keys.

## 📋 Usage

### For Users
1. Connect your MetaMask wallet
2. Navigate through the different sections using the navigation menu
3. Participate in governance, manage datasets, and monitor training jobs

### For Developers
1. Deploy contracts to your preferred network
2. Update frontend configuration with deployed addresses
3. Customize the governance parameters as needed

## 🧪 Testing

### Smart Contracts
```bash
# Run all tests
npx hardhat test

# Run specific test file
npx hardhat test test/DAIVToken.test.ts

# Run with gas reporting
REPORT_GAS=true npx hardhat test
```

### Frontend
```bash
cd frontend
npm run test
```

## 📚 Documentation

- [Smart Contract Architecture](./docs/contracts.md)
- [Frontend Development Guide](./docs/frontend.md)
- [Deployment Guide](./docs/deployment.md)
- [Governance Process](./docs/governance.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenZeppelin](https://openzeppelin.com/) for secure smart contract libraries
- [Hardhat](https://hardhat.org/) for Ethereum development environment
- [React](https://reactjs.org/) for the frontend framework
- [Ethers.js](https://docs.ethers.io/) for Ethereum interactions

## 📞 Support

- Create an issue for bug reports or feature requests
- Join our Discord for community discussions
- Email: support@daiverse.org

## 🔗 Links

- [Website](https://daiverse.org)
- [Documentation](https://docs.daiverse.org)
- [Discord](https://discord.gg/daiverse)
- [Twitter](https://twitter.com/daiverse)
