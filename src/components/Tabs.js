import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { query } from '../api'
import auth from '../auth'

@observer
class Tabs extends Component {
  state = {
    tabs: []
  }

  componentDidMount () {
    if (auth.isSignedIn) {
      query(`
        allTabs(filter: { user: { id: "${auth.userId}" } }) {
          id
          beer {
            name
            id
            logo
            description
            slug
            abv
          }
        }
      `).then(({ data }) => {
        this.setState({
          tabs: data.allTabs
        })
      })
    }
  }

  render () {
    return <div className='Tabs BeerList'>
      Tabs
      <ul>
        {this.state.tabs.map((tab) => {
          console.log(tab)
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

export default Tabs
