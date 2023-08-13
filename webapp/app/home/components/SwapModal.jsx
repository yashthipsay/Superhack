"use client";

import React from "react";
import "./swapmodal.css";

import SwapSVG from "../../svgs/SwapSVG";
import EtherSVG from "../../svgs/EtherSVG";

import { Input } from "@nextui-org/react";
import {
  Card,
  Col,
  Row,
  Button,
  Text,
  Modal,
  useModal,
  Avatar,
  Grid,
  Spacer,
} from "@nextui-org/react";

import Web3 from "web3";
import qs from "qs";
import Erc20 from "../../../engine/erc20.json";
import Web3Modal from "web3modal";
import { useState, useEffect } from "react";
import { Alchemy, Network } from "alchemy-sdk";
import { ethers } from "ethers";

const SwapModal = ({showModal, setShowModal}) => {
  const { visible, setVisible } = useModal();
  const [flogo, getFromLogo] = useState([]);
  const [fname, getFromName] = useState(["Swap From"]);
  const [faddr, getFromAddr] = useState([]);
  const [fdec, getFromDec] = useState([]);
  const [tlogo, getToLogo] = useState([]);
  const [tname, getToName] = useState(["Swap To"]);
  const [taddr, getToAddr] = useState([]);
  const [tdec, getToDec] = useState([]);
  const [holdup, setHold] = useState("");
  const [wallet, getWallet] = useState([]);
  const [alert, setAlert] = useState(false);

  const config = {
    apiKey: "-Dl1Og8pv6576fBzr0ZEF54MEfiVeIHH",
    network: Network.OPT_MAINNET,
  };

  const alchemy = new Alchemy(config);

  var zeroxapi = "https://api.0x.org/";

  useEffect(() => {}, [getFromLogo, getFromName, getFromAddr, getFromDec]);

  useEffect(() => {}, [getToLogo, getToName, getToAddr]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      getPrice();
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [holdup]);

  let currentTrade = {};
  let currentSelectSide = null;
  let toTrade = {};
  let toSelectSide = null;

  const sendAlert = () => setAlert(true);

  const fromHandler = (side) => {
    if (wallet.includes("0x")) {
      setVisible(true);
      currentSelectSide = side;
      listFromTokens();
    } else {
      sendAlert();
    }
  };

  const toHandler = (side) => {
    setVisible(true);
    toSelectSide = side;
    listToTokens();
    getPrice();
  };

  var account = null;
  var web3 = null;

  const closeHandler = () => {
    setVisible(false);
    setAlert(false);
    console.log("closed");
  };

  async function connect() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    web3 = new Web3(connection);
    await connection.send("eth_requestAccounts");
    var accounts = await web3.eth.getAccounts();
    account = accounts[0];
    document.getElementById("wallet-address").textContent = account;
    if (account !== null) {
      document.getElementById("status").textContent = "CONNECTED!";
    } else {
      document.getElementById("status").textContent = "CONNECT";
    }
    getWallet(account);
  }

  async function listFromTokens() {
    let response = await fetch("https://tokens.coingecko.com/uniswap/all.json");
    let tokenListJSON = await response.json();
    var tokens = tokenListJSON.tokens;
    let parent = document.getElementById("token_list");
    for (const i in tokens) {
      let div = document.createElement("div");
      div.className = "token_row";
      let html = `
      <img className="token_list_img" width="12%" src="${tokens[i].logoURI}">
        <span className="token_list_text">${tokens[i].symbol}</span>
        `;
      div.innerHTML = html;
      div.onclick = () => {
        selectFrom(tokens[i]);
      };
      parent.appendChild(div);
    }
  }

  function selectFrom(token) {
    currentTrade[currentSelectSide] = token;
    closeHandler();
    var fromName = token.name;
    var fromLogo = token.logoURI;
    var fromAddr = token.address;
    var fromDec = token.decimals;
    getFromName(fromName);
    getFromLogo(fromLogo);
    getFromAddr(fromAddr);
    getFromDec(fromDec);
  }

  async function displayBalance() {
    const tokenContractAddresses = [faddr];
    const data = await alchemy.core.getTokenBalances(
      wallet,
      tokenContractAddresses
    );
    data.tokenBalances.find((item) => {
      let rawbalance = parseInt(item.tokenBalance, 16).toString();
      let formatbalance = Number(ethers.formatEther(rawbalance));
      let balance = formatbalance.toFixed(2);
      if (
        item.tokenBalance ===
        "0x0000000000000000000000000000000000000000000000000000000000000000"
      ) {
        document.getElementById("get_balance").innerHTML = "0.00";
      } else {
        document.getElementById("get_balance").innerHTML = balance;
      }
    });
  }

  async function listToTokens() {
    let response = await fetch("https://tokens.coingecko.com/uniswap/all.json");
    let tokenListJSON = await response.json();
    var tokens = tokenListJSON.tokens;
    let parent = document.getElementById("token_list");
    for (const i in tokens) {
      let div = document.createElement("div");
      div.className = "token_row";
      let html = `
      <img className="token_list_img" width="12%" src="${tokens[i].logoURI}">
      <span className="token_list_text">${tokens[i].symbol}</span>
        `;
      div.innerHTML = html;
      div.onclick = () => {
        selectTo(tokens[i]);
      };
      parent.appendChild(div);
    }
  }

  function selectTo(token) {
    toTrade[toSelectSide] = token;
    closeHandler();
    var toName = token.name;
    var toLogo = token.logoURI;
    var toAddr = token.address;
    var toDec = token.decimals;
    getToName(toName);
    getToLogo(toLogo);
    getToAddr(toAddr);
    getToDec(toDec);
    displayBalance();
  }

  async function getPrice() {
    console.log("Getting Price");
    if (!faddr || !taddr || !document.getElementById("from_amount").value)
      return;
    let amount = Number(
      document.getElementById("from_amount").value * 10 ** fdec
    );
    const params = {
      sellToken: faddr,
      buyToken: taddr,
      sellAmount: amount,
    };
    const response = await fetch(
      zeroxapi + `swap/v1/price?${qs.stringify(params)}`,
      {
        headers: {
          "0x-api-key": "b3443163-d097-496a-a8d9-5cb11980666b",
        },
      }
    );
    const sources = await fetch(
      zeroxapi + `swap/v1/quote?${qs.stringify(params)}`,
      {
        headers: {
          "0x-api-key": "b3443163-d097-496a-a8d9-5cb11980666b",
        },
      }
    );
    var swapPriceJSON = await response.json();
    console.log(swapPriceJSON);
    var swapOrders = await sources.json();
    try {
      await swapOrders.orders.find((item) => {
        document.getElementById("defisource").innerHTML = item.source;
      });
    } catch (error) {
      document.getElementById("defisource").innerHTML = "Pool Not Available";
    }
    var rawvalue = swapOrders.buyAmount / 10 ** tdec;
    var value = rawvalue.toFixed(2);
    document.getElementById("to_amount").innerHTML = value;
    document.getElementById("gas_estimate").innerHTML = swapPriceJSON.estimatedGas;
  }

  async function swapit() {
    if (!faddr || !taddr || !document.getElementById("from_amount").value)
      return;
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    web3 = new Web3(connection);
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const userWallet = wallet;
    let amount = Number(
      document.getElementById("from_amount").value * 10 ** fdec
    );
    const params = {
      sellToken: faddr,
      buyToken: taddr,
      sellAmount: amount,
    };
    const fromTokenAddress = faddr;
    const getquote = await fetch(
      zeroxapi + `swap/v1/quote?${qs.stringify(params)}`
    );
    var quote = await getquote.json();
    var proxy = quote.allowanceTarget;
    var amountstr = amount.toString();
    const ERC20Contract = new ethers.Contract(fromTokenAddress, Erc20, signer);
    const approval = await ERC20Contract.approve(proxy, amountstr);
    await approval.wait();
    const txParams = {
      ...quote,
      from: userWallet,
      to: quote.to,
      value: quote.value.toString(16),
      gasPrice: null,
      gas: quote.gas,
    };
    await ethereum.request({
      method: "eth_sendTransaction",
      params: [txParams],
    });
  }

  return (
    <div className="swap-body">

      <Modal
        scroll
        closeButton
        blur
        aria-labelledby="connect_modal"
        onClose={closeHandler}
        open={alert}
      > Please Connect Wallet
        <Modal.Footer>
        <Button auto flat color="primary" onClick={connect}>
            Connect Wallet
          </Button>
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        scroll
        closeButton
        blur
        aria-labelledby="token_modal"
        onClose={closeHandler}
        open={visible}
      >
      <Modal.Body>
        <Input type='text'
            size="$3xl"
            css={{fontFamily:'SF Pro Display',color:'white'}} 
            className="number"
            color="default"
            placeholder="Paste Token Address"
            />
            <Text size={16}>Or Choose Below:</Text>
          <div id="token_list"></div>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="top-bar">
        <button onClick={()=>{setShowModal(!showModal)}} >X</button>
        <div className="connection-status" id="status" style={{'paddingRight':'2rem', 'color':'white'}}>Connect</div>
      </div>

      <div className="swap-from-to">
        <div className="swap">
          <div className="swap-bar">
            <div className="from">From</div>
            <div className="available">
              <div className="available-label">Available</div>
              <div id="get_balance" className="available-amount">0 OSMO</div>
              <div className="max">Max</div>
              <div className="max">Half</div>
            </div>
          </div>

          <div className="chain">
            <div className="chain-options">
              <div className="chain-icon" ><img src={flogo} style={{width:'50px'}}/></div>
              <div
                // id="from_amount"
                className="chain-name"
                onClick={fromHandler}
              >
                {fname}
              </div>
            </div>
            <div className="amount">
              <input id="from_amount"  className="number" onChange={(e) => setHold(e.target.value)} ></input>
              <div className="dollar-conversion">{fname}</div>
            </div>
          </div>
        </div>

        <SwapSVG />

        <div className="swap">
          <div className="swap-bar">
            <div className="from">To</div>
          </div>

          <div className="chain">
            <div className="chain-options">
              <div className="chain-icon"><img src={tlogo} style={{width:'30px'}}/></div>
              <div className="chain-name"  onClick={toHandler}>
                {tname}
              </div>
            </div>

            <div className="to-amount">
              <div id="to_amount" className="weth"></div>
              {/* <div className="dollar-conversion">= WETH</div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="swap-details">
        <div className="grid">
          <div className="grid-text">Rate</div>
          <div className="grid-text" id="wallet-address">
            1 OSMO = 0.002 WETH <br />{" "}
            <div className="grid-text sub"> 1 OSMO = 494.409 WETH </div>
          </div>
        </div>

        <div className="grid">
          <div className="grid-text">Swap fee</div>
          <div id="gas_estimate" className="grid-text">NaN</div>
        </div>

        <div className="grid">
          <div className="bold">Liquidity pool</div>
          <div className="bold" id="defisource">
            NaN
          </div>
        </div>

      </div>

      <div className="swap-btn" onClick={swapit} >
        SWAP
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 20"
          fill="none"
        >
          <path
            d="M3 1L3 12H1C0.595664 12 0.231016 12.2437 0.0760156 12.6174C0.025 12.741 0 12.871 0 12.9997C0 13.26 0.10168 13.5157 0.293008 13.707L6.29301 19.707C6.57903 19.9931 7.00903 20.0787 7.38266 19.9237C7.75633 19.769 8 19.4043 8 19L8 1C8 0.447657 7.55235 0 7 0H4C3.44766 0 3 0.447657 3 1ZM7 1L7 19L1 13H4L4 1H7Z"
            fill="white"
          />
          <path
            d="M10.6173 0.0763149C10.2437 0.230965 10 0.595652 10 0.999987L10 19C10 19.5523 10.4477 20 11 20H14C14.5523 20 15 19.5523 15 19V7.99999H17C17.4043 7.99999 17.769 7.75632 17.924 7.38265C17.975 7.25898 18 7.12898 18 7.0003C18 6.73999 17.8983 6.48429 17.707 6.29296L11.707 0.292955C11.421 0.00697899 10.991 -0.0786858 10.6173 0.0763149ZM17 6.99999H14V19H11L11 0.999987L17 6.99999Z"
            fill="white"
          />
        </svg>
      </div>

      <div className="real-time-stats">
        <div className="stats-top">
          <div className="stats-top-section">
            <div className="curr-name">ETHER PRICE</div>

            <div className="curr-price">
              <div className="curr-logo">
                <EtherSVG />
              </div>
              <div className="curr-amount-dollar">$1,846.00</div>
              <div className="curr-amount-btc">@0.06283 BTC</div>
              <div className="curr-status">(-0.11%)</div>
            </div>
          </div>

          <div className="vertical-divider" />

          <div className="stats-top-section">
            <div className="market-cap-title">MARKET CAP</div>
            <div className="market-cap-amnt">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 25 25"
                fill="none"
              >
                <g clip-path="url(#clip0_142_83)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.5208 0C19.4104 0.0114583 25 5.60729 25 12.5C25 19.399 19.4 25 12.5 25C5.60104 25 0 19.399 0 12.5C0 5.60729 5.59062 0.0114583 12.4802 0H12.5208ZM16.3687 16.6667H8.63229C9.29792 21.1104 10.9677 23.9583 12.5 23.9583C14.0333 23.9583 15.7031 21.1104 16.3687 16.6667ZM23.176 16.6667H17.4229C16.9792 19.776 16.0469 22.2937 14.8344 23.7198C18.6562 22.9281 21.7833 20.2302 23.176 16.6667ZM7.57812 16.6667H1.82396C3.21771 20.2302 6.34479 22.9281 10.1667 23.7198C8.95417 22.2937 8.02187 19.776 7.57812 16.6667ZM7.45 9.375H1.475C1.13021 10.5896 0.703125 12.9052 1.475 15.625H7.45C7.25417 13.7354 7.22604 11.5365 7.45 9.375ZM16.5031 9.375H8.49792C8.29479 11.25 8.26354 13.4656 8.49792 15.625H16.5031C16.7073 13.7385 16.7365 11.5312 16.5031 9.375ZM23.526 9.375H17.551C17.6156 9.99167 17.8719 12.5198 17.551 15.625H23.526C24.2979 12.9042 23.8708 10.5885 23.526 9.375ZM10.1667 1.28021C6.34479 2.07187 3.21771 4.76979 1.82396 8.33333H7.57812C8.02187 5.22396 8.95417 2.70521 10.1667 1.28021ZM16.3687 8.33333C15.7031 3.88958 14.0333 1.04167 12.5 1.04167C10.9677 1.04167 9.29792 3.88958 8.63229 8.33333H16.3687ZM14.8344 1.28021C16.0469 2.70521 16.9792 5.22396 17.4229 8.33333H23.176C21.7833 4.76979 18.6562 2.07187 14.8344 1.28021Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_142_83">
                    <rect width="25" height="25" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              $221,801,462,057.00
            </div>
          </div>
        </div>

        <div className="horizontal-divider" />

        <div className="stats-body">
          <div className="stats-body-section">
            <div className="sbl-title">Latest Block</div>

            <div className="blocks-table">
              <div className="blocks-table-row">
                <div className="row-left">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                    fill="none"
                  >
                    <path
                      d="M4.24608 7.98709C3.86304 8.20338 3.625 8.61421 3.625 9.05888V19.8735C3.625 20.3205 3.86304 20.729 4.24608 20.9453C6.17579 22.034 12.0471 25.3424 13.9188 26.3973C14.1025 26.5 14.3042 26.5519 14.5072 26.5519C14.7054 26.5519 14.9036 26.5024 15.0836 26.4033C16.9553 25.3702 22.8049 22.1463 24.743 21.077C25.1333 20.8631 25.375 20.4498 25.375 20.0003V9.05888C25.375 8.61421 25.137 8.20338 24.7527 7.98709C22.8254 6.9008 16.9662 3.59842 15.0873 2.53992C14.9048 2.43721 14.7018 2.38525 14.5 2.38525C14.297 2.38525 14.0952 2.43721 13.9128 2.53992C12.0338 3.59842 6.17338 6.9008 4.24608 7.98709ZM23.5625 10.5427V19.6354L15.4062 24.1328V14.9761L23.5625 10.5427ZM5.4375 19.5146V10.5028L13.5938 15.0341V24.1099L5.4375 19.5146ZM6.32683 8.91871L14.5 4.31134L22.7179 8.94409L14.5 13.4343L6.32683 8.91871Z"
                      fill="#838282"
                    />
                  </svg>

                  <div className="rl-info">
                    <div className="rl-info-amnt">17886071</div>
                    <div className="rl-info-duration">7 sec ago</div>
                  </div>
                </div>

                <div className="row-right">
                  <div className="upper-part">
                    <div className="fee-receipt">Fee Receipt</div>
                    <div className="bever-build">beaverbuild</div>
                  </div>
                </div>
              </div>

              <div className="horizontal-divider" />

              <div className="blocks-table-row">
                <div className="row-left">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                    fill="none"
                  >
                    <path
                      d="M4.24608 7.98709C3.86304 8.20338 3.625 8.61421 3.625 9.05888V19.8735C3.625 20.3205 3.86304 20.729 4.24608 20.9453C6.17579 22.034 12.0471 25.3424 13.9188 26.3973C14.1025 26.5 14.3042 26.5519 14.5072 26.5519C14.7054 26.5519 14.9036 26.5024 15.0836 26.4033C16.9553 25.3702 22.8049 22.1463 24.743 21.077C25.1333 20.8631 25.375 20.4498 25.375 20.0003V9.05888C25.375 8.61421 25.137 8.20338 24.7527 7.98709C22.8254 6.9008 16.9662 3.59842 15.0873 2.53992C14.9048 2.43721 14.7018 2.38525 14.5 2.38525C14.297 2.38525 14.0952 2.43721 13.9128 2.53992C12.0338 3.59842 6.17338 6.9008 4.24608 7.98709ZM23.5625 10.5427V19.6354L15.4062 24.1328V14.9761L23.5625 10.5427ZM5.4375 19.5146V10.5028L13.5938 15.0341V24.1099L5.4375 19.5146ZM6.32683 8.91871L14.5 4.31134L22.7179 8.94409L14.5 13.4343L6.32683 8.91871Z"
                      fill="#838282"
                    />
                  </svg>

                  <div className="rl-info">
                    <div className="rl-info-amnt">17886071</div>
                    <div className="rl-info-duration">7 sec ago</div>
                  </div>
                </div>

                <div className="row-right">
                  <div className="upper-part">
                    <div className="fee-receipt">Fee Receipt</div>
                    <div className="bever-build">beaverbuild</div>
                  </div>
                </div>
              </div>

              <div className="horizontal-divider" />

              <div className="blocks-table-row">
                <div className="row-left">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                    fill="none"
                  >
                    <path
                      d="M4.24608 7.98709C3.86304 8.20338 3.625 8.61421 3.625 9.05888V19.8735C3.625 20.3205 3.86304 20.729 4.24608 20.9453C6.17579 22.034 12.0471 25.3424 13.9188 26.3973C14.1025 26.5 14.3042 26.5519 14.5072 26.5519C14.7054 26.5519 14.9036 26.5024 15.0836 26.4033C16.9553 25.3702 22.8049 22.1463 24.743 21.077C25.1333 20.8631 25.375 20.4498 25.375 20.0003V9.05888C25.375 8.61421 25.137 8.20338 24.7527 7.98709C22.8254 6.9008 16.9662 3.59842 15.0873 2.53992C14.9048 2.43721 14.7018 2.38525 14.5 2.38525C14.297 2.38525 14.0952 2.43721 13.9128 2.53992C12.0338 3.59842 6.17338 6.9008 4.24608 7.98709ZM23.5625 10.5427V19.6354L15.4062 24.1328V14.9761L23.5625 10.5427ZM5.4375 19.5146V10.5028L13.5938 15.0341V24.1099L5.4375 19.5146ZM6.32683 8.91871L14.5 4.31134L22.7179 8.94409L14.5 13.4343L6.32683 8.91871Z"
                      fill="#838282"
                    />
                  </svg>

                  <div className="rl-info">
                    <div className="rl-info-amnt">17886071</div>
                    <div className="rl-info-duration">7 sec ago</div>
                  </div>
                </div>

                <div className="row-right">
                  <div className="upper-part">
                    <div className="fee-receipt">Fee Receipt</div>
                    <div className="bever-build">beaverbuild</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="vertical-divider" />

          <div className="stats-body-section">
            <div className="sbr-title">Latest Transactions</div>

            <div className="blocks-table">
              <div className="blocks-table-row">
                <div className="row-left">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M20.1663 22H4.58301C3.06409 22 1.83301 20.7689 1.83301 19.25V2.75C1.83301 1.23108 3.06409 0 4.58301 0H20.1663V22ZM18.333 18.3333H5.03676C3.77634 18.3333 3.77634 20.1667 5.03676 20.1667H18.333V18.3333ZM18.333 1.83333H4.58301V16.5H18.333V1.83333ZM15.583 4.58333V7.33333H7.33301V4.58333H15.583Z"
                      fill="#838282"
                    />
                  </svg>

                  <div className="rl-info-r">
                    <div className="rl-info-amnt">0xc497a809705f6</div>
                    <div className="rl-info-duration">7 sec ago</div>
                  </div>
                </div>

                <div className="row-right">
                  <div className="upper-part">
                    <div className="fee-receipt">Fee Receipt</div>
                    <div className="bever-build">beaverbuild</div>
                  </div>
                </div>
              </div>

              <div className="horizontal-divider" />

              <div className="blocks-table-row">
                <div className="row-left">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M20.1663 22H4.58301C3.06409 22 1.83301 20.7689 1.83301 19.25V2.75C1.83301 1.23108 3.06409 0 4.58301 0H20.1663V22ZM18.333 18.3333H5.03676C3.77634 18.3333 3.77634 20.1667 5.03676 20.1667H18.333V18.3333ZM18.333 1.83333H4.58301V16.5H18.333V1.83333ZM15.583 4.58333V7.33333H7.33301V4.58333H15.583Z"
                      fill="#838282"
                    />
                  </svg>

                  <div className="rl-info-r">
                    <div className="rl-info-amnt">0xc497a809705f6</div>
                    <div className="rl-info-duration">7 sec ago</div>
                  </div>
                </div>

                <div className="row-right">
                  <div className="upper-part">
                    <div className="fee-receipt">Fee Receipt</div>
                    <div className="bever-build">beaverbuild</div>
                  </div>
                </div>
              </div>

              <div className="horizontal-divider" />

              <div className="blocks-table-row">
                <div className="row-left">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M20.1663 22H4.58301C3.06409 22 1.83301 20.7689 1.83301 19.25V2.75C1.83301 1.23108 3.06409 0 4.58301 0H20.1663V22ZM18.333 18.3333H5.03676C3.77634 18.3333 3.77634 20.1667 5.03676 20.1667H18.333V18.3333ZM18.333 1.83333H4.58301V16.5H18.333V1.83333ZM15.583 4.58333V7.33333H7.33301V4.58333H15.583Z"
                      fill="#838282"
                    />
                  </svg>

                  <div className="rl-info-r">
                    <div className="rl-info-amnt">0xc497a809705f6</div>
                    <div className="rl-info-duration">7 sec ago</div>
                  </div>
                </div>

                <div className="row-right">
                  <div className="upper-part">
                    <div className="fee-receipt">Fee Receipt</div>
                    <div className="bever-build">beaverbuild</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapModal;
