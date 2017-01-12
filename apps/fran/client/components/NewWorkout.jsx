import React from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import _isEmpty from 'lodash/isEmpty'
import _uniqueId from 'lodash/uniqueId'

import { Icon } from 'client/components/fontAwesome'
import { FormGroup, TextInput } from 'client/components/bootstrap/form'
import { SecondaryButton } from 'client/components/bootstrap/button'
import { Card, CardBlock } from 'client/components/bootstrap/card'

import { workoutsClient } from 'fran/client/clients'

class NewWorkout extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      errors: {},
      tasks: [],
    }
  }

  addMovement() {
    var errors = {}

    if (_isEmpty(errors)) {
      this.props.onAdd({})
    } else {
      this.setState({ errors })
    }
  }

  addTask() {
    const oldTasks = this.state.tasks
    this.setState({
      tasks: [...oldTasks, { uxId: _uniqueId('task_')}]
    })
  }

  setAttribute(key, event) {
    let newState = {}
    newState[key] = event.target.value
    this.setState(newState)
  }

  render() {
    const taskFields = this.state.tasks.map((task, index) => {
      const options = this.props.movementOptions.map((movementOption) => {
        return { value: movementOption.guid, label: movementOption.name }
      })

      return (
        <Card key={task.uxId}>
          <CardBlock>
            <Select
              placeholder='Select Movement...'
              options={options}
              onInputChange={this.props.onMovementSearch}
              isLoading={this.props.movementOptionsLoading}
            />
          </CardBlock>
        </Card>
      )
    })

    return (
      <div>
        <form onSubmit={this.submit}>
          <FormGroup error={this.state.errors.name}>
            <label htmlFor='newWorkoutName'>Name</label>
            <TextInput
              id='newWorkoutName'
              onChange={this.setAttribute.bind(this, "name")}
              disabled={this.props.disabled}
            />
          </FormGroup>
          {taskFields}
          <SecondaryButton onClick={this.addTask.bind(this)}>
            <Icon name="plus" />
            <span> Add Task</span>
          </SecondaryButton>
        </form>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    disabled: false,
    movementOptions: state.app.newWorkout.movementOptions.records,
    movementOptionsLoading: state.app.newWorkout.movementOptions.isPending,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd: (newWorkout) => {
      dispatch(function (dispatch, getState) {
        console.log("NEW WORKOUT", newWorkout)
      })
    },
    onMovementSearch: (query) => {
      dispatch(function (dispatch, getState) {
        dispatch({ type: 'newWorkout.movementOptions.fetch.send' })

        workoutsClient(getState()).get(`/movements?name=${query}&p.order=name`).then((movements) => {
          dispatch({ type: 'newWorkout.movementOptions.fetch.success', movements })
        })
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewWorkout)
