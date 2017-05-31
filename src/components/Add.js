import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Add extends Component {
  state = {}

  _submit = (e) => {
    e.preventDefault()
    const query = this.refs.query.value
    const path = query.length > 0 ? `/beer/${query}` : '/'
    this.props.history.push(path)
    this.setState({
      query
    })
    console.log(query, path)
  }

  render () {
    return <div className='Add'>
      <span> Find a Beer: </span>
      <form onSubmit={this._submit}>
        <input ref='query' placeholder='Search...' />
      </form>
      <div className='searchResult' />
    </div>
  }
}

export default withRouter(Add)
