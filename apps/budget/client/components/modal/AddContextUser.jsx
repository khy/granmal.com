import React from 'react'
import Select from 'react-select'
import _map from 'lodash/map'

import { PrimaryButton, SecondaryButton } from 'client/components/bootstrap/button'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'client/components/bootstrap/modal'

export default class AddContextUser extends React.Component {

  get contextGuid() {
    return this.props.data.contextGuid
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  close(event) {
    event.preventDefault()
    this.props.onClose()
  }

  add(event) {
    event.preventDefault()
    this.props.onAdd(this.contextGuid, this.state.selectedUserOption.value)
  }

  getUserOptions(input, callback) {
    return this.props.client.get(`/accounts?handle=${input}`).then((accounts) => {
      const options = _map(accounts, (account) => {
        return {
          value: account.guid,
          label: `${account.user.handle} (${account.user.name})`,
        }
      })

      return { options }
    })
  }

  selectUserGuid(option) {
    this.setState({selectedUserOption: option})
  }

  render() {
    return (
      <Modal>
        <ModalHeader>Add User</ModalHeader>
        <form onSubmit={this.add.bind(this)}>
          <ModalBody>
            <fieldset disabled={this.props.modalIsPosting}>
              <fieldset className="form-group">
                <Select.Async
                  value={this.state.selectedUserOption}
                  loadOptions={this.getUserOptions.bind(this)}
                  onChange={this.selectUserGuid.bind(this)}
                />
              </fieldset>
            </fieldset>
          </ModalBody>
          <ModalFooter>
            <SecondaryButton
              onClick={this.close.bind(this)}
              disabled={this.props.modalIsPosting}
            >
              Close
            </SecondaryButton>

            <PrimaryButton
              type="submit"
              onClick={this.add.bind(this)}
              disabled={this.props.modalIsPosting}
            >
              Add
            </PrimaryButton>
          </ModalFooter>
        </form>
      </Modal>
    )
  }

}
