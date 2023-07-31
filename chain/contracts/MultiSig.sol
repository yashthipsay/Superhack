// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;



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
    uint transactionCount;

    Transaction[] public transactions;
    mapping(uint => mapping(address=>bool)) public approved;

    modifier onlyOwner(){
        require(isOwner[msg.sender], "not owner");
        _;
    }

    modifier txExists(uint _txId){
        require(_txId < transactions.length, "tx does not exist");
        _;
    }

    modifier notApproved(uint _txId){
        require(!approved[_txId][msg.sender], "tx already approved");
        _;
    }

    modifier notExecuted(uint _txId){
        require(!transactions[_txId].executed, "tx already executed");
        _;
    }

    constructor(address[] memory _owners, uint _required){
        require(_owners.length > 0, "owners required");
        require(_required >0 && required <= owners.length, "invalid required number of owners");

        for(uint i = 0; i<_owners.length; i++){
            address owner = _owners[i];

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

    function submit(address _to, uint _value, bytes memory _data) external onlyOwner{
        transactions.push(Transaction({
            to: _to, 
            value: _value,
            data: _data,
            executed: false
        }));
        emit Submit(transactions.length - 1);
    }

    function approve(uint _txId) external onlyOwner txExists(_txId) notApproved(_txId) notExecuted(_txId){
        approved[_txId][msg.sender] = true;
        emit Approve(msg.sender, _txId);
    }

    function _getApprovalCount(uint _txId) private view returns(uint count){
        for(uint i; i<owners.length; i++){
            if(approved[_txId][owners[i]]){
                count += 1;
            }
        }
        
    }

    function execute(uint _txId) external txExists(_txId) notExecuted(_txId){
        require(_getApprovalCount(_txId) >= required, "approvals < required");
        Transaction storage transaction = transactions[_txId];
        transaction.executed = true;
        (bool success, ) = transaction.to.call{value: transaction.value}(
            transaction.data
        );
        require(success, "tx failed");

        emit Execute(_txId);

    }

    function getTransactionIds(bool pending, bool executed) public view returns(uint[] memory){
        uint count = getTransactionCount(pending, executed);
        uint[] memory txIds = new uint[](count);
        uint runningCount = 0;
        for(uint i=0; i<transactionCount; i++){
            if(
                (pending && !transactions[i].executed) || (executed && transactions[i].executed)
            ) {
                txIds[runningCount] = i;
                runningCount++;
            }
        }
        return txIds;
    }

    function getTransactionCount(
        bool pending,
        bool executed
    ) public view returns (uint){
        uint count=0;
        for(uint i=0;i<transactionCount;i++){
            if(
                (pending && !transactions[i].executed) || (executed && transactions[i].executed)
            ) {
                count++;
            }
        }
        return count;
    }
}