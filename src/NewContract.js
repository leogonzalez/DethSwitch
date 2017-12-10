import React, { Component } from 'react'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

/*

so for the user:
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

  async createNewDethSwitch(){
    await this.props.dsfinstance.newDethSwitch(this.state.heirAddress,'placeholder', this.state.heartBeatTimer, {from: this.props.parentAddress});

  }

  async approveWithdraw(){
    this.contract = 0x27bed41c595fae5d0b34381cb3a2300da85b93f5;
    this.funds = 20;
    await this.props.ercinstance.approve.call(this.contract,this.funds).then((res) => {
      console.log(res);
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.createNewDethSwitch();
    // this.approveWithdraw();

  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    return (
        <div className="NewContract">
          <div className="container">
              <h1> Create a New DethSwitch Contract</h1>
              <p>Parent Address (detected): {this.props.parentAddress}</p>
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
