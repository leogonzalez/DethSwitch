import React, { Component } from 'react'
import DethSwitch from "../build/contracts/DethSwitch.json";

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class WithdrawFunds extends Component {
  constructor(props) {
    super(props)

    this.state = {
      contract: [1,2]
    }

    // this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async withdrawFunds(funds){
    var currentContract = 0x27bed41c595fae5d0b34381cb3a2300da85b93f5;
    // console.log(currentContract);

    //getting zero
    // await this.props.ercinstance.allowance.call(this.props.parentAddress,currentContract).then((res) => {
    //   console.log(`Approved Value: ${res}`);
    // })

    // return this.props.web3.eth.contract(DethSwitch.abi).at(currentContract).withdraw.call(this.props.tokenAddress,(err,res) => {
    //   console.log(err);
    //   console.log(res);
    // })

    return this.props.web3.eth.contract(DethSwitch.abi).at(currentContract).getAllowance(this.props.tokenAddress,{from: this.props.parentAddress},(err,res) => {
      console.log(err);
      console.log(res);
      console.log(this.props.tokenAddress);
    });

  }

  handleSubmit(e) {
    e.preventDefault();
    this.withdrawFunds(20);
  }

  pickContract(e){
    // e.preventDefault();
    console.log(this.props.heirContracts[e]);
  }

  render() {
    return (
        <div className="NewContract">
          <div className="container">
              <h1> Withdraw Funds From a DethSwitch Contract</h1>
              <p>Your Address (detected): {this.props.parentAddress}</p>
              <p>ERC20Token address (detected): {this.props.tokenAddress}</p>
              <h3> Pick your contract to withdraw funds </h3>
              { this.props.heirContracts ?
                this.props.heirContracts.map((item, index) => (
                   <button onClick={(e) => this.pickContract(index)} key={index}>Heir Contract#{index}: {item}</button>
                )) : undefined}

              <div className='submission-forms'>
                <button>Withdraw</button>
              </div>
        </div>
      </div>
    );
  }
}

export default WithdrawFunds
