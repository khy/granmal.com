import React from 'react'
import Select from 'react-select'

import { Icon } from 'client/components/fontAwesome'
import { FormModal } from 'client/components/bootstrap/modal'
import { FormGroup, TextInput } from 'client/components/bootstrap/form'
import { SecondaryButton } from 'client/components/bootstrap/button'

export default class NewMovement extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      variables: []
    }
  }

  addMovement() {
    this.props.onAdd(this.state)
  }

  addVariable() {
    const oldVariables = this.state.variables
    this.setState({
      variables: [...oldVariables, {}]
    })
  }

  setAttribute(key, event) {
    let newState = {}
    newState[key] = event.target.value
    this.setState(newState)
  }

  setVariableName(index, event) {
    this.setVariableAttribute(index, 'name', event.target.value)
  }

  setVariableDimension(index, option) {
    this.setVariableAttribute(index, 'dimension', option.value)
  }

  setVariableAttribute(index, key, value) {
    this.setState((prevState) => {
      let variables = prevState.variables.slice()
      let variable = variables[index] || {}
      variable[key] = value
      variables[index] = variable
      return variables
    })
  }

  render() {
    const variableFields = this.state.variables.map((variable, index) => {
      return (
        <div className='row' key={`variable${index}`}>
          <div className='col-sm-6'>
            <FormGroup>
              <TextInput
                onChange={this.setVariableName.bind(this, index)}
                disabled={this.props.disabled}
                placeholder="Variable Name"
              />
            </FormGroup>
          </div>
          <div className='col-sm-6'>
            <FormGroup>
              <Select
                placeholder='Dimension'
                value={variable.dimension || ''}
                onChange={this.setVariableDimension.bind(this, index)}
                options={this.props.dimensionOptions}
              />
            </FormGroup>
          </div>
        </div>
      )
      return <div>Variable!</div>
    })

    return (
      <FormModal
        title='New Movement'
        submitText='Add'
        disabled={this.props.disabled}
        onSubmit={this.addMovement.bind(this)}
        onCancel={this.props.onClose}
      >
        <FormGroup>
          <label htmlFor='newMovementName'>Name</label>
          <TextInput
            id='newMovementName'
            onChange={this.setAttribute.bind(this, "name")}
            disabled={this.props.disabled}
          />
        </FormGroup>
        {variableFields}
        <SecondaryButton onClick={this.addVariable.bind(this)}>
          <Icon name="plus" />
          <span> Add Variable</span>
        </SecondaryButton>
      </FormModal>
    )
  }

}

NewMovement.propTypes = {
  dimensionOptions: React.PropTypes.arrayOf(React.PropTypes.object),
  disabled: React.PropTypes.bool,
  onAdd: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired,
}

NewMovement.defaultProps = {
  dimensionOptions: [
    { value: 'weight', label: 'Weight' },
  ],
  disabled: false,
}
