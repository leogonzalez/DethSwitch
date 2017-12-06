/*eslint-disable no-useless-constructor*/
import React, { Component } from 'react'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class Holder extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {

  }


  render() {
    return (
      <div className="Holder">
          <ul>
            <li>Account: {this.props.account} </li>
            <li>Tokens: {this.props.tokens} </li>
          </ul>
      </div>
    );
  }
}

export default Holder
