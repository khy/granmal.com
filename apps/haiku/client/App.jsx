import React from 'react'
import { render } from 'react-dom'
import { browserHistory, IndexRoute, Router, Route } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { connect, Provider } from 'react-redux'
import _get from 'lodash/get'

import { showModal, hideModal } from 'client/actions/modal'

import reducer from 'haiku/client/reducers'
import Navbar from 'haiku/client/components/Navbar'
import Index from 'haiku/client/containers/Index'
import NewHaiku from 'haiku/client/components/NewHaiku'
import { submitNewHaikuModal } from 'haiku/client/actions'

require("./app.scss")

const store = applyMiddleware(
  thunkMiddleware//, createLogger()
)(createStore)(reducer, window.__INITIAL_STATE__)

class App extends React.Component {

  constructor(props) {
    super(props)

    this.createHaiku = this.createHaiku.bind(this)
    this.showNewHaikuModal = this.showNewHaikuModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
  }

  showNewHaikuModal() {
    this.props.dispatch(showModal('NewHaiku'))
  }

  createHaiku(newHaiku) {
    this.props.dispatch(submitNewHaikuModal(newHaiku))
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
            disabled={!this.props.modal.isEnabled}
            errors={_get(this.props.modal, 'data.errors', {})}
          />
        )
      }
    }

    return <div>
      <Navbar
        onButtonClick={this.showNewHaikuModal}
        buttonContent={'\u002B'}
      />

      {this.props.children}

      {modal}
    </div>
  }

}

const ConnectedApp = connect(state => state)(App)

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/haiku" component={ConnectedApp}>
        <IndexRoute component={Index} />
      </Route>
    </Router>
  </Provider>,
  document.querySelector('#app')
)
