import React, { Component } from 'react'
import getWeb3 from './utils/getWeb3'
import AnyERC20Token from '../build/contracts/AnyERC20Token.json';

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class TokenMarket extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tokenSupply: undefined,
      tokenName: undefined,
      tokenSymbol: undefined,
      tokenHolders: [ ]
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
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
        return anyERC20TokenInstance.totalSupply.call()
      }).then((result) => {
        // Renders total supply of Token
        this.setState({tokenSupply: result.toNumber()});
        return anyERC20TokenInstance.name.call()
      }).then((result) => {
        // Renders Token Name
        this.setState({tokenName: result});
        return anyERC20TokenInstance.symbol.call()
      }).then((result) => {
        // Renders Token Symbol
        this.setState({tokenSymbol: result});
      })
    })
  }

  render() {
    return (
      <div className="TokenMarket">
        <div className="container">
        
              <h1> Token Market </h1>
              <p>Token Name: {this.state.tokenName}</p>
              <p>Token Symbol: {this.state.tokenSymbol}</p>
              <p>Total Supply: {this.state.tokenSupply}</p>
              <p>Holder Accounts: {this.state.tokenHolders}</p>
        </div>
      </div>
    );
  }
}

export default TokenMarket
