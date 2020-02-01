import React, { Component } from 'react'
import Book from './Book'

export class BookShelf extends Component {
  render() {

    const { books } = this.props
    return (
      <ol className="books-grid">
        {    
            books.map((book) => 
            (<Book book={book} key={book.id} handleMoveToCategory={(bookToMove) => this.props.moveToCategory(bookToMove)} />
            ))
        }
      </ol>

    )
  }
}

export default BookShelf
