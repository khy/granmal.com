import React from 'react'
import { connect } from 'react-redux'

import { showModal, hideModal } from 'client/actions/modal'
import { showNamedAlert } from 'client/actions/alert'
import { Icon } from 'client/components/fontAwesome'
import { Alert, AlertContext, AlertSuccess } from 'client/components/bootstrap/alert'

import { workoutsClient } from 'fran/client/clients'
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
          disabled={this.props.newMovement.get('isPending')}
          onAdd={this.props.onAddMovement}
          onClose={this.props.onHideModal}
        />
      }
    }

    let alert

    if (this.props.alert.isVisible) {
      switch (this.props.alert.name) {
        case 'movementAdded':
          const movement = this.props.alert.data.movement

          alert = <AlertSuccess>
            <Icon name="plus" />
            <span>Created movement "{movement.name}"</span>
          </AlertSuccess>

          break

        case 'workoutAdded':
          const workout = this.props.alert.data.workout

          alert = <AlertSuccess>
            <Icon name="plus" />
            <span>Created workout "{workout.name}"</span>
          </AlertSuccess>

          break

        default:
          alert = <Alert context={this.props.alert.context}>
            {this.props.alert.text}
          </Alert>
      }
    }

    return (
      <div>
        <Navbar
          onButtonClick={this.props.onShowNavMenu}
        />

        <div className="container">
          {alert}
          {this.props.children}
        </div>

        {modal}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    alert: state.alert,
    modal: state.modal,
    newMovement: state.app.get('newMovement'),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddMovement: (newMovement) => {
      dispatch(function (dispatch, getState) {
        dispatch({ type: 'newMovement.add.send' })

        workoutsClient(getState()).post('/movements', newMovement).then((movement) => {
          dispatch({ type: 'newMovement.add.success', movement })
          dispatch(hideModal())
          dispatch(showNamedAlert('movementAdded', { movement }))
        })
      })
    },
    onHideModal: () => { dispatch(hideModal()) },
    onShowNavMenu: () => { dispatch(showModal('NavMenu')) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
