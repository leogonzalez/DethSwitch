/*eslint-disable*/
import React, { Component } from 'react'
import getWeb3 from './utils/getWeb3'
import TokenMarket from './TokenMarket.js';
import NewContract from './NewContract.js';
import Withdraw from './Withdraw.js';
import DeployedContracts from './DeployedContracts.js';

// Contracts

import DSF from '../build/contracts/DethSwitchFactory.json'
import AnyERC20Token from '../build/contracts/AnyERC20Token.json';

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

/*
A FEW TO-DOS ON THE FRONT END:
1. Lift up getWeb3 state so we don't have to fetch it for every component that uses it
2. Lift up the Account Holders state so we make sure every component gets updated when tokens are transfered
3.

 */

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }


  async instantiateDSFContract() {
    const contract = require('truffle-contract')
    const dethSwitchFactory = contract(DSF)
    dethSwitchFactory.setProvider(this.state.web3.currentProvider)

    let instance = await dethSwitchFactory.deployed();
    this.setState({dsfinstance:instance})

    let heirContracts = await instance.getNumberOfHeirContracts.call();
    let heirContractsArray = [];
    for (var i = 0; i < heirContracts; i++) {
      var ctc = await instance.getHeirContracts.call(i);
      heirContractsArray.push(ctc);
      this.setState({heirContracts:heirContractsArray})
    }

    let numberOfContracts = await instance.getNumberOfOwnedContracts.call();
    let ownContractsArray = [];
    for (var i = 0; i < numberOfContracts; i++) {
      var ctc = await instance.getOwnedContracts.call(i);
      ownContractsArray.push(ctc);
      this.setState({parentContracts:ownContractsArray})
    }

  }

  async instantiateERCContract() {
    const contract = require('truffle-contract')
    const anyERC20Token = contract(AnyERC20Token)
    anyERC20Token.setProvider(this.state.web3.currentProvider)
    let instance = await anyERC20Token.deployed();

    let totalSupply = await instance.totalSupply.call()
    this.setState({tokenSupply: totalSupply.toNumber()});

    let tokenName = await instance.name.call()
    this.setState({tokenName: tokenName});

    let tokenSymbol = await instance.symbol.call()
    this.setState({tokenSymbol: tokenSymbol});

    let parentAddress = await this.state.parentAddress;
    return instance.balanceOf(parentAddress).then((results) => {
      this.setState({parentBalance: results.c[0]});
    })



  }


  componentWillMount() {


    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })
      results.web3.eth.getAccounts((err,res) => {
        this.setState({
          parentAddress: res[0]
        })
      });

      this.setState({
        parentAddress: results.web3.eth.accounts[0]
      })

      this.instantiateDSFContract();
      this.instantiateERCContract();

    })

    .catch((e) => {
      console.log(e)
    })

  }


  async getOwnedContracts(){

    if (this.state.dsfinstance) {
      let myContracts;
      let numberOfContracts = await this.state.dsfinstance.getNumberOfOwnedContracts.call();
      for (var i = 0; i < numberOfContracts; i++) {
        var ctc = await this.state.dsfinstance.getOwnedContracts.call(i);
        myContracts.push(ctc);
      }
      this.setState({parentContracts:myContracts})
    }

  }

  render() {

    return (
      <div className='container'>
        <div className="App">
              <TokenMarket
                web3={this.state.web3}
                tokenName={this.state.tokenName}
                tokenSymbol={this.state.tokenSymbol}
                tokenSupply={this.state.tokenSupply}
                parentAddress={this.state.parentAddress}
                parentBalance={this.state.parentBalance}
              />

              <NewContract
                web3={this.state.web3}
                dsfinstance={this.state.dsfinstance}
                parentAddress={this.state.parentAddress}
              />

              <DeployedContracts
                parentContracts={this.state.parentContracts}
                heirContracts={this.state.heirContracts}
              />

              <Withdraw
                web3={this.state.web3}
              />

        </div>
      </div>
    );
  }
}

export default App
