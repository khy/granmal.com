import React from 'react'
import { connect } from 'react-redux'

class Index extends React.Component {

  render() {
    return <h2>Index</h2>
  }

}

export default connect(state => state)(Index)
