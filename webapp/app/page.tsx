"use client"
import Image from 'next/image'
import Connect from '../components/Connect'

export default function Home() {
  return (
    <>
       <div className="contract-interface">
      <h1> Create New Transaction </h1>
      <label>
        Destination
        <input type="text" id="destination"/>
      </label>

      <label>
        Value (in Wei)
        <input type="text" id="wei"/>
      </label>

      <div className="button" id="deploy">
        Create
      </div>


      <div className="contract-info">
        <h1> Contract Information </h1>

        <div className="field">
          <label> Address </label>
          <div id="address">  </div>
        </div>

        <div className="field">
          <label> Balance in Wei </label>
          <div id="balance">  </div>
        </div>

        <div className="field">
          <label> Required Confirmations </label>
          <div id="confirmations">  </div>
        </div>

        <div className="field">
          <label> Owners </label>
          <div id="owners">  </div>
        </div>
      </div>
    </div>

    <div className="existing-transactions">
      <h1> Existing Transactions </h1>

      <div id="container">
          <Connect/>
      </div>
    </div>
    </>
  )
}
