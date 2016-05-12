import React from 'react'
import { connect } from 'react-redux'
import _get from 'lodash/get'

import { showModal, hideModal } from 'client/actions/modal'

import NewHaiku from 'haiku/client/components/NewHaiku'
import { fetchIndexHaikus, submitNewHaikuModal } from 'haiku/client/actions'

class Index extends React.Component {

  constructor(props) {
    super(props)

    this.createHaiku = this.createHaiku.bind(this)
    this.showNewHaikuModal = this.showNewHaikuModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
  }

  componentWillMount() {
    this.props.dispatch(fetchIndexHaikus())
  }

  componentWillReceiveProps(newProps) {
    newProps.dispatch(fetchIndexHaikus())
  }

  createHaiku(newHaiku) {
    this.props.dispatch(submitNewHaikuModal(newHaiku))
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
            errors={_get(this.props.modal, 'data.errors', {})}
          />
        )
      }
    }

    const haikus = this.props.app.index.haikus.haikus.map((haiku) => {
      return (
        <div className="card" key={haiku.guid}>
          <div className="card-block">
            <p className="card-text">{haiku.lines[0]}</p>
            <p className="card-text">{haiku.lines[1]}</p>
            <p className="card-text">{haiku.lines[2]}</p>
          </div>
        </div>
      )
    })

    return (
      <div>
        <div className="container">
          <a href='#' onClick={this.showNewHaikuModal}>New Haiku</a>
          {haikus}
        </div>

        {modal}
      </div>
    )
  }

}

export default connect(state => state)(Index)
