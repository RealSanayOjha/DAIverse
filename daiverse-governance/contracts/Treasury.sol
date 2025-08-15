// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./DAIVToken.sol";

contract Treasury is AccessControl {
    bytes32 public constant TIMELOCK_ROLE = keccak256("TIMELOCK_ROLE");
    
    DAIVToken public immutable token;

    event PaymentSent(address indexed to, uint256 amount);

    constructor(address _token) {
        token = DAIVToken(_token);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    modifier onlyTimelock() {
        require(hasRole(TIMELOCK_ROLE, msg.sender), "Treasury: only timelock");
        _;
    }

    function pay(address to, uint256 amount) external onlyTimelock {
        require(to != address(0), "Treasury: invalid recipient");
        require(amount > 0, "Treasury: invalid amount");
        require(token.balanceOf(address(this)) >= amount, "Treasury: insufficient balance");
        
        token.transfer(to, amount);
        emit PaymentSent(to, amount);
    }

    function getBalance() external view returns (uint256) {
        return token.balanceOf(address(this));
    }
}
