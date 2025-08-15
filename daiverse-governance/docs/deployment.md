# Deployment Guide

## Prerequisites

Before deploying the DAIVerse Governance contracts, ensure you have:

- Node.js (v16 or higher)
- npm or yarn
- MetaMask or another wallet with testnet/mainnet ETH
- Environment variables configured

## Environment Setup

1. **Create `.env` file** in the root directory:
```env
PRIVATE_KEY=your_private_key_here
INFURA_PROJECT_ID=your_infura_project_id
ETHERSCAN_API_KEY=your_etherscan_api_key
ALCHEMY_API_KEY=your_alchemy_api_key
```

2. **Get API Keys**:
   - [Infura](https://infura.io/) for Ethereum node access
   - [Etherscan](https://etherscan.io/) for contract verification
   - [Alchemy](https://alchemy.com/) (alternative to Infura)

## Network Configuration

### Test Networks

#### Sepolia Testnet
```typescript
// hardhat.config.ts
sepolia: {
  url: `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
  accounts: [process.env.PRIVATE_KEY],
  chainId: 11155111,
}
```

#### Goerli Testnet
```typescript
goerli: {
  url: `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
  accounts: [process.env.PRIVATE_KEY],
  chainId: 5,
}
```

### Mainnet
```typescript
mainnet: {
  url: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
  accounts: [process.env.PRIVATE_KEY],
  chainId: 1,
}
```

## Deployment Steps

### 1. Compile Contracts
```bash
npx hardhat compile
```

### 2. Run Tests
```bash
npx hardhat test
```

### 3. Deploy to Local Network (Development)
```bash
# Start local node
npx hardhat node

# Deploy contracts
npx hardhat run scripts/01_deploy_all.ts --network localhost
```

### 4. Deploy to Testnet
```bash
# Deploy to Sepolia
npx hardhat run scripts/01_deploy_all.ts --network sepolia

# Deploy to Goerli
npx hardhat run scripts/01_deploy_all.ts --network goerli
```

### 5. Deploy to Mainnet
```bash
# Verify configuration first
npx hardhat run scripts/01_deploy_all.ts --network mainnet --dry-run

# Deploy (be careful!)
npx hardhat run scripts/01_deploy_all.ts --network mainnet
```

## Contract Verification

### Etherscan Verification
```bash
# Verify on Etherscan
npx hardhat verify --network sepolia CONTRACT_ADDRESS [constructor_args]
```

### Example Verification Commands
```bash
# Verify DAIVToken
npx hardhat verify --network sepolia 0x... "DAIV Token" "DAIV"

# Verify DatasetRegistry
npx hardhat verify --network sepolia 0x... 0x... # token address
```

## Post-Deployment Setup

### 1. Update Frontend Configuration
Update contract addresses in:
- `frontend/src/pages/Dashboard.tsx`
- `frontend/src/pages/TokenManagement.tsx`

### 2. Configure Governance Parameters
```bash
# Set voting delay
npx hardhat run scripts/02_configure_governance.ts --network sepolia

# Set treasury parameters
npx hardhat run scripts/03_configure_treasury.ts --network sepolia
```

### 3. Seed Initial Data
```bash
# Add initial datasets
npx hardhat run scripts/04_seed_data.ts --network sepolia
```

## Security Checklist

### Before Mainnet Deployment
- [ ] All tests passing
- [ ] Security audit completed
- [ ] Access controls verified
- [ ] Emergency pause functionality tested
- [ ] Multi-sig wallet configured
- [ ] Timelock contracts deployed
- [ ] Governance parameters set

### Post-Deployment
- [ ] Contract addresses verified
- [ ] Frontend updated with new addresses
- [ ] Governance proposals tested
- [ ] Treasury functions tested
- [ ] Monitoring setup configured

## Monitoring

### Contract Monitoring
- Set up alerts for critical functions
- Monitor gas usage
- Track transaction volume
- Monitor treasury balance

### Frontend Monitoring
- Error tracking (Sentry)
- Performance monitoring
- User analytics
- Wallet connection issues

## Troubleshooting

### Common Issues

#### Gas Estimation Failed
- Check network configuration
- Verify account has sufficient ETH
- Check contract constructor parameters

#### Verification Failed
- Ensure constructor arguments match
- Check network selection
- Verify contract bytecode

#### Frontend Connection Issues
- Verify contract addresses
- Check network configuration
- Ensure MetaMask is connected to correct network

## Rollback Plan

### Emergency Procedures
1. **Pause Contracts**: Use emergency pause if available
2. **Update Frontend**: Point to backup contracts
3. **Communicate**: Notify users of issues
4. **Investigate**: Identify root cause
5. **Deploy Fix**: Deploy corrected contracts

### Backup Strategy
- Maintain backup deployment scripts
- Keep previous contract versions
- Document rollback procedures
- Test rollback process regularly

## Cost Estimation

### Testnet Deployment
- Sepolia: ~0.1 ETH
- Goerli: ~0.1 ETH

### Mainnet Deployment
- Contract deployment: ~0.5-1 ETH
- Verification: ~0.1 ETH
- Initial setup: ~0.2 ETH
- **Total**: ~0.8-1.3 ETH

## Support

For deployment issues:
- Check [Hardhat documentation](https://hardhat.org/docs)
- Review [OpenZeppelin guides](https://docs.openzeppelin.com/)
- Create GitHub issue for project-specific problems
