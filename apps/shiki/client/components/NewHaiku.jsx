import React from 'react'
import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty'
import _assign from 'lodash/assign'

import { FormModal } from 'client/components/bootstrap/modal'
import { FormGroup, TextInput } from 'client/components/bootstrap/form'

export default class NewHaiku extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      lineOne: '',
      lineTwo: '',
      lineThree: '',
      showAttribution: false,
      errors: {}
    }

    this.setLineOne = this.setLine.bind(this, 'lineOne')
    this.setLineTwo = this.setLine.bind(this, 'lineTwo')
    this.setLineThree = this.setLine.bind(this, 'lineThree')
    this.toggleShowAtribution = this.toggleShowAtribution.bind(this)
    this.setAttribution = this.setAttribution.bind(this)

    this.createHaiku = this.createHaiku.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  componentWillReceiveProps(newProps) {
    const errors = _assign(this.state.errors, this.formatServerErrors(newProps.errors))
    this.setState({ errors })
  }

  formatServerErrors(errors) {
    const formatError = (errors, key) => {
      const keyErrors = errors.find((error) => error.key === key)
      const message = _get(keyErrors, 'messages[0]')

      if (message) {
        switch (message.key) {
          case "useless.haiku.error.tooFewSyllables":
            return "Too few syllables"
          case "useless.haiku.error.tooManySyllables":
            return "Too many syllables"
          default:
            console.error("Unknown server validation message key: " + message.key)
        }
      }
    }

    if (errors) {
      let _errors = {}

      _errors.lineOne = formatError(errors, "line1")
      _errors.lineTwo = formatError(errors, "line2")
      _errors.lineThree = formatError(errors, "line3")

      return _errors
    }
  }

  setLine(lineKey, event) {
    let newState = {}
    newState[lineKey] = event.target.value
    this.setState(newState)
  }

  toggleShowAtribution(event) {
    this.setState({showAttribution: !this.state.showAttribution})
  }

  setAttribution(event) {
    const attribution = event.target.value.trim()

    if (attribution.length > 0) {
      this.setState({ attribution })
    }
  }

  createHaiku() {
    var errors = {}

    if (this.state.lineOne.length === 0) {
      errors.lineOne = 'Required'
    }

    if (this.state.lineTwo.length === 0) {
      errors.lineTwo = 'Required'
    }

    if (this.state.lineThree.length === 0) {
      errors.lineThree = 'Required'
    }

    if (_isEmpty(errors)) {
      this.props.onCreate({
        lines: [this.state.lineOne, this.state.lineTwo, this.state.lineThree],
        attribution: this.state.attribution,
        inResponseToGuid: _get(this.props, 'inResponseTo.guid'),
      })
    } else {
      this.setState({ errors })
    }
  }

  closeModal(event) {
    this.props.onClose()
  }

  render() {
    const inResponseTo = this.props.inResponseTo
    let inResponseToBlockquote, attributionElement

    if (inResponseTo) {
      let attributionFooter

      if (inResponseTo.attribution) {
        attributionFooter = <footer className="blockquote-footer">{inResponseTo.attribution}</footer>
      }

      inResponseToBlockquote = (
        <blockquote className="blockquote in-response-to">
          <p>{inResponseTo.lines[0]}</p>
          <p>{inResponseTo.lines[1]}</p>
          <p>{inResponseTo.lines[2]}</p>
          {attributionFooter}
        </blockquote>
      )
    }

    if (this.state.showAttribution) {
      attributionElement = (
        <FormGroup error={this.state.errors.attribution}>
          <TextInput value={(this.state.attribution || '')} onChange={this.setAttribution} placeholder="Attribution" />
        </FormGroup>
      )
    } else {
      attributionElement = <a href="#" onClick={this.toggleShowAtribution}><small>Add Attribution</small></a>
    }

    return (
      <FormModal
        title={inResponseTo ? `Respond to ${inResponseTo.createdBy.name}` : 'New Haiku'}
        submitText="Add"
        disabled={this.props.disabled}
        onSubmit={this.createHaiku}
        onCancel={this.closeModal}
      >
        {inResponseToBlockquote}

        <FormGroup error={this.state.errors.lineOne}>
          <TextInput value={this.state.lineOne} onChange={this.setLineOne} placeholder="5 Syllables" />
        </FormGroup>

        <FormGroup error={this.state.errors.lineTwo}>
          <TextInput value={this.state.lineTwo} onChange={this.setLineTwo} placeholder="7 Syllables" />
        </FormGroup>

        <FormGroup error={this.state.errors.lineThree}>
          <TextInput value={this.state.lineThree} onChange={this.setLineThree} placeholder="5 Syllables" />
        </FormGroup>

        {attributionElement}
      </FormModal>
    )
  }

}

NewHaiku.propTypes = {
  onCreate: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired,
  inResponseTo: React.PropTypes.object,
}
