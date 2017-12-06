/*eslint-disable no-useless-constructor*/

import React, { Component } from 'react'
import Holder from './Holder.js'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class HolderList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="HolderList">
      {
        this.props.holderList.map((c) => {
          return   (<Holder key={c[0]}
                        account={c[0]}
                        tokens={c[1]}
                 />);
        })
      }

      </div>
    );
  }
}

export default HolderList
