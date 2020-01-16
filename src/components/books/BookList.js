import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

class BookList extends Component {

    getCategories(books) {
        return {
            read: books.filter(book => book.shelf === 'read'),
            wantToRead: books.filter(book => book.shelf === 'wantToRead'),
            currentlyReading: books.filter(book => book.shelf === 'currentlyReading')
        }
    }

    render() {

        const { books, isLoading } = this.props
        const { currentlyReading, wantToRead, read } = this.getCategories(books);

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {currentlyReading.length > 0 && !isLoading ? (
                                        currentlyReading.map(book => (<Book book={book} key={book.title}
                                            handleMoveToCategory={(bookToMove) => this.props.moveToCategory(bookToMove)} />))
                                    ) : (<h4> No books in this category </h4>)}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {wantToRead.length > 0 && !isLoading ? (
                                        wantToRead.map(book => (<Book book={book} key={book.title} handleMoveToCategory={(bookToMove) => this.props.moveToCategory(bookToMove)} />))
                                    ) : (<h4> No books in this category </h4>)}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {read.length > 0 && !isLoading ? (
                                        read.map(book => (<Book book={book} key={book.title} handleMoveToCategory={(bookToMove) => this.props.moveToCategory(bookToMove)} />))
                                    ) : (<h4> No books in this category </h4>)}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link tag='button' to='/search'>Add a book</Link>
                </div>
            </div>
        )
    }
}

export default BookList
