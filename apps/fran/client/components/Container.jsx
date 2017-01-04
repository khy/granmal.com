import React from 'react'
import { connect } from 'react-redux'

import { showModal, hideModal } from 'client/actions/modal'

import { addMovement } from 'fran/client/actions'
import { Navbar, NavMenu } from 'fran/client/components/nav'
import NewMovement from 'fran/client/components/NewMovement'

class Container extends React.Component {

  render() {
    let modal

    if (this.props.modal.isVisible) {
      if (this.props.modal.name === 'NavMenu') {
        modal = <NavMenu
          onClose={this.props.onHideModal}
        />
      } else if (this.props.modal.name == 'NewMovement') {
        modal = <NewMovement
          onAdd={this.props.onAddMovement}
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
    onAddMovement: (newMovement) => { dispatch(addMovement(newMovement)) },
    onHideModal: () => { dispatch(hideModal()) },
    onShowNavMenu: () => { dispatch(showModal('NavMenu')) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
