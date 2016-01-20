var React = require('react')
import { connect } from 'react-redux'
var moment = require('moment')

import {
  ActionTypes, UserActionTypes, addAccount, addTxnType, addTransfer,
  confirmPlannedTxn, deletePlannedTxn, fetchAccounts, fetchAccountTypes,
  fetchPlannedTxnsCard, fetchProjectionsCard, fetchTxnTypes
} from 'budget/client/actions/overview'

var ProjectionsCard = require('./Card/ProjectionsCard')
var PlannedTxnsCard = require('./Card/PlannedTxnsCard')

import Navbar from '../Navbar'
import NavMenuModal from './Modal/NavMenu'
var AddAccountModal = require('./Modal/AddAccountModal')
var ResolvePlannedTxnModal = require('./Modal/ResolvePlannedTxnModal')
var AddTransferModal = require('./Modal/AddTransferModal')
import AddTxnTypeModal from './Modal/AddTxnTypeModal'

import { shortenGuid } from 'budget/client/lib/guid'

class Overview extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      menuToggled: false,
    }
  }

  componentWillMount() {
    this.props.dispatch(fetchProjectionsCard())
    this.props.dispatch(fetchPlannedTxnsCard())
  }

  changeProjectionDate(date) {
    this.props.dispatch(fetchProjectionsCard(date))
  }

  showAddAccountModal() {
    this.props.dispatch({ type: ActionTypes.ShowAddAccountModal })
  }

  addAccount(newAccount) {
    this.props.dispatch(addAccount(newAccount))
  }

  showResolvePlannedTxnModal(plannedTxn) {
    this.props.dispatch({
      type: ActionTypes.ShowResolvePlannedTxnModal,
      plannedTxn
    })
  }

  onConfirmPlannedTxn(newTxn) {
    this.props.dispatch(confirmPlannedTxn(newTxn))
  }

  onDeletePlannedTxn(guid) {
    this.props.dispatch(deletePlannedTxn(guid))
  }

  showNewTxnTypeModal() {
    this.props.dispatch({ type: ActionTypes.ShowAddTxnTypeModal })
  }

  addTxnType(newTxnType) {
    this.props.dispatch(addTxnType(newTxnType))
  }

  showAddTransferModal() {
    this.props.dispatch({ type: ActionTypes.ShowAddTransferModal })
  }

  addTransfer(newTransfer) {
    this.props.dispatch(addTransfer(newTransfer))
  }

  showMenu() {
    this.setState({menuToggled: true})
  }

  hideMenu() {
    this.setState({menuToggled: false})
  }

  hideModal() {
    this.props.dispatch({ type: ActionTypes.HideModal })
  }

  render() {
    let alert

    if (this.props.overview.lastUserAction) {
      if (this.props.overview.lastUserAction.type === UserActionTypes.AddTxnType) {
        alert = (
          <div className="alert alert-success" role="alert">
            Added transaction type <strong>{this.props.overview.lastUserAction.name}</strong>
          </div>
        )
      } else if (this.props.overview.lastUserAction.type === UserActionTypes.AddTransfer) {
        alert = (
          <div className="alert alert-success" role="alert">
            Added transfer <strong>{shortenGuid(this.props.overview.lastUserAction.guid)}</strong>
          </div>
        )
      }
    }

    let modal

    if (this.state.menuToggled) {
      modal = <NavMenuModal onClose={this.hideMenu.bind(this)} />
    } else if (this.props.overview.activeModal === 'addAccountModal') {
      modal = <AddAccountModal {...this.props.overview.addAccountModal}
        accountTypes={this.props.app.accountTypes}
        onClose={this.hideModal.bind(this)}
        onAdd={this.addAccount.bind(this)}
      />
    } else if (this.props.overview.activeModal === 'resolvePlannedTxnModal') {
      modal = <ResolvePlannedTxnModal {...this.props.overview.resolvePlannedTxnModal}
        txnTypes={this.props.app.txnTypes}
        accounts={this.props.app.accounts}
        onClose={this.hideModal.bind(this)}
        onConfirm={this.onConfirmPlannedTxn.bind(this)}
        onDelete={this.onDeletePlannedTxn.bind(this)}
      />
    } else if (this.props.overview.activeModal === 'addTransferModal') {
      modal = <AddTransferModal {...this.props.overview.AddTransferModal}
        accounts={this.props.app.accounts}
        onClose={this.hideModal.bind(this)}
        onAdd={this.addTransfer.bind(this)}
      />
    } else if (this.props.overview.activeModal === 'addTxnTypeModal') {
      modal = <AddTxnTypeModal {...this.props.overview.addTxnTypeModal}
        txnTypes={this.props.app.txnTypes}
        onClose={this.hideModal.bind(this)}
        onAdd={this.addTxnType.bind(this)}
      />
    }

    return (
      <div>
        <Navbar onMenuClick={this.showMenu.bind(this)} />

        <div className="container">
          {alert}

          <ProjectionsCard {...this.props.overview.projectionsCard}
            lastUserAction={this.props.overview.lastUserAction}
            onDateChange={this.changeProjectionDate.bind(this)}
            onNewAccount={this.showAddAccountModal.bind(this)}
            onNewTransfer={this.showAddTransferModal.bind(this)}
          />
          <PlannedTxnsCard {...this.props.overview.plannedTxnsCard}
            app={this.props.app}
            lastUserAction={this.props.overview.lastUserAction}
            onResolve={this.showResolvePlannedTxnModal.bind(this)}
          />
        </div>

        {modal}
      </div>
    )
  }

}

function select(state) { return state }
export default connect(select)(Overview)
