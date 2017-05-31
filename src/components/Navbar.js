import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
// import { Redirect } from 'react-router'
import auth from '../auth'

@observer
class Navbar extends Component {
  render () {
    return <div className='Navbar'>
      <Link to='/add'> Search </Link>
      <Link to='/tabs'> Tabs </Link>
      <Link to='/favorites'> Favorites </Link>
      <Link to='/'> About </Link>
      <a onClick={() => auth.signOut()} href='/'> { auth.isSignedIn ? <img width='50px' src={auth.profile.picture} /> : '' } </a>
    </div>
  }
}

export default Navbar
