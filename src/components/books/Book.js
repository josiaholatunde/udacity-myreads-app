import React, { Fragment } from 'react'
import SelectCategories from '../SelectCategories'

const Book = ({ handleMoveToCategory, book }) => {

    const { imageLinks: { thumbnail }, title, authors } = book
    
    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url('${thumbnail}}')` }}></div>
                    <div className="book-shelf-changer">
                        <SelectCategories moveToCategory={(category) => {
                            handleMoveToCategory({ ...book, categoryToMoveTo: category })
                        }} />
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">
                    {(authors && authors.length) > 0 && authors.map((author, index) => (<Fragment key={index}>
                        <span>{author}</span> <br/>
                    </Fragment>))}
                </div>
            </div>
        </li>
    )
}

export default Book
