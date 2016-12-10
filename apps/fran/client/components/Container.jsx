import React from 'react'
import { connect } from 'react-redux'

import { showModal, hideModal } from 'client/actions/modal'

import { Navbar, NavMenu } from 'fran/client/components/nav'

class Container extends React.Component {

  render() {
    let modal

    if (this.props.modal.isVisible) {
      if (this.props.modal.name === 'NavMenu') {
        modal = <NavMenu
          onClose={this.props.onHideModal}
        />
      }
    }

    return (
      <div>
        <Navbar
          onButtonClick={this.props.onShowNavMenu}
        />

        <div className="container">
          {this.props.children}
        </div>

        {modal}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onHideModal: () => { dispatch(hideModal()) },
    onShowNavMenu: () => { dispatch(showModal('NavMenu')) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
