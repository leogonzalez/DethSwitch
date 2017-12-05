import React, { Component } from 'react'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class NewContract extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      parentAddress: undefined,
      heirAddress: undefined,
      heartBeatTimer: undefined,
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

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state)
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
