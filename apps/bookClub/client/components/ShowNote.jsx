import React from 'react'
import { connect } from 'react-redux'
import Remarkable from 'remarkable'

import { Card, CardBlock } from 'client/components/bootstrap/card'

const md = new Remarkable

class ShowNote extends React.Component {

  render() {
    return (
      <Card>
        <CardBlock>
          <h1>HI</h1>
        </CardBlock>
      </Card>
    )
  }

}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowNote)
