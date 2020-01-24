import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class BookList extends Component {

    shelfTypes = [
        { type: 'currentlyReading', title: 'Currently Reading' },
        { type: 'wantToRead', title: 'Want to Read' },
        { type: 'read', title: 'Read' }
    ]

    render() {

        const { books } = this.props

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {this.shelfTypes.map((shelf, index) => {
                            const booksinShelf = books.filter(book => book.shelf === shelf.type);
                            return <Fragment key={index} >
                                {
                                    booksinShelf.length === 0 ? (
                                        <h4>No Books to show in this category</h4>
                                    ) : (
                                            <div className="bookshelf">
                                                <h2 className="bookshelf-title"> {shelf.title} </h2>
                                                <div className="bookshelf-books">
                                                    <BookShelf books={booksinShelf} moveToCategory={this.props.moveToCategory} />
                                                </div>
                                            </div>
                                        )
                                }
                            </Fragment>

                        })}
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
