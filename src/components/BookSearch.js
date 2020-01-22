import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './books/Book'
import Spinner from './Spinner'

export class BookSearch extends Component {

    state = {
        searchedBooks: [],
        isLoading: false
    }
    handleChange = ({ target: { value } }) => {
        const AllBooks = this.props.allBooks;
        if (value.trim().length > 0) {
            this.setState({ isLoading: true })
            BooksAPI.search(value.toLowerCase()).then(books => {
                if (books.length > 0) {
                   books.forEach(book => {
                    const foundBook = AllBooks.find(bookInShelf => bookInShelf.id === book.id);
                    book.shelf = foundBook ? foundBook.shelf : 'none'
                   })
                   this.setState({ searchedBooks: books })
                } else {
                    this.setState({searchedBooks: []})
                }
                this.setState({ isLoading: false })
            }).catch(err => {
                this.setState({ isLoading: false })
                console.log('An error occurred while searching for books'+ JSON.stringify(err))
            });

        }
    }


    render() {
        const { searchedBooks, isLoading } = this.state
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input type="text" placeholder="Search by title or author" onChange={this.handleChange} />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            isLoading ? (<Spinner />) : (
                                searchedBooks && searchedBooks.length > 0  ? (searchedBooks.map(book => (<Book book={book}
                                    handleMoveToCategory={this.props.moveToCategory}
                                    key={book.id} />))) : (<h4>No books were found</h4>)
                            )
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookSearch
