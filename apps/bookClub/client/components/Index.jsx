import React from 'react'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'
import _chunk from 'lodash/chunk'

import { fetchBooksForIndex } from 'bookClub/client/actions'
import { Card, CardBlock } from 'client/components/bootstrap/card'

class Index extends React.Component {

  componentWillMount() {
    this.props.fetchBooks()
  }

  componentWillReceiveProps(newProps) {
    newProps.fetchBooks()
  }

  showBook(guid, event) {
    event.preventDefault()
    browserHistory.push(`/book-club/books/${guid}`)
  }

  render() {
    const decks = _chunk(this.props.books.records, 3).map((chunk) => {
      const cards = chunk.map((book) => {
        return (
          <Card key={book.title} className="book-card" onClick={this.showBook.bind(this, book.guid)}>
            <img className="card-img-top img-fluid" src={book.largeImageUrl} />
            <CardBlock>
              <h4 className="card-title">{book.title}</h4>
              <h6 className="card-subtitle text-muted">{book.authors[0]}</h6>
            </CardBlock>
          </Card>
        )
      })

      const key = chunk.map((book) => book.guid).join('-')

      return <div className="card-deck" key={key}>{cards}</div>
    })

    return (
      <div>{decks}</div>
    )
  }

}

const mapStateToProps = (state) => {
  return state.app.index
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBooks: () => { dispatch(fetchBooksForIndex()) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
