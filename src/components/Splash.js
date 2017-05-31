import React, { Component } from 'react'
import { observer } from 'mobx-react'
import auth from '../auth'

@observer
class Splash extends Component {
  render () {
    return <div className='Splash'>
      <span> A simple way to keep tab of your brews. </span>
      <img src='../images/logo1.png' />
      <button onClick={() => auth.signIn()}> SIGN IN </button>
    </div>
  }
}

export default Splash
