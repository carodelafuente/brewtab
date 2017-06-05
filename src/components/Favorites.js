import React, { Component } from 'react'
import { observer } from 'mobx-react'
import auth from '../auth'
import { query } from '../api'

@observer
class Favorites extends Component {
  state = {
    favorites: []
  }

  componentDidMount () {
    console.log(auth.isSignedIn)
    if (auth.isSignedIn) {
      query(`
        allTabs(filter: { favorite: true }) {
          id
          beer {
            name
            logo
            abv
          }
        }
      `).then(({ data }) => {
        this.setState({
          favorites: data.allTabs
        })
      })
    }
  }
  render () {
    return <div className='Favorites BeerList'>
      <span> Favorites </span>
      <ul>
        {this.state.favorites.map((tab) => {
          return <li key={tab.id}>
            <h3>{tab.beer.name}</h3>
            <img src={tab.beer.logo} />
            <h4> ABV: {tab.beer.abv} </h4>
          </li>
        })}
      </ul>
    </div>
  }
}

export default Favorites
