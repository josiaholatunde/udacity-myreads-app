import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './books/Book'

export class BookSearch extends Component {

    state = {
        searchedBooks: []
    }
    handleChange = ({ target: { value } }) => {
        const AllBooks = this.props.allBooks;
        if (value.trim().length > 0) {
            BooksAPI.search(value.toLowerCase()).then(books => {
                if (books.length > 0) {
                   books.forEach(book => {
                    const foundBook = AllBooks.find(bookInShelf => bookInShelf.id === book.id);
                    console.log('Bako'+foundBook)
                    book.shelf = foundBook ? foundBook.shelf : 'none'
                   })
                   this.setState({ searchedBooks: books })
                } else {
                    this.setState({searchedBooks: []})
                }
            }).catch(err => console.log('An error occurred while searching for books'+ JSON.stringify(err)));

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
                        {searchedBooks && searchedBooks.length > 0 && !isLoading ? (searchedBooks.map(book => (<Book book={book}
                            handleMoveToCategory={this.props.moveToCategory}
                            key={book.id} />))) : (<h4>No books were found</h4>)
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookSearch
