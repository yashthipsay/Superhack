"use client"
import MultiSig from '../../chain/artifacts/contracts/MultiSig.sol/MultiSig.json'
import {address} from '../__config.json';
import {ethers} from 'ethers';
import buildTransaction from './Transactions';



export default async function PopulateTransactions(){
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(address, MultiSig.abi, provider);
    const code = await provider.getCode(address);
    const transactions = [];
    if(code !== "0x"){
        const transactionIds = await contract.getTrasactionIds(true, true);
        for(let i = 0;i<transactionIds.length; i++){
            const id = transactionIds[i];
            const attributes = await contract.transactions(id);
            const confirmations = await contract.getConfirmations(id);
            transactions.push({id, attributes, confirmations});
        }
    }
    renderTransactions(provider, contract, transactions);
}

async function renderTransactions(provider: any, contract:any, transactions:any){
    const container  =  transactions.map(buildTransaction).join("");
    container.forEach(async ({id}) => {
        
            await window.ethereum.request({method: 'eth_requestAccounts'});
            const signer = provider.getSigner();
            await contract.connect(signer).confirmTransaction(id);
        
    });
}