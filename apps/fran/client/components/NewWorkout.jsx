import React from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { Map, List } from 'immutable'
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
      workout: Map({
        tasks: List(),
      }),
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
    this.setWorkoutState((workout) => {
      return workout.update('tasks', (tasks) => {
        return tasks.push(Map({ uxId: _uniqueId('task_') }))
      })
    })
  }

  searchForMovement(index, query) {
    this.setState({ movementResultsTaskIndex: index })
    this.props.onMovementSearch(query)
  }

  setAttribute(key, event) {
    this.setWorkoutState((workout) => {
      return workout.set(key, event.target.value)
    })
  }

  setTaskMovement(index, option) {
    this.setTaskAttribute(index, 'movementGuid', option.value)
  }

  setTaskAttribute(index, key, value) {
    this.setWorkoutState((workout) => {
      return workout.update('tasks', (tasks) => {
        return tasks.update(index, task => task.set(key, value) )
      })
    })
  }

  setWorkoutState(fn) {
    return this.setState(({workout}) => ({
      workout: fn(workout)
    }))
  }

  render() {
    const taskFields = this.state.workout.get('tasks').map((task, index) => {

      let options = []
      if (this.state.movementResultsTaskIndex === index) {
        options = this.props.movementOptions.map((movementOption) => {
          return { value: movementOption.guid, label: movementOption.name }
        })
      }

      return (
        <Card key={task.get('uxId')}>
          <CardBlock>
            <Select
              isLoading={this.props.movementOptionsLoading}
              options={options}
              onChange={this.setTaskMovement.bind(this, index)}
              onInputChange={this.searchForMovement.bind(this, index)}
              placeholder='Select Movement...'
              value={task.get('movementGuid')}
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
  const movementOptions = state.app.getIn(['newWorkout', 'movementOptions'])

  return {
    disabled: false,
    movementOptions: movementOptions.get('records'),
    movementOptionsLoading: movementOptions.get('isPending'),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd: (newWorkout) => {
      dispatch(function (dispatch, getState) {
        console.log("NEW WORKOUT", newWorkout)
      })
    },
    onMovementSearch: (taskIndex, query) => {
      dispatch(function (dispatch, getState) {
        dispatch({ type: 'newWorkout.movementOptions.fetch.send', taskIndex })

        workoutsClient(getState()).get(`/movements?name=${query}&p.order=name`).then((movements) => {
          dispatch({ type: 'newWorkout.movementOptions.fetch.success', taskIndex, movements })
        })
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewWorkout)
