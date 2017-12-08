import React, { Component } from 'react'
import DethSwitch from "../build/contracts/DethSwitch.json";

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class NewContract extends Component {
  constructor(props) {
    super(props)

    this.state = {
      contract: undefined
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async withdrawFunds(funds){
    var currentContract = this.props.parentContracts[0] || undefined;

    await this.props.ercinstance.approve.call(currentContract,funds).then((res) => {
      console.log(`Approved: ${res}`);
    })

    return this.props.web3.eth.contract(DethSwitch.abi).at(currentContract).withdraw.call(this.props.parentAddress,(err,res) => {
      console.log(err);
      console.log(res);
    })

    // return this.props.web3.eth.contract(DethSwitch.abi).at(currentContract).getExpirationTime.call((err,res) => {
    //   console.log(err);
    //   console.log(res);
    // })

  }

  handleSubmit(e) {
    e.preventDefault();
    this.withdrawFunds(20);
  }

  handleChange(e) {
    console.log(this.props.parentContracts);
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    return (
        <div className="NewContract">
          <div className="container">
              <h1> Withdraw Funds From a DethSwitch Contract</h1>
              <p>Your Address (detected): {this.props.parentAddress}</p>
              <p>ERC20Token address (detected): {this.props.tokenAddress}</p>
              <p>Contract : {this.props.parentContracts} </p>

              <div className='submission-forms'>
                <form onSubmit={this.handleSubmit}>

                  <div className='list-item'>
                    <input type="submit" value="Withdraw" />
                  </div>
                </form>
              </div>
        </div>
      </div>
    );
  }
}

export default NewContract
