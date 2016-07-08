import React from 'react'
import { connect } from 'react-redux'

import { fetchIndexMain } from 'bookClub/client/actions'
import { Card, CardBlock } from 'client/components/bootstrap/card'

class Index extends React.Component {

  componentWillMount() {
    this.props.onFetchMain()
  }

  componentWillReceiveProps(newProps) {
    newProps.onFetchMain()
  }

  render() {

    const cards = this.props.main.notes.map((note) => {
      return <Card key={note.guid}>
        <CardBlock>
          {note.content}
        </CardBlock>
      </Card>
    })

    return (
      <div>{cards}</div>
    )
  }

}

const mapStateToProps = (state) => {
  return state.app.index
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchMain: () => { dispatch(fetchIndexMain()) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
