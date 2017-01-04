import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { showModal } from 'client/actions/modal'

class Index extends React.Component {

  render() {
    return (
      <div>
        <h1>Fran</h1>
        <a href="#" onClick={this.props.showNewMovement}>New Movement</a>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    showNewMovement: () => { dispatch(showModal('NewMovement')) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
