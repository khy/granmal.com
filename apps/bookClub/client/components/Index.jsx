import React from 'react'
import { connect } from 'react-redux'

class Index extends React.Component {

  render() {
    return (
      <h1>Book Club</h1>
    )
  }

}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
