import React, { Component } from 'react'
import { query, mutation } from '../api'
import auth from '../auth'

class BeerList extends Component {
  state = {
    beer: []
  }

  componentDidMount () {
    const q = this.props.match.params.query
    query(`allBeers(filter: {
      name_contains: "${q}"
    }) {
      id
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

  _addFav = (id) => {
    mutation(`
      createTab(beerId: "${id}", userId: "${auth.userId}", favorite: true) {
        id
      }
    `).then(() => {
      this.props.history.push('/favorites')
    })
  }

  _addTab = (id) => {
    mutation(`
      createTab(beerId: "${id}", userId: "${auth.userId}", favorite: false) {
        id
      }
    `).then(() => {
      this.props.history.push('/tabs')
    })
  }

  render () {
    return <div className='BeerList'>
      <ul>
        {this.state.beer.map(({ id, slug, name, description, logo, abv }, i) => (
          <li key={i}>
            <h3>{name}</h3>
            <img src={logo} />
            <h4> ABV: {abv} </h4>
            <p>{description}</p>
            <button onClick={() => this._addFav(id)}> <i className='fa fa-star-o' aria-hidden='true' /> </button>
            <button onClick={() => this._addTab(id)}> Add to your Tabs! </button>
          </li>
        ))}
      </ul>
    </div>
  }
}

export default BeerList
