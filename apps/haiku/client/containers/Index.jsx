import React from 'react'
import { connect } from 'react-redux'

import { showModal, hideModal } from 'client/actions/modal'

import NewHaiku from '../components/NewHaiku'

class Index extends React.Component {

  constructor(props) {
    super(props)
    this.createHaiku = this.createHaiku.bind(this)
    this.showNewHaikuModal = this.showNewHaikuModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
  }

  createHaiku(newHaiku) {
    console.log(newHaiku)
  }

  showNewHaikuModal() {
    this.props.dispatch(showModal('NewHaiku'))
  }

  hideModal() {
    this.props.dispatch(hideModal())
  }

  render() {
    let modal

    if (this.props.modal.isVisible) {
      if (this.props.modal.name === 'NewHaiku') {
        modal = (
          <NewHaiku
            onCreate={this.createHaiku}
            onClose={this.hideModal}
          />
        )
      }
    }

    return (
      <div>
        <div className="container">
          <h2>Index</h2>
          <a href='#' onClick={this.showNewHaikuModal}>New Haiku</a>
        </div>

        {modal}
      </div>
    )
  }

}

export default connect(state => state)(Index)
