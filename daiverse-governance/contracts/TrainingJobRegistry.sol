// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract TrainingJobRegistry is AccessControl {
    bytes32 public constant GOVERNOR_ROLE = keccak256("GOVERNOR_ROLE");

    enum JobStatus { Pending, Funded, InProgress, Completed, Failed }

    struct TrainingJob {
        address trainer;
        uint256[] datasetIds;
        string planURI;
        uint256 budget;
        JobStatus status;
        uint256 creationTime;
        uint256 fundingTime;
    }

    TrainingJob[] public jobs;
    mapping(uint256 => TrainingJob) public jobById;

    event JobCreated(uint256 indexed id, address indexed trainer, uint256[] datasetIds, string planURI);
    event JobFunded(uint256 indexed id, uint256 budget);
    event JobStatusChanged(uint256 indexed id, JobStatus status);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    modifier onlyGov() {
        require(hasRole(GOVERNOR_ROLE, msg.sender), "TrainingJobRegistry: only governor");
        _;
    }

    function createJob(address trainer, uint256[] memory datasetIds, string memory planURI) external onlyGov returns (uint256) {
        uint256 id = jobs.length;
        TrainingJob memory job = TrainingJob({
            trainer: trainer,
            datasetIds: datasetIds,
            planURI: planURI,
            budget: 0,
            status: JobStatus.Pending,
            creationTime: block.timestamp,
            fundingTime: 0
        });
        
        jobs.push(job);
        jobById[id] = job;
        
        emit JobCreated(id, trainer, datasetIds, planURI);
        return id;
    }

    function fundJob(uint256 id, uint256 budget) external onlyGov {
        require(id < jobs.length, "TrainingJobRegistry: invalid job id");
        require(jobs[id].status == JobStatus.Pending, "TrainingJobRegistry: job not pending");
        
        jobs[id].budget = budget;
        jobs[id].status = JobStatus.Funded;
        jobs[id].fundingTime = block.timestamp;
        
        jobById[id] = jobs[id];
        
        emit JobFunded(id, budget);
    }

    function setStatus(uint256 id, JobStatus status) external onlyGov {
        require(id < jobs.length, "TrainingJobRegistry: invalid job id");
        jobs[id].status = status;
        jobById[id].status = status;
        
        emit JobStatusChanged(id, status);
    }

    function getJob(uint256 id) external view returns (TrainingJob memory) {
        require(id < jobs.length, "TrainingJobRegistry: invalid job id");
        return jobs[id];
    }

    function getJobCount() external view returns (uint256) {
        return jobs.length;
    }

    function getAllJobs() external view returns (TrainingJob[] memory) {
        return jobs;
    }
}
