import React, { Component } from 'react'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

/*

3. approve DethSwitch contract to send on behalf of parent
    -Get reference to ERC20token contract (has to accept arbitrary token address)
    - TokenInstance = ERC20Token.at(tokenAddress)
    - TokenInstance.approve(DethSwithAddress, amountOfTokens)
*/

class NewContract extends Component {
  constructor(props) {
    super(props)

    this.state = {
      contract: undefined
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async withdrawFunds(funds){

    return this.props.ercinstance.approve.call(0xdc26e77255b2ff073e0ab96fbc9931356f01fb8c,funds).then((res) => {
      console.log(res);
    })

  }

  handleSubmit(e) {
    e.preventDefault();

    this.withdrawFunds(20);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    return (
        <div className="NewContract">
          <div className="container">
              <h1> Withdraw Funds From a DethSwitch Contract</h1>
              <p>Your Address (detected): {this.props.parentAddress}</p>
              <p>ERC20Token address (detected): {this.props.tokenAddress}</p>
              <p>Contract : 0xdc26e77255b2ff073e0ab96fbc9931356f01fb8c</p>

              <div className='submission-forms'>
                <form onSubmit={this.handleSubmit}>

                  <div className='list-item'>
                    <input type="submit" value="Withdraw" />
                  </div>
                </form>
              </div>
        </div>
      </div>
    );
  }
}

export default NewContract
