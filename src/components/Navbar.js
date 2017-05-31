import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
// import { Redirect } from 'react-router'
import auth from '../auth'

@observer
class Navbar extends Component {
  render () {
    return <div className='Navbar'>
      <Link to='/'> Home </Link> |
      <Link to='/add'> Add </Link> |
      <Link to='/favorites'> Favs </Link> |
      <a onClick={() => auth.signOut()} href='/'> Sign Out </a> { auth.isSignedIn ? <img width='50px' src={auth.profile.picture} /> : '' }
    </div>
  }
}

export default Navbar
