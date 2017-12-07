import React, { Component } from 'react'
import getWeb3 from './utils/getWeb3'
import DSF from '../build/contracts/DethSwitchFactory.json'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

/*

so for the user:
1. call factory to deploy new DethSwitch Contract
    -DethSwitchFactory.newDethSwitch(heirAddress)
2. retrieve address of last deployed contract
    -DethSwitchFactory.getOwnedContracts()
3. approve DethSwitch contract to send on behalf of parent
    -Get reference to ERC20token contract (has to accept arbitrary token address)
    - TokenInstance = ERC20Token.at(tokenAddress)
    - TokenInstance.approve(DethSwithAddress, amountOfTokens)

*/

class NewContract extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      parentAddress: undefined,
      heirAddress: undefined,
      heartBeatTimer: undefined,
      dsfinstance: undefined
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  instantiateDSFContract() {
    const contract = require('truffle-contract')
    const dethSwitchFactory = contract(DSF)
    dethSwitchFactory.setProvider(this.state.web3.currentProvider)

  //   // Declaring this for later so we can chain functions on SimpleStorage.
    var dethSwitchFactoryInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      dethSwitchFactory.deployed().then((instance) => {
        dethSwitchFactoryInstance = instance
        //calls the totalSupply function from StandardToken contract
        this.setState({dsfinstance:dethSwitchFactoryInstance})
        // enable listening to events on this contract

      })
    })
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3,
        parentAddress: results.web3.eth.accounts[0]
      })

      // Instantiate contract once web3 provided.
      this.instantiateDSFContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  createNewDethSwitch(){
    return this.state.dsfinstance.newDethSwitch(this.state.heirAddress,'leo', {from: this.state.parentAddress});
  }

  logNumberContractsByParent(){
    return this.state.dsfinstance.getNumberOfOwnedContracts(this.state.parentAddress).then((res) => {
      console.log(`Parent has created ${res.c[0]} DS contracts`);
    })
  }

  logNumberContractsByHeir(){
    // DEPLOYED CONTRACTS BY HEIR maybe should be asking for the heirs address
    return this.state.dsfinstance.getNumberOfHeirContracts(this.state.heirAddress).then((res) => {
      console.log(`Heir has received ${res.c[0]} DS contracts`);
    })
  }

  logContractsByHeir(){
    //THIS IS NOT WORKING
    return this.state.dsfinstance.deployedContractsByHeir.call().then((res) => {
      console.log(JSON.stringify(res));
    })
    // console.log(this.state.dsfinstance);
  }

  logOwnedContracts(){
    //THIS IS NOT WORKING
    return this.state.dsfinstance.getOwnedContracts.call().then((res) => {
      console.log(res);
    })
    // console.log(this.state.dsfinstance);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.createNewDethSwitch();
    this.logNumberContractsByParent();
    this.logNumberContractsByHeir();
    // this.logOwnedContracts(); not working
    // the getters for public mappings deployedContractsByHeir and deployedContractsByParent are not working
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    return (
        <div className="NewContract">
          <div className="container">
              <h1> Create a New DethSwitch Contract</h1>
              <p>Parent Address (detected): {this.state.parentAddress}</p>
              <p>Heir Address: {this.state.heirAddress}</p>
              <p>Drop Dead Date: {this.state.heartBeatTimer}</p>
              <div className='submission-forms'>
                <form onSubmit={this.handleSubmit}>
                  <div className='list-item'>
                    <input name="heirAddress" placeholder="heir address" type="text" value={this.state.heirAddress} onChange={this.handleChange} />
                    <input type="submit" value="Submit" />
                  </div>
                  <div className='list-item'>
                    <input name="heartBeatTimer" placeholder="days till expiration" type="text" value={this.state.heartBeatTimer} onChange={this.handleChange} />
                    <input type="submit" value="Submit" />
                  </div>
                </form>
              </div>
        </div>
      </div>
    );
  }
}

export default NewContract
