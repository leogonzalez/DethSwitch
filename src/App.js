import React, { Component } from 'react'
import getWeb3 from './utils/getWeb3'
import TokenMarket from './TokenMarket.js';
import NewContract from './NewContract.js';

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

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
        parentAddress: results.web3.eth.accounts[0]
      })

    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }


  render() {
    return (
      <div className='container'>
        <div className="App">
              <TokenMarket />
              <NewContract />
        </div>
      </div>
    );
  }
}

export default App
