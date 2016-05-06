import React from 'react'
import { connect } from 'react-redux'

class Index extends React.Component {

  render() {
    return <div className="container">
      <h2>Index</h2>
    </div>
  }

}

export default connect(state => state)(Index)
