import React from 'react'
import { connect } from 'react-redux'

import { DummyCard } from 'client/components/bootstrap/dummyCard'
import { fetchBookForShowBook } from 'bookClub/client/actions'
import { Card, CardBlock } from 'client/components/bootstrap/card'

class ShowBook extends React.Component {

  componentWillMount() {
    this.props.clearBook()
    this.props.fetchBook(this.props.params.guid)
  }

  componentWillReceiveProps(newProps) {
    newProps.fetchBook(newProps.params.guid)
  }

  render() {
    const bookMeta = this.props.book
    const book = bookMeta.record
    let card

    if (book) {
      card = <Card key={book.guid}>
        <CardBlock>
          <h4 className="card-title">{book.title}</h4>
        </CardBlock>
      </Card>
    } else {
      card = <DummyCard />
    }

    return card
  }

}

const mapStateToProps = (state) => {
  return state.app.showBook
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearBook: () => { dispatch({ type: 'showBook.book.clear' }) },
    fetchBook: (guid) => {
      dispatch(fetchBookForShowBook(guid))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowBook)
