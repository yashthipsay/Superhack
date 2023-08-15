import CreateTransaction from "./components/CreateTransaction";

import Image from 'next/image'
import MultiSig from '../../../chain/artifacts/contracts/MultiSigTwo.sol/MultiSigTwo.json';
import Sender from '../../../chain/artifacts/contracts/Sender.sol/Sender.json';
import {ethers} from 'ethers';
import {address} from '../../__config.json';
import setupEvents from './components/SetupEvents';

export default function Page() {
  return (
    <div>
      <CreateTransaction />
    </div>
  );
}