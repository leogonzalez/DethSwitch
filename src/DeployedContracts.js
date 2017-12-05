import React, { Component } from 'react'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class DeployedContracts extends Component {
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
      <div className="DeployedContracts">
        <div className='container'>
          <h1> All the DethSwitch Contracts Deployed so far</h1>
        </div>
      </div>
    );
  }
}

export default DeployedContracts
