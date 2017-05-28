import React, { Component } from 'react'

class Navbar extends Component {
  render () {
    return <div className='Navbar'>
      <a href='#'> Home </a> |
      <a href='#'> Search/Add </a> |
      <a href='#'> Favs </a> |
      <a href='#'> Sign Out </a>
    </div>
  }
}

export default Navbar
