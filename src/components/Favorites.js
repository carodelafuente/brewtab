import React, { Component } from 'react'
import { observer } from 'mobx-react'
import auth from '../auth'
import { query } from '../api'
import Carousel from 'nuka-carousel'

@observer
class Favorites extends Component {
  state = {
    favorites: []
  }

  componentDidMount () {
    console.log(auth.isSignedIn)
    if (auth.isSignedIn) {
      query(`
        allTabs(filter: { favorite: true, user: { id: "${auth.userId}" }}) {
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
    return <div className='Tabs BeerList'>
      <span> Favorites </span>
      <Carousel dragging className='carousel'>
        {this.state.favorites.map((tab) => {
          return <div key={tab.id} className='beerSlide'>
            <h5>{tab.beer.name}</h5>
            <img className='logo' src={tab.beer.logo} />
            <h5> ABV: {tab.beer.abv} </h5>
          </div>
        })}
      </Carousel>
    </div>
  }
}

export default Favorites
