import React from 'react'
import { connect } from 'react-redux'

import NewHaiku from '../components/NewHaiku'

class Index extends React.Component {

  constructor(props) {
    super(props)
    this.createHaiku = this.createHaiku.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  createHaiku(newHaiku) {
    console.log(newHaiku)
  }

  closeModal() {
    console.log("closeModal")
  }

  render() {
    const modal = (
      <NewHaiku
        onCreate={this.createHaiku}
        onClose={this.closeModal}
      />
    )

    return (
      <div>
        <div className="container">
          <h2>Index</h2>
        </div>

        {modal}
      </div>
    )
  }

}

export default connect(state => state)(Index)
