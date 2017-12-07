import React, { Component } from 'react'
import getWeb3 from './utils/getWeb3'
import TokenMarket from './TokenMarket.js';
import NewContract from './NewContract.js';
import Withdraw from './Withdraw.js';
import DeployedContracts from './DeployedContracts.js';

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
      web3: null,
    }
  }

  componentWillMount() {

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3,
        parentAddress: results.web3.eth.accounts[0],
      })

    })
    .catch((e) => {
      console.log(e)
    })
  }


  render() {
    return (
      <div className='container'>
        <div className="App">
              <TokenMarket />
              <NewContract />
              <DeployedContracts />
              <Withdraw />

        </div>
      </div>
    );
  }
}

export default App
