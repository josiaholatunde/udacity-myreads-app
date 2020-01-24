import React, { Component } from 'react'
import Book from './Book'

export class BookShelf extends Component {
  render() {

    const { books } = this.props
    console.log('Yo'+ books.length)
    return (
      <ol className="books-grid">
        {    
            books.map((currentBook) => 
            (<Book book={currentBook} key={currentBook.id} handleMoveToCategory={(bookToMove) => this.props.moveToCategory(bookToMove)} />
            ))
        }
      </ol>

    )
  }
}

export default BookShelf
