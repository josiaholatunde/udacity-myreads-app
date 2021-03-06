
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookSearch from './components/BookSearch'
import BookList from './components/books/BookList'
import Spinner from './components/Spinner'


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    isLoading: false
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    this.getAllBooks()
  }

  getAllBooks = () => {
    BooksAPI.getAll().then(books => {
      this.setState({ books, isLoading: false })
    }).catch(err => {
      console.log('An error occurred while fetching books')
      this.setState({ isLoading: false })
    })
  }

  moveToCategory = (bookToUpdate) => {
    BooksAPI.update(bookToUpdate, bookToUpdate.categoryToMoveTo).then(() => {
      this.getAllBooks();
    });
  }

  render() {

    const { books, isLoading } = this.state;

    return (
      <div className="app">
        <Router>
          <Switch>
            <Route exact path='/search' render={(props) => (
              <BookSearch allBooks={books} {...props} moveToCategory={this.moveToCategory} />
            )} />
            <Route path='/' render={(props) => isLoading ? (
              <Spinner />
            ): (<BookList {...props} books={books} moveToCategory={this.moveToCategory} />)} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default BooksApp
