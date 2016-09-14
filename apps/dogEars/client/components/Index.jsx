import React from 'react'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'
import _chunk from 'lodash/chunk'

import { fetchBooksForIndex } from 'dogEars/client/actions'
import { Card, CardBlock } from 'client/components/bootstrap/card'

class Index extends React.Component {

  componentWillMount() {
    this.props.fetchBooks()
  }

  componentWillReceiveProps(newProps) {
    newProps.fetchBooks()
  }

  showBook(title, event) {
    event.preventDefault()
    browserHistory.push(`/dogEars/books/${title}`)
  }

  render() {
    const kards = this.props.books.records.map((book) => {
      return (
        <Card key={book.title} className="book-card" onClick={this.showBook.bind(this, book.title)}>
          <img className="card-img-top img-fluid" src={book.largeImageUrl} />
          <CardBlock>
            <h4 className="card-title">{book.title}</h4>
            <p className="card-subtitle text-muted">{book.authors[0]}</p>
          </CardBlock>
        </Card>
      )
    })

    return (
      <div className="card-columns">{kards}</div>
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
