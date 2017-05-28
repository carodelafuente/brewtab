import React, { Component } from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import Navbar from './Navbar'
import Splash from './Splash'

class App extends Component {
  render () {
    return <Router>
      <div className='App'>
        <h1> <NavLink to='/'> Brewtab </NavLink> </h1>
        <main>
          <Route exact path='/' component={Splash} />
        </main>
        <Navbar />
      </div>
    </Router>
  }
}

export default App
