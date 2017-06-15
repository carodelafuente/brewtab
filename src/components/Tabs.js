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
          beers {
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
      <span> Your Tabs </span>
      {this.state.tabs.map((tab) => {
        return <div key={tab.id} className='beerBox slide'>
          <img className='logoBox' src={tab.beers[0].logo} />
          <h4 className='name'> {tab.beers[0].name} </h4>
          <h4 className='abv'> <div className='abv2'> ABV: </div> {tab.beers[0].abv} </h4>
        </div>
      })}
    </div>
  }
}

export default Tabs
