// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/governance/TimelockController.sol";

contract Timelock is TimelockController {
    // Min delay for timelock operations
    uint256 public constant MIN_DELAY = 3600; // 1 hour
    // List of proposers (addresses that can schedule operations)
    address[] public proposers;
    // List of executors (addresses that can execute operations)
    address[] public executors;

    constructor(
        address[] memory _proposers,
        address[] memory _executors,
        address _admin
    ) TimelockController(MIN_DELAY, _proposers, _executors, _admin) {}
}