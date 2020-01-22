import React, { Component } from 'react'
import Book from './Book'

export class BookShelf extends Component {
    render() {

        const { books: { shelf, imageLinks: { thumbnail }, title, authors } } = this.props
        return (
            <div className="bookshelf">
            <h2 className="bookshelf-title"> { shelf } </h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                <Book />
                </ol>
              </div>
            </div>
        )
    }
}

export default BookShelf
