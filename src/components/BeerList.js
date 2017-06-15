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
    console.log('Fav tab!,', id)
    mutation(`
      createTab(beerId: "${id}", userId: "${auth.userId}", favorite: true) {
        id
      }
    `).then(() => {
      this.props.history.push('/favorites')
    })
    console.log(id, 'beer')
  }

  _addTab = (id) => {
    console.log('add tab!,', id)
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
            <img className='logo' src={logo} />
            <div className='space-around'>
              <h4> ABV: {abv} </h4>
              <div className='buttons'>
                <button onClick={() => this._addFav(id)}> <img className='add' src='../images/fav.png' /> </button>
                <button onClick={() => this._addTab(id)}> <img className='add' src='../images/add.png' /> </button>
              </div>
            </div>
            <p>{description}</p>
          </li>
        ))}
      </ul>
    </div>
  }
}

export default BeerList
