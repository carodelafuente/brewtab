import React, { Component } from 'react'
import auth from '../auth'
import Add from './Add'
import Tabs from './Tabs'
import Favorites from './Favorites'
import BeerList from './BeerList'
import { observer } from 'mobx-react'
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom'
import Home from './Home'
import Navbar from './Navbar'
import Splash from './Splash'

@observer
class App extends Component {
  render () {
    return <Router>
      <div className='App'>
        { auth.isSignedIn ? <h1> <NavLink to='/'> <img width='70px' src='../images/logo1.png' /> Brewtab </NavLink> </h1> : <h1> <NavLink to='/'> Brewtab </NavLink> </h1> }
        {/* <h1> <NavLink to='/'> <img width='70px' src='../images/logo1.png' /> Brewtab </NavLink> </h1> */}
        <main>
          <Switch>
            {auth.isSignedIn ? <Route exact path='/' component={Home} /> : <Route exact path='/' component={Splash} /> }
            <Route path='/add' component={Add} />
            <Route path='/tabs' component={Tabs} />
            <Route path='/favorites' component={Favorites} />
            <Route path='/beer/:query' component={BeerList} />
          </Switch>
        </main>
        {auth.isSignedIn ? <Navbar /> : <footer /> }
      </div>
    </Router>
  }
}

export default App
