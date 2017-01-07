import React from 'react'
import Select from 'react-select'
import _isEmpty from 'lodash/isEmpty'

import { Icon } from 'client/components/fontAwesome'
import { FormModal } from 'client/components/bootstrap/modal'
import { FormGroup, TextInput } from 'client/components/bootstrap/form'
import { SecondaryButton } from 'client/components/bootstrap/button'

export default class NewMovement extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      errors: {},
      variables: [],
    }
  }

  addMovement() {
    var errors = {}

    if (_isEmpty(this.state.name)) {
      errors.name = 'Cannot be blank'
    }

    this.state.variables.forEach((variable, index) => {
      var varErrs = {}

      if (_isEmpty(variable.name)) {
        varErrs.name = 'Cannot be blank'
      }

      if (_isEmpty(variable.dimension)) {
        varErrs.dimension = 'Must be selected'
      }

      if (!_isEmpty(varErrs)) {
        if (!errors.variables) {
          errors.variables = []
        }

        errors.variables[index] = varErrs
      }
    })

    if (_isEmpty(errors)) {
      this.props.onAdd(this.state)
    } else {
      this.setState({ errors })
    }
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
      const errors = this.state.errors.variables ? this.state.errors.variables[index] || {} : {}

      return (
        <div className='row' key={`variable${index}`}>
          <div className='col-sm-6'>
            <FormGroup error={errors.name}>
              <TextInput
                onChange={this.setVariableName.bind(this, index)}
                disabled={this.props.disabled}
                placeholder="Variable Name"
              />
            </FormGroup>
          </div>
          <div className='col-sm-6'>
            <FormGroup error={errors.dimension}>
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
    })

    return (
      <FormModal
        title='New Movement'
        submitText='Add'
        disabled={this.props.disabled}
        onSubmit={this.addMovement.bind(this)}
        onCancel={this.props.onClose}
      >
        <FormGroup error={this.state.errors.name}>
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
