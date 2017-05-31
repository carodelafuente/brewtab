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
      <span> FIND A BEER: </span>
      <form onSubmit={this._submit} className='form-wrapper cf'>
        <input ref='query' placeholder='Search...' required /> <button type='submit' > Search </button>
      </form>
      <div className='searchResult' />
    </div>
  }
}

export default withRouter(Add)
