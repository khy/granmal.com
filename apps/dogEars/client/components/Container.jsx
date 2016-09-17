import React from 'react'
import { connect } from 'react-redux'
import _get from 'lodash/get'
import { Link } from 'react-router'

import { showAdHocAlert } from 'client/actions/alert'
import { logIn } from 'client/actions/auth'
import { showModal, hideModal } from 'client/actions/modal'
import { Icon } from 'client/components/fontAwesome'
import { LogInModal } from 'client/components/auth/logIn'
import { Alert, AlertContext, AlertSuccess } from 'client/components/bootstrap/alert'

import { Navbar, NavMenu } from 'dogEars/client/components/nav'
import NewDogEar from 'dogEars/client/components/NewDogEar'
import {
  createDogEar, fetchEditionsForNewDogEar, showNewDogEarModal,
} from 'dogEars/client/actions'

class Container extends React.Component {

  render() {
    let modal

    if (this.props.modal.isVisible) {
      if (this.props.modal.name === 'NavMenu') {
        modal = <NavMenu
          onNewDogEar={this.props.onShowNewDogEarModal}
          onClose={this.props.onHideModal}
        />
      } else if (this.props.modal.name === 'NewDogEar') {
        modal = <NewDogEar
          editionOptions={this.props.newDogEar.editions.records}
          editionOptionsLoading={this.props.newDogEar.editions.isPending}
          disabled={this.props.newDogEar.isPending}
          onCreate={this.props.onCreateDogEar}
          onClose={this.props.onHideModal}
          onFetchEditions={this.props.onFetchEditions}
          selectedEdition={this.props.newDogEar.selectedBook}
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
        case 'dogEarAdded':
          const dogEar = this.props.alert.data.dogEar

          if (dogEar.note) {
            alert = <AlertSuccess>
              <Icon name="book" />
              <span>You left </span>
              <Link to={`/dogEars/notes/${dogEar.guid}`} className="alert-link">a note</Link>
              <span> on page {dogEar.pageNumber} of </span>
              <Link to={`/dogEars/books/${dogEar.edition.title}`} className="alert-link">{dogEar.edition.title}</Link>
            </AlertSuccess>
          } else {
            alert = <AlertSuccess>
              <Icon name="pencil-square-o" />
              <span>You read to page {dogEar.pageNumber} of </span>
              <Link to={`/dogEars/books/${dogEar.edition.title}`} className="alert-link">{dogEar.edition.title}</Link>
            </AlertSuccess>
          }

          break

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
  return {
    alert: state.alert,
    modal: state.modal,
    newDogEar: _get(state, 'app.newDogEar'),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateDogEar: (newDogEar) => { dispatch(createDogEar(newDogEar)) },
    onFetchEditions: (title) => { dispatch(fetchEditionsForNewDogEar(title)) },
    onHideModal: () => { dispatch(hideModal()) },
    onLogIn: (email, password) => {
      dispatch(logIn(email, password)).then(() => {
        dispatch(hideModal())
        dispatch(showAdHocAlert(AlertContext.Success, 'You logged in successfully.'))
      })
    },
    onShowNavMenu: () => { dispatch(showModal('NavMenu')) },
    onShowNewDogEarModal: () => { dispatch(showNewDogEarModal()) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
