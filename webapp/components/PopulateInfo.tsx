import MultiSig from "../../chain/artifacts/contracts/MultiSig.sol/MultiSig.json"
import {address} from "../__config.json";
import {ethers} from "ethers";

declare var window: any

export default async function populateInfo(){
    const provider = new ethers.BrowserProvider(window.ethereum);
    let owners = [];
    let balance: BigInt;
    let required = "";
    const code = await provider.getCode(address);
    if(code !== "0x"){
        const contract = new ethers.Contract(address, MultiSig.abi, provider);
        required = await contract.required();
        owners = await contract.getOwners();
        balance = await provider.getBalance(address);
        
        
    }
}