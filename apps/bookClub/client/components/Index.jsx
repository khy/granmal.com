import React from 'react'
import { connect } from 'react-redux'
import Remarkable from 'remarkable'

import { fetchIndexMain } from 'bookClub/client/actions'
import { Card, CardBlock } from 'client/components/bootstrap/card'

const md = new Remarkable

class Index extends React.Component {

  componentWillMount() {
    this.props.onFetchMain()
  }

  componentWillReceiveProps(newProps) {
    newProps.onFetchMain()
  }

  render() {

    const cards = this.props.main.notes.map((note) => {
      const markup = { __html: md.render(note.content) }

      return <Card key={note.guid} className="note-card">
        <CardBlock>
          <span dangerouslySetInnerHTML={markup} />
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
