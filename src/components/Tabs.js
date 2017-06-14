import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { query } from '../api'
import auth from '../auth'
import Carousel from 'nuka-carousel'

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

  // render () {
  //   return <div className='Tabs BeerList'>
  //     <span> Your Tabs </span>
  //     <Carousel dragging className='carousel'>
  //       {this.state.tabs.map((tab) => {
  //         return <div key={tab.id} className='beerSlide'>
  //           <h4>{tab.beers[0].name}</h4>
  //           <img className='logo' src={tab.beers[0].logo} />
  //           <h4> ABV: {tab.beers[0].abv} </h4>
  //         </div>
  //       })}
  //     </Carousel>
  //   </div>
  // }

  render () {
    return <div className='Tabs BeerList'>
      <span> Your Tabs </span>
      {this.state.tabs.map((tab) => {
        return <div key={tab.id} className='beerBox'>
          <img className='logoBox' src={tab.beers[0].logo} />
          <h4 className='name'> {tab.beers[0].name} </h4>
          <h4 className='abv'> <div className='abv2'> ABV: </div> {tab.beers[0].abv} </h4>
          {/* <a href='#'> Read More </a> */}
        </div>
      })}
    </div>
  }
}

export default Tabs
