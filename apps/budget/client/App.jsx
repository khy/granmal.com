import React from 'react'
import { render } from 'react-dom'
import { IndexRoute, Router, Route } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { connect, Provider } from 'react-redux'
import u from 'updeep'

import { FullPageLogIn } from 'client/components/auth/logIn'
import { showModal, hideModal } from 'budget/client/actions/modal'
import NavMenu from 'budget/client/components/modal/NavMenu'

import reducer from './reducers'
import { ActionTypes, bootstrap } from './actions/app'
import { logIn } from 'client/actions/auth'
import Navbar from './components/Navbar'
import Overview from './components/Overview'
import Account from './components/Account'
import Contexts from './components/Contexts'
import PlannedTxns from './components/PlannedTxns'
import TxnTypes from './components/TxnTypes'
import Prestitial from 'client/components/ads/Prestitial'
import MonthsIndex from './containers/Months/Index'
import MonthsShow from './containers/Months/Show'

require("./app.scss")

const store = applyMiddleware(
  thunkMiddleware//, createLogger()
)(createStore)(reducer, window.__INITIAL_STATE__)

class App extends React.Component {

  componentWillMount() {
    this.bootstrap(this.props)
  }

  componentWillReceiveProps(newProps) {
    this.bootstrap(newProps)
  }

  bootstrap(props) {
    if (
      props.auth.account &&
      !props.app.isBootstrapped &&
      !props.app.isBootstrapping
    ) {
      this.props.dispatch(bootstrap())
    }
  }

  logIn(email, password) {
    event.preventDefault()
    this.props.dispatch(logIn(email, password))
  }

  showMainMenu() {
    this.props.dispatch(showModal("mainMenu"))
  }

  hideMainMenu() {
    this.props.dispatch(hideModal())
  }

  dismissPrestitial() {
    this.props.dispatch({
      type: ActionTypes.DismissPrestitial
    })
  }

  render() {
    const loggedIn = this.props.auth.account

    if (this.props.app.prestitialDismissed) {
      if (loggedIn) {
        let modal

        if (this.props.modal.isVisible && this.props.modal.name === "mainMenu") {
          modal = <NavMenu onClose={this.hideMainMenu.bind(this)} />
        }

        return (
          <div>
            <Navbar onMenuClick={this.showMainMenu.bind(this)} />
            {this.props.children}
            {modal}
          </div>
        )
      } else {
        return (
          <div>
            <Navbar />
            <FullPageLogIn
              message="You must log in to use Budget."
              onLogIn={this.logIn.bind(this)}
            />
          </div>
        )
      }
    } else {
      return <Prestitial
        appIsReady={!loggedIn || this.props.app.isBootstrapped}
        onContinue={this.dismissPrestitial.bind(this)}
      />
    }
  }

}

function select(state) { return {
  dispatch: state.dispatch,
  auth: state.auth,
  app: state.app,
  modal: state.modal,
}}

const ConnectedApp = connect(select)(App)

render(
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <Route path="/budget" component={ConnectedApp}>
        <IndexRoute component={Overview} />
        <Route path="account/:accountGuid" component={Account} />
        <Route path="contexts" component={Contexts} />
        <Route path="months" component={MonthsIndex} />
        <Route path="months/:year/:month" component={MonthsShow} />
        <Route path="plannedTransactions" component={PlannedTxns} />
        <Route path="transactionTypes" component={TxnTypes} />
      </Route>
    </Router>
  </Provider>,
  document.querySelector('#app')
)
