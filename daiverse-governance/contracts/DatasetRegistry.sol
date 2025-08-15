// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract DatasetRegistry is AccessControl {
    bytes32 public constant GOVERNOR_ROLE = keccak256("GOVERNOR_ROLE");

    struct Dataset {
        string cid;
        string licenseURI;
        address submitter;
        bool approved;
        uint256 submissionTime;
    }

    Dataset[] public datasets;
    mapping(uint256 => Dataset) public datasetById;

    event DatasetSubmitted(uint256 indexed id, address indexed submitter, string cid, string licenseURI);
    event DatasetApprovalChanged(uint256 indexed id, bool approved);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    modifier onlyGov() {
        require(hasRole(GOVERNOR_ROLE, msg.sender), "DatasetRegistry: only governor");
        _;
    }

    function submitDataset(string memory cid, string memory licenseURI) external returns (uint256) {
        uint256 id = datasets.length;
        Dataset memory dataset = Dataset({
            cid: cid,
            licenseURI: licenseURI,
            submitter: msg.sender,
            approved: false,
            submissionTime: block.timestamp
        });
        
        datasets.push(dataset);
        datasetById[id] = dataset;
        
        emit DatasetSubmitted(id, msg.sender, cid, licenseURI);
        return id;
    }

    function setApproved(uint256 id, bool approved) external onlyGov {
        require(id < datasets.length, "DatasetRegistry: invalid dataset id");
        datasets[id].approved = approved;
        datasetById[id].approved = approved;
        
        emit DatasetApprovalChanged(id, approved);
    }

    function getDataset(uint256 id) external view returns (Dataset memory) {
        require(id < datasets.length, "DatasetRegistry: invalid dataset id");
        return datasets[id];
    }

    function getDatasetCount() external view returns (uint256) {
        return datasets.length;
    }

    function getAllDatasets() external view returns (Dataset[] memory) {
        return datasets;
    }
}
