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
    return <div className='Favorites'>
      Fav beers
      <ul>
        {this.state.favorites.map((tab) => {
          return <li key={tab.id}>{tab.beer.name}</li>
        })}
      </ul>
    </div>
  }
}

export default Favorites
