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
    return <div className='Tabs'>
      Tabs
      <ul>
        {this.state.tabs.map((tab) => {
          console.log(tab)
          return <li key={tab.id}>{tab.beer.name}</li>
        })}
      </ul>
    </div>
  }
}

export default Tabs
