import React from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { Map, List } from 'immutable'
import _isEmpty from 'lodash/isEmpty'
import _uniqueId from 'lodash/uniqueId'

import { showAdHocAlert } from 'client/actions/alert'
import { Icon } from 'client/components/fontAwesome'
import { AlertContext } from 'client/components/bootstrap/alert'
import { FormGroup, TextInput } from 'client/components/bootstrap/form'
import { PrimaryButton, SecondaryButton } from 'client/components/bootstrap/button'
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

  addMovement(event) {
    event.preventDefault()

    var errors = {}

    if (_isEmpty(errors)) {
      this.props.onAdd(this.state.workout.toJS())
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
    const value = event.target.value
    this.setWorkoutState((workout) => {
      return workout.set(key, value)
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
        <form onSubmit={this.addMovement.bind(this)}>
          <FormGroup error={this.state.errors.name}>
            <label htmlFor='newWorkoutName'>Name</label>
            <TextInput
              id='newWorkoutName'
              onChange={this.setAttribute.bind(this, "name")}
              disabled={this.props.disabled}
            />
          </FormGroup>
          <SecondaryButton onClick={this.addTask.bind(this)}>
            <Icon name="plus" />
            <span> Add Task</span>
          </SecondaryButton>
          {taskFields}
          <PrimaryButton
            type="submit"
            onClick={this.addMovement.bind(this)}
            disabled={this.props.disabled}
          >
            Submit
          </PrimaryButton>
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
        dispatch({ type: 'newWorkout.add.send' })

        workoutsClient(getState()).post('/workouts', newWorkout, true).then((response) => {
          if (response.ok) {
            response.json().then((workout) => {
              dispatch({ type: 'newWorkout.add.success', workout })
              dispatch(showNamedAlert('workoutAdded', { workout }))
            })
          } else {
            response.json().then((errors) => {
              dispatch(showAdHocAlert(AlertContext.Danger, `Adding new workout failed: ${JSON.stringify(errors)}`))
            })
          }
        })
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
