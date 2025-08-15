import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Testing with account:", deployer.address);

  // Deploy a simple token first
  console.log("\nDeploying DAIVToken...");
  const DAIVToken = await ethers.getContractFactory("DAIVToken");
  const token = await DAIVToken.deploy();
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log("DAIVToken deployed to:", tokenAddress);

  // Test basic functionality
  console.log("\nTesting basic functionality...");
  
  const balance = await token.balanceOf(deployer.address);
  console.log("Balance:", ethers.formatEther(balance), "DAIV");
  
  const name = await token.name();
  console.log("Token name:", name);
  
  const symbol = await token.symbol();
  console.log("Token symbol:", symbol);
  
  const decimals = await token.decimals();
  console.log("Token decimals:", decimals);

  console.log("\nBasic test completed successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
