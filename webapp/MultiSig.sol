// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract MultiSig{
    event Deposit(address indexed sender, uint amount);
    event Submit(uint indexed txId);
    event Approve(address indexed owner, uint indexed txId);
    event Revoke(address indexed owner, uint indexed txId);
    event Execute(uint indexed txId);

    struct Transaction {
        address to;
        uint value;
        bytes data;
        bool executed;
    }

    address[] public owners;
    mapping(address => bool) public isOwner;
    uint public required;

    Transaction[] public transactions;
    mapping(uint => mapping(address=>bool)) public approved;

    constructor(address[] memory _owners, uint _required){
        require(_owners.length > 0, "owners required");
        require(_required >0 && required <= owners.length, "invalid required number of owners");

        for(uint i; i<_owners.length; i++){
            address owner = owners[i];

            require(owner != address(0), "invalid owner");
            require(!isOwner[owner], "owner is not unique");

            isOwner[owner] = true;
            owners.push(owner);
      }

      required = required;
    }

    receive() external payable{
        emit Deposit(msg.sender, msg.value);
    }

    function submit(address _to, uint _value, bytes calldata _data) external onlyOwner
}