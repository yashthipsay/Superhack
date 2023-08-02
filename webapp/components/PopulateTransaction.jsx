import MultiSig from "../../chain/artifacts/contracts/MultiSigTwo.sol/MultiSigTwo.json";
import { address } from "../__config.json";
import { ethers } from "ethers";
import buildTransaction from "./Transaction";

export default async function populateTransactions() {
  const provider = new ethers.BrowserProvider(ethereum);
  const contract = new ethers.Contract(address, MultiSig.abi, provider);
  const code = await provider.getCode(address);
  const transactions = [];
  if (code !== "0x") {
    const transactionIds = await contract.getTransactionIds(true, true);
    for (let i = 0; i < transactionIds.length; i++) {
      const id = transactionIds[i];
      const attributes = await contract.transactions(id);
      const confirmations = await contract.getConfirmations(id);
      transactions.push({ id, attributes, confirmations });
    }
  }
  renderTransactions(provider, contract, transactions);
}

function renderTransactions(provider, contract, transactions) {
  const container = document.getElementById("container");
  container.innerHTML = transactions.map(buildTransaction).join("");
  transactions.forEach(({ id }) => {
    document
      .getElementById(`confirm-${id}`)
      .addEventListener("click", async () => {
        await ethereum.request({ method: "eth_requestAccounts" });
        const signer = provider.getSigner();
        await contract.connect(signer).confirmTransaction(id);
      });
  });
}