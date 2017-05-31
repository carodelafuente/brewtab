import React, { Component } from 'react'
import auth from '../auth'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'

@observer
class Home extends Component {
  render () {
    return <div className='Home'>
      <div className='homeBox'>
      Hi {auth.profile.given_name},
       <img width='50px' src={auth.profile.picture} />
        {/* Add image of beer with heart later */}
        <h3> welcome to Brewtab! </h3>
        <span> You love beer and so do we. Brewtab lets you keep a 'tab' of all the beers you've tried. And if you really loved one, give it a star to add to your favorites!</span>
        <Link to='/add'> Search beers </Link>
      </div>
    </div>
  }
}

export default Home
