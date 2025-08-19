import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const balance = await deployer.provider?.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance || 0), "BNB");

  // Deploy DAIVToken
  console.log("\nDeploying DAIVToken...");
  const DAIVToken = await ethers.getContractFactory("DAIVToken");
  const token = await DAIVToken.deploy();
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log("DAIVToken deployed to:", tokenAddress);

  // Deploy DatasetRegistry
  console.log("\nDeploying DatasetRegistry...");
  const DatasetRegistry = await ethers.getContractFactory("DatasetRegistry");
  const datasetRegistry = await DatasetRegistry.deploy();
  await datasetRegistry.waitForDeployment();
  const datasetRegistryAddress = await datasetRegistry.getAddress();
  console.log("DatasetRegistry deployed to:", datasetRegistryAddress);

  // Deploy TrainingJobRegistry
  console.log("\nDeploying TrainingJobRegistry...");
  const TrainingJobRegistry = await ethers.getContractFactory("TrainingJobRegistry");
  const trainingJobRegistry = await TrainingJobRegistry.deploy();
  await trainingJobRegistry.waitForDeployment();
  const trainingJobRegistryAddress = await trainingJobRegistry.getAddress();
  console.log("TrainingJobRegistry deployed to:", trainingJobRegistryAddress);

  // Deploy Treasury
  console.log("\nDeploying Treasury...");
  const Treasury = await ethers.getContractFactory("Treasury");
  const treasury = await Treasury.deploy(tokenAddress);
  await treasury.waitForDeployment();
  const treasuryAddress = await treasury.getAddress();
  console.log("Treasury deployed to:", treasuryAddress);

  // Deploy Params
  console.log("\nDeploying Params...");
  const Params = await ethers.getContractFactory("Params");
  const params = await Params.deploy();
  await params.waitForDeployment();
  const paramsAddress = await params.getAddress();
  console.log("Params deployed to:", paramsAddress);

  // Deploy Timelock
  console.log("\nDeploying Timelock...");
  const proposers = [deployer.address];
  const executors = [deployer.address];
  const Timelock = await ethers.getContractFactory("Timelock");
  const timelock = await Timelock.deploy(proposers, executors, deployer.address);
  await timelock.waitForDeployment();
  const timelockAddress = await timelock.getAddress();
  console.log("Timelock deployed to:", timelockAddress);

  // Deploy Governor
  console.log("\nDeploying Governor...");
  const votingDelay = 1; // 1 block
  const votingPeriod = 45818; // 1 week on BSC (assuming 17s block time)
  const quorumPercentage = 4; // 4%
  const Governor = await ethers.getContractFactory("DAIverseGovernor");
  const governor = await Governor.deploy(tokenAddress, timelockAddress, votingDelay, votingPeriod, quorumPercentage);
  await governor.waitForDeployment();
  const governorAddress = await governor.getAddress();
  console.log("Governor deployed to:", governorAddress);

  // Transfer some tokens to Treasury
  const treasuryAmount = ethers.parseEther("10000000"); // 10M tokens
  await token.transfer(treasuryAddress, treasuryAmount);
  console.log("Transferred", ethers.formatEther(treasuryAmount), "tokens to Treasury");

  // Print deployment summary
  console.log("\n=== DEPLOYMENT SUMMARY ===");
  console.log("DAIVToken:", tokenAddress);
  console.log("DatasetRegistry:", datasetRegistryAddress);
  console.log("TrainingJobRegistry:", trainingJobRegistryAddress);
  console.log("Treasury:", treasuryAddress);
  console.log("Params:", paramsAddress);
  console.log("Timelock:", timelockAddress);
  console.log("Governor:", governorAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
