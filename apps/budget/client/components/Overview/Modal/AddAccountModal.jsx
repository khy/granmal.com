var React = require('react')
var _map = require('lodash/collection/map')

export default class AddAccountModal extends React.Component {

  close(event) {
    event.preventDefault()
    this.props.onClose()
  }

  add(event) {
    event.preventDefault()

    const newAccount = {
      accountType: this.refs.accountTypeGuidSelect.value,
      name: this.refs.nameInput.value,
      initialBalance: parseFloat(this.refs.initialBalanceInput.value),
    }

    this.props.onAdd(newAccount)
  }

  render() {

    const accountTypeOptions = (
      _map(this.props.app.accountTypes, (accountType) => {
        return <option value={accountType.key} key={accountType.key}>{accountType.name}</option>
      })
    )

    return (
      <div>
        <div className="modal-backdrop in" onClick={this.close.bind(this)}></div>
        <div className="modal" style={{display: 'block', paddingLeft: '0px'}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button className="close" type="button" onClick={this.close.bind(this)}>
                  <span>&times;</span>
                </button>
                <h4 className="modal-title">New Account</h4>
              </div>
              <div className="modal-body">
                <form>
                  <fieldset disabled={this.props.isFetching}>
                    <fieldset className="form-group">
                      <label>Account Type</label>
                      <select ref="accountTypeGuidSelect" className="form-control">
                        {accountTypeOptions}
                      </select>
                    </fieldset>

                    <fieldset className="form-group">
                      <label>Name</label>
                      <input ref="nameInput" className="form-control" type="text" />
                    </fieldset>

                    <fieldset className="form-group">
                      <label>Intial Balance</label>
                      <input ref="initialBalanceInput" className="form-control" type="text" />
                    </fieldset>
                  </fieldset>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={this.close.bind(this)}
                  disabled={this.props.isFetching}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.add.bind(this)}
                  disabled={this.props.isFetching}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
