import React from 'react'

import { FormModal } from 'client/components/bootstrap/modal'

export default class NewHaiku extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      lineOne: '',
      lineTwo: '',
      lineThree: '',
    }

    this.setLineOne = this.setLine.bind(this, 'lineOne')
    this.setLineTwo = this.setLine.bind(this, 'lineTwo')
    this.setLineThree = this.setLine.bind(this, 'lineThree')

    this.createHaiku = this.createHaiku.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  setLine(lineKey, event) {
    let newState = {}
    newState[lineKey] = event.target.value
    this.setState(newState)
  }

  createHaiku() {
    this.props.onCreate({
      lines: [this.state.lineOne, this.state.lineTwo, this.state.lineThree]
    })
  }

  closeModal(event) {
    this.props.onClose()
  }

  render() {
    return (
      <FormModal
        title="New Haiku"
        submitText="Add"
        onSubmit={this.createHaiku}
        onCancel={this.closeModal}
      >
        <fieldset className="form-group">
          <input value={this.state.lineOne} onChange={this.setLineOne} className="form-control" type="text" placeholder="5 Syllables"/>
        </fieldset>
        <fieldset className="form-group">
          <input value={this.state.lineTwo} onChange={this.setLineTwo} className="form-control" type="text" placeholder="7 Syllables"/>
        </fieldset>
        <fieldset className="form-group">
          <input value={this.state.lineThree} onChange={this.setLineThree} className="form-control" type="text" placeholder="5 Syllables"/>
        </fieldset>
      </FormModal>
    )
  }

}

NewHaiku.propTypes = {
  onCreate: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired,
}
