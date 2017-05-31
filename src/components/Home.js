import React, { Component } from 'react'
import auth from '../auth'
import { observer } from 'mobx-react'

@observer
class Home extends Component {
  render () {
    return <div className='Home'>
      Hi, {auth.profile.given_name}!
      <img width='50px' src={auth.profile.picture} />
      {/* Add image of beer with heart later */}
    </div>
  }
}

export default Home
