const ethers = require('ethers');
import {address} from '../__config.json';
import MultiSig from '../../chain/artifacts/contracts/MultiSig.sol/MultiSig.json';

export default function Connect(){
    async function newTransaction(){
        
        const provider = new ethers.BrowserProvider(ethereum);
        
        await ethereum.request({method: 'eth_requestAccounts'});
        const signer = provider.getSigner();
        const contract = new ethers.Contract(address, MultiSig.abi, signer);
        const destination = document.getElementById("destination").value;
        const wei = document.getElementById("wei").value;
        await contract.submitTransaction(destination, wei, "0x");
        
    }

    return (
        <button onClick={newTransaction}>Connect</button>
    )
}