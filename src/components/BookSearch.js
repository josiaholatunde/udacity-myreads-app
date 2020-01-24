import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './books/Book'
import Spinner from './Spinner'

export class BookSearch extends Component {

    state = {
        query: '',
        searchedBooks: [],
        isLoading: false,
        error: {
            blankQuery: '',
            serverError: ''
        }
    }
    handleChange = ({ target: { value } }) => {
        const query = value;
        this.setState({ query })

        const AllBooks = this.props.allBooks;
        if (query.trim().length > 0) {
            this.setState({
                isLoading: true,
                error: {
                    blankQuery: '',
                    serverError: ''
                }
            })
            BooksAPI.search(query.toLowerCase()).then(books => {
                if (books.length > 0) {
                    books.forEach(book => {
                        const foundBook = AllBooks.find(bookInShelf => bookInShelf.id === book.id);
                        book.shelf = foundBook ? foundBook.shelf : 'none'
                    })
                    this.setState({
                        searchedBooks: books,
                        error: {
                            blankQuery: '',
                            serverError: ''
                        }
                    })
                } else {
                    this.setState({
                        searchedBooks: [], error: {
                            blankQuery: '',
                            serverError: ''
                        }
                    })
                }
                this.setState({ isLoading: false })
            }).catch(err => {
                this.setState({
                    isLoading: false,
                    error: {
                        serverError: 'An error occurred while searching for books',
                        blankQuery: ''
                    }
                })
                console.log('An error occurred while searching for books' + JSON.stringify(err))
            });

        } else {
            
            this.setState({
                searchedBooks: [],
                isLoading: false,
                error: {
                    blankQuery: 'Kindly enter a category to search for a book',
                    serverError: ''
                }
            })
        }
    }


    render() {
        const { searchedBooks, isLoading, query, error: { blankQuery, serverError } } = this.state
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
                        <input type="text" value={query} placeholder="Search by title or author" onChange={this.handleChange} />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            blankQuery || serverError ? (<h4> {blankQuery || serverError}  </h4>) : (
                                isLoading ? (<Spinner />) : (
                                    searchedBooks && searchedBooks.length > 0 ? (searchedBooks.map(book => (<Book book={book}
                                        handleMoveToCategory={this.props.moveToCategory}
                                        key={book.id} />))) : (<h4>No books were found</h4>
                                        )
                                )
                            )
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookSearch
