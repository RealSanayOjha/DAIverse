import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Running seed and demo with account:", deployer.address);

  console.log("\n=== DEPLOYING CONTRACTS ===");

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

  // Transfer some tokens to Treasury
  const treasuryAmount = ethers.parseEther("10000000"); // 10M tokens
  await token.transfer(treasuryAddress, treasuryAmount);
  console.log("Transferred", ethers.formatEther(treasuryAmount), "tokens to Treasury");

  console.log("\n=== SEEDING AND DEMO ===");

  // 1. Check token balance
  console.log("\n1. Checking token balance...");
  const balance = await token.balanceOf(deployer.address);
  console.log("Token balance:", ethers.formatEther(balance), "DAIV");

  // 2. Submit a dataset
  console.log("\n2. Submitting a dataset...");
  const cid = "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG";
  const licenseURI = "https://example.com/license";
  const submitDatasetTx = await datasetRegistry.submitDataset(cid, licenseURI);
  const submitDatasetReceipt = await submitDatasetTx.wait();
  console.log("Dataset submitted with CID:", cid);

  // Get dataset ID from event
  const datasetSubmittedEvent = submitDatasetReceipt?.logs.find(
    (log: any) => log.fragment?.name === "DatasetSubmitted"
  );
  const datasetId = datasetSubmittedEvent?.args?.[0] || 0;
  console.log("Dataset ID:", datasetId);

  // 3. Check dataset details
  console.log("\n3. Checking dataset details...");
  const dataset = await datasetRegistry.getDataset(datasetId);
  console.log("Dataset approved:", dataset.approved);
  console.log("Dataset submitter:", dataset.submitter);

  // 4. Create a training job
  console.log("\n4. Creating a training job...");
  const trainer = deployer.address;
  const datasetIds = [datasetId];
  const planURI = "https://example.com/training-plan";
  
  // Grant governor role to deployer for demo purposes
  const governorRole = ethers.keccak256(ethers.toUtf8Bytes("GOVERNOR_ROLE"));
  await trainingJobRegistry.grantRole(governorRole, deployer.address);
  
  const createJobTx = await trainingJobRegistry.createJob(trainer, datasetIds, planURI);
  const createJobReceipt = await createJobTx.wait();
  console.log("Training job created");

  // Get job ID from event
  const jobCreatedEvent = createJobReceipt?.logs.find(
    (log: any) => log.fragment?.name === "JobCreated"
  );
  const jobId = jobCreatedEvent?.args?.[0] || 0;
  console.log("Job ID:", jobId);

  // 5. Fund the training job
  console.log("\n5. Funding the training job...");
  const budget = ethers.parseEther("1000"); // 1000 DAIV
  const fundJobTx = await trainingJobRegistry.fundJob(jobId, budget);
  await fundJobTx.wait();
  console.log("Job funded with", ethers.formatEther(budget), "DAIV");

  // 6. Check job details
  console.log("\n6. Checking job details...");
  const job = await trainingJobRegistry.getJob(jobId);
  console.log("Job status:", job.status);
  console.log("Job budget:", ethers.formatEther(job.budget), "DAIV");

  // 7. Check treasury balance
  console.log("\n7. Checking treasury balance...");
  const treasuryBalance = await treasury.getBalance();
  console.log("Treasury balance:", ethers.formatEther(treasuryBalance), "DAIV");

  // 8. Check params
  console.log("\n8. Checking governance parameters...");
  const [datasetReward, trainingReward] = await params.getRewards();
  console.log("Dataset reward:", ethers.formatEther(datasetReward), "DAIV");
  console.log("Training reward:", ethers.formatEther(trainingReward), "DAIV");

  // 9. Update params (demo of governance function)
  console.log("\n9. Updating governance parameters...");
  const newDatasetReward = ethers.parseEther("1500");
  const newTrainingReward = ethers.parseEther("6000");
  
  // Grant governor role to deployer for params
  await params.grantRole(governorRole, deployer.address);
  
  const updateParamsTx = await params.setRewards(newDatasetReward, newTrainingReward);
  await updateParamsTx.wait();
  console.log("Parameters updated");

  // 10. Verify updated params
  console.log("\n10. Verifying updated parameters...");
  const [updatedDatasetReward, updatedTrainingReward] = await params.getRewards();
  console.log("Updated dataset reward:", ethers.formatEther(updatedDatasetReward), "DAIV");
  console.log("Updated training reward:", ethers.formatEther(updatedTrainingReward), "DAIV");

  console.log("\n=== DEMO COMPLETED SUCCESSFULLY ===");
  console.log("The basic contract functionality has been demonstrated:");
  console.log("1. Token balance check ✓");
  console.log("2. Dataset submission ✓");
  console.log("3. Training job creation ✓");
  console.log("4. Job funding ✓");
  console.log("5. Parameter management ✓");
  console.log("\nNote: Full governance workflow requires Governor and Timelock contracts");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
