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
    this.props.onMovementSearch(index, query)
  }

  setAttribute(key, event) {
    this.setWorkoutState((workout) => {
      return workout.set(key, event.target.value)
    })
  }

  setTaskMovement(index, option) {
    const value = option ? option.value : undefined
    this.setTaskAttribute(index, 'movementGuid', value)
  }

  setTaskAttribute(index, key, value) {
    this.setWorkoutState((workout) => {
      return workout.updateIn(['tasks', index], task => {
        return value ? task.set(key, value) : task.delete(key)
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

      let isLoading = false
      let options = []

      let rawOptions = this.props.movementOptions.get(index)
      if (rawOptions) {
        isLoading = rawOptions.get('isPending', false)
        options = rawOptions.get('records', List()).map((movementOption) => {
          return { value: movementOption.get('guid'), label: movementOption.get('name') }
        }).toJS()
      }

      return (
        <Card key={task.get('uxId')}>
          <CardBlock>
            <Select
              isLoading={isLoading}
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
  return {
    disabled: false,
    movementOptions: state.app.getIn(['newWorkout', 'movementOptions']),
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
