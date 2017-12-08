/* eslint-disable no-useless-constructor */

import React, { Component } from 'react'

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
      heirAddress: undefined,
      heartBeatTimer: undefined,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  createNewDethSwitch(){
    return this.props.dsfinstance.newDethSwitch(this.state.heirAddress,'placeholder', this.state.heartBeatTimer, {from: this.props.parentAddress}).then((res) => {
      console.log(res);
    });
  }

  logNumberContractsAsParent(){
    return this.props.dsfinstance.getNumberOfOwnedContracts.call().then((res) => {
        console.log(`This account ${this.props.parentAddress} has created ${res.c[0]} DethSwitch contracts`)
    });

  }

  logNumberContractsAsHeir(){
    return this.props.dsfinstance.getNumberOfHeirContracts.call().then((res) => {
      console.log(`This account ${this.props.parentAddress} is an heir to ${res.c[0]} DethSwitch contracts`);
    })
  }

  async logContractsByHeir(){
    let heirContracts = await this.props.dsfinstance.getNumberOfHeirContracts.call();
    for (var i = 0; i < heirContracts; i++) {
      var ctc = await this.props.dsfinstance.getHeirContracts.call(i);
      console.log(ctc);
    }
  }

  async logOwnedContracts(){
    let numberOfContracts = await this.props.dsfinstance.getNumberOfOwnedContracts.call();
    for (var i = 0; i < numberOfContracts; i++) {
      var ctc = await this.props.dsfinstance.getOwnedContracts.call(i);
      console.log(ctc);
    }

  }

  handleSubmit(e) {
    e.preventDefault();
    this.createNewDethSwitch();
    // this.logNumberContractsAsParent();
    // this.logNumberContractsAsHeir();
    // this.logOwnedContracts();
    // this.logContractsByHeir();
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
