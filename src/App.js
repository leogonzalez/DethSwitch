import React, { Component } from 'react'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      parentAddress: null,
      heirAddress: null,
      heartBeatTimer: null,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
      //this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  // instantiateContract() {
  //   /*
  //    * SMART CONTRACT EXAMPLE
  //    *
  //    * Normally these functions would be called in the context of a
  //    * state management library, but for convenience I've placed them here.
  //    */

  //   const contract = require('truffle-contract')
  //   const simpleStorage = contract(SimpleStorageContract)
  //   simpleStorage.setProvider(this.state.web3.currentProvider)

  //   // Declaring this for later so we can chain functions on SimpleStorage.
  //   var simpleStorageInstance

  //   // Get accounts.
  //   this.state.web3.eth.getAccounts((error, accounts) => {
  //     simpleStorage.deployed().then((instance) => {
  //       simpleStorageInstance = instance

  //       // Stores a given value, 5 by default.
  //       return simpleStorageInstance.set(5, {from: accounts[0]})
  //     }).then((result) => {
  //       // Get the value from the contract to prove it worked.
  //       return simpleStorageInstance.get.call(accounts[0])
  //     }).then((result) => {
  //       // Update state with the result.
  //       return this.setState({ storageValue: result.c[0] })
  //     })
  //   })
  // }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state)
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    return (
      <div className="App">
            <p>Parent Address (detected): {this.state.parentAddress}</p>
            <form onSubmit={this.handleSubmit}>
                <input name="heirAddress" placeholder="heir address" type="text" value={this.state.heirAddress} onChange={this.handleChange} />
                <input type="submit" value="Submit" />
                <input name="heartBeatTimer" placeholder="days till expiration" type="text" value={this.state.heartBeatTimer} onChange={this.handleChange} />
                <input type="submit" value="Submit" />
            </form>                    
      </div>
    );
  }
}

export default App
