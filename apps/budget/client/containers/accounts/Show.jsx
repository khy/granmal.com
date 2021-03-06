import React from 'react'
import { connect } from 'react-redux'
import _capitalize from 'lodash/capitalize'
import _find from 'lodash/find'
import _range from 'lodash/range'
import Chart from 'chart.js'

import { Table, Tbody } from 'client/components/bootstrap/table'
import { showModal, hideModal } from 'client/actions/modal'
import { formatDate } from 'budget/client/lib/date'
import {
  ActionTypes as AT, addPlannedTxn, addTxn, fetchHistory,
  fetchPlannedTxns, fetchTxns
} from 'budget/client/actions/account'

import AddPlannedTxnModal from 'budget/client/components/modal/AddPlannedTxn'
import AddTxnModal from 'budget/client/components/modal/AddTxn'
import PlannedTxns from 'budget/client/components/card/PlannedTxns'
import Txns from 'budget/client/components/card/Txns'

class Account extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchHistory(this.props.params.accountGuid))
    this.props.dispatch(fetchPlannedTxns(this.props.params.accountGuid, 1))
    this.props.dispatch(fetchTxns(this.props.params.accountGuid, 1))
  }

  get account() {
    return _find(this.props.app.accounts, (account) => {
      return account.guid === this.props.params.accountGuid
    })
  }

  initializeChart(canvas) {
    const getData = (intervalsName) => {
      return this.props.account.history[intervalsName].map( interval => {
        return interval.initialBalance
      })
    }

    if (canvas) {
      new Chart(canvas, {
        type: 'line',
        data: {
          labels: _range(1, 32),
          datasets: [{
            label: 'Last Month',
            data: getData('lastMonthIntervals'),
            fill: false,
            backgroundColor: "rgba(85, 85, 85, 0.2)",
            borderColor: "rgba(85, 85, 85, 0.6)",
          },{
            label: 'This Month',
            data: getData('thisMonthIntervals'),
            fill: false,
            backgroundColor: "rgba(2, 117, 216, 0.2)",
            borderColor: "rgba(2, 117, 216, 0.6)",
          }]
        },
      })
    }
  }

  onNewPlannedTxn() {
    this.props.dispatch(showModal('plannedTxnModal'))
  }

  onNewTxn() {
    this.props.dispatch(showModal('addTxnModal'))
  }

  addPlannedTxn(plannedTxn) {
    this.props.dispatch(addPlannedTxn(plannedTxn))
  }

  addTxn(txn) {
    this.props.dispatch(addTxn(txn))
  }

  onNewPlannedTxnPage(page) {
    this.props.dispatch(fetchPlannedTxns(this.props.params.accountGuid, page))
  }

  onNewTxnPage(page) {
    this.props.dispatch(fetchTxns(this.props.params.accountGuid, page))
  }

  hideModal() {
    this.props.dispatch(hideModal())
  }

  render() {

    let modal

    if (this.props.modal.isVisible) {
      if (this.props.modal.name === 'plannedTxnModal') {
        modal = <AddPlannedTxnModal {...this.props.modal}
          txnTypes={this.props.app.txnTypes}
          accountGuid={this.props.params.accountGuid}
          onClose={this.hideModal.bind(this)}
          onAdd={this.addPlannedTxn.bind(this)}
        />
      } else if (this.props.modal.name === 'addTxnModal') {
        modal = <AddTxnModal {...this.props.modal}
          txnTypes={this.props.app.txnTypes}
          accountGuid={this.props.params.accountGuid}
          onClose={this.hideModal.bind(this)}
          onAdd={this.addTxn.bind(this)}
        />
      }
    }

    return (
      <div>
        <div className="container">
          <h1>{this.account.name}</h1>

          <Table>
            <Tbody>
              <tr>
                <th>Type</th>
                <td>{_capitalize(this.account.accountType)}</td>
              </tr>
              <tr>
                <th>Balance</th>
                <td>{this.account.balance}</td>
              </tr>
              <tr>
                <th>Created By</th>
                <td>{this.account.createdBy.name || this.account.createdBy.handle}</td>
              </tr>
              <tr>
                <th>Created At</th>
                <td>{formatDate(this.account.createdAt)}</td>
              </tr>
            </Tbody>
          </Table>

          <canvas ref={this.initializeChart.bind(this)} className="top-chart"></canvas>

          <PlannedTxns
            plannedTxns={this.props.account.plannedTxns.results}
            linkHeader={this.props.account.plannedTxns.linkHeader}
            txnTypes={this.props.app.txnTypes}
            accounts={this.props.app.accounts}
            onNew={this.onNewPlannedTxn.bind(this)}
            onNewPage={this.onNewPlannedTxnPage.bind(this)}
          />

          <Txns
            txns={this.props.account.txns.results}
            linkHeader={this.props.account.txns.linkHeader}
            txnTypes={this.props.app.txnTypes}
            accounts={this.props.app.accounts}
            onNew={this.onNewTxn.bind(this)}
            onNewPage={this.onNewTxnPage.bind(this)}
          />
        </div>

        {modal}
      </div>
    )
  }

}

function select(state) { return state }
export default connect(select)(Account)
