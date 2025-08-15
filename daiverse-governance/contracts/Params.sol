// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Params is AccessControl {
    bytes32 public constant GOVERNOR_ROLE = keccak256("GOVERNOR_ROLE");

    uint256 public datasetReward;
    uint256 public trainingReward;

    event RewardsUpdated(uint256 datasetReward, uint256 trainingReward);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        datasetReward = 1000 * 10**18;
        trainingReward = 5000 * 10**18;
    }

    modifier onlyGov() {
        require(hasRole(GOVERNOR_ROLE, msg.sender), "Params: only governor");
        _;
    }

    function setRewards(uint256 _datasetReward, uint256 _trainingReward) external onlyGov {
        datasetReward = _datasetReward;
        trainingReward = _trainingReward;
        
        emit RewardsUpdated(_datasetReward, _trainingReward);
    }

    function getRewards() external view returns (uint256, uint256) {
        return (datasetReward, trainingReward);
    }
}
