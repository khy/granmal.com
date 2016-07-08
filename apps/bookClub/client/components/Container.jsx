import React from 'react'
import { connect } from 'react-redux'

import { showModal, hideModal } from 'client/actions/modal'

import { Navbar, NavMenu } from 'bookClub/client/components/nav'

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

    return <div>
      <Navbar
        onButtonClick={this.props.onShowNavMenu}
      />

      <div className="container">
        {this.props.children}
      </div>

      {modal}
    </div>
  }

}

const mapStateToProps = (state) => {
  return {
    modal: state.modal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onShowNavMenu: () => { dispatch(showModal('NavMenu')) },
    onHideModal: () => { dispatch(hideModal()) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
