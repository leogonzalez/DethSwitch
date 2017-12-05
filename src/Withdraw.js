import React, { Component } from 'react'
import getWeb3 from './utils/getWeb3'
import AnyERC20Token from '../build/contracts/AnyERC20Token.json'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class Withdraw extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: undefined,
      erc20instance: undefined,
      fromAddress: undefined,
      toAddress: undefined,
      sendValue: undefined,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {

    const contract = require('truffle-contract')
    const anyERC20Token = contract(AnyERC20Token)
    anyERC20Token.setProvider(this.state.web3.currentProvider)

  //   // Declaring this for later so we can chain functions on SimpleStorage.
    var anyERC20TokenInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      anyERC20Token.deployed().then((instance) => {
        anyERC20TokenInstance = instance
        //calls the totalSupply function from StandardToken contract
        this.setState({erc20instance:anyERC20TokenInstance})
      })
    })
  }

  sendTokens(){
    // var currentInstance = this.state.erc20instance
    //
    // currentInstance.transfer(this.state.toAddress,this.state.sendValue);
    // return currentInstance.balanceOf.call(this.state.toAddress).then((result) => {
    //   console.log(result.c[0]);
    // });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.sendTokens();
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    return (
      <div className="Withdraw">
        <div className='container'>
          <h1> Transfer funds from Parent Address</h1>
          <div className='submission-forms'>
            <form onSubmit={this.handleSubmit}>
              <div className='list-item'>
                <input name="toAddress" placeholder="To Address" type="text" value={this.state.toAddress} onChange={this.handleChange} />
                <input name="sendValue" placeholder="Value to send" type="text" value={this.state.sendValue} onChange={this.handleChange} />
                <input type="submit" value="Send" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Withdraw
