import React from 'react'
import { connect } from 'react-redux'
import _pick from 'lodash/pick'

import { showAdHocAlert } from 'client/actions/alert'
import { logIn } from 'client/actions/auth'
import { showModal, hideModal } from 'client/actions/modal'
import { LogInModal } from 'client/components/auth/logIn'
import { Alert, AlertContext } from 'client/components/bootstrap/alert'

import { Navbar, NavMenu } from 'bookClub/client/components/nav'
import NewNote from 'bookClub/client/components/NewNote'
import { showNewNoteModal } from 'bookClub/client/actions'

class Container extends React.Component {

  render() {
    let modal

    if (this.props.modal.isVisible) {
      if (this.props.modal.name === 'NavMenu') {
        modal = <NavMenu
          onNewNote={this.props.onShowNewNoteModal}
          onClose={this.props.onHideModal}
        />
      } else if (this.props.modal.name === 'NewNote') {
        modal = <NewNote
          onCreate={this.props.onCreateNote}
          onClose={this.props.onHideModal}
        />
      } else if (this.props.modal.name === 'LogIn') {
        modal = (
          <LogInModal {...this.props.modal.data}
            onLogIn={this.props.onLogIn}
            onClose={this.props.onHideModal}
          />
        )
      }
    }

    let alert

    if (this.props.alert.isVisible) {
      switch (this.props.alert.name) {
        default:
          alert = <Alert context={this.props.alert.context}>
            {this.props.alert.text}
          </Alert>
      }
    }

    return <div>
      <Navbar
        onButtonClick={this.props.onShowNavMenu}
      />

      <div className="container">
        {alert}
        {this.props.children}
      </div>

      {modal}
    </div>
  }

}

const mapStateToProps = (state) => {
  return _pick(state, ['alert', 'modal'])
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateNote: (newNote) => { dispatch(createNote(newNote)) },
    onHideModal: () => { dispatch(hideModal()) },
    onLogIn: (email, password) => {
      dispatch(logIn(email, password)).then(() => {
        dispatch(hideModal())
        dispatch(showAdHocAlert(AlertContext.Success, 'You logged in successfully.'))
      })
    },
    onShowNavMenu: () => { dispatch(showModal('NavMenu')) },
    onShowNewNoteModal: () => { dispatch(showNewNoteModal()) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
