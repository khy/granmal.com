import React from 'react'
import { connect } from 'react-redux'

import NewHaiku from '../components/NewHaiku'

class Index extends React.Component {

  render() {
    const modal = <NewHaiku />

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
