import React, { Component } from 'react'
import { query } from '../api'

class BeerList extends Component {
  state = {
    beer: []
  }

  componentDidMount () {
    const q = this.props.match.params.query
    query(`allBeers(filter: {
      name_contains: "${q}"
    }) {
      name
      logo
      description
      slug
      abv
    }`).then(({ data }) => {
      this.setState({
        beer: data.allBeers
      })
    })
  }

  _addFav = (e) => {
    console.log('added fav!')
  }

  _addTab = (e) => {
    console.log('added to tabs!')
  }

  render () {
    return <div className='BeerList'>
      <ul>
        {this.state.beer.map(({ slug, name, description, logo, abv }, i) => (
          <li key={i}>
            <h3>{name}</h3>
            <img src={logo} />
            <h4> ABV: {abv} </h4>
            <p>{description}</p>
            <button onClick={this._addFav}> Add to your Favs! </button>
            <button onClick={this._addTab}> Add to your Tabs! </button>
          </li>
        ))}
      </ul>
    </div>
  }
}

export default BeerList
