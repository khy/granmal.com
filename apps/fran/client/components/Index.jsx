import React from 'react'
import { connect } from 'react-redux'

class Index extends React.Component {

  render() {
    return (
      <div>
        <h1>Fran</h1>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
