import React from 'react'

const SelectCategories = ({ moveToCategory, shelf }) => {
    if (!shelf) {
        shelf = 'none'
    }
    return (
        <select name='category' value={shelf} onChange={({ target: { value }}) => moveToCategory(value) }>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
        </select>
    )
}

export default SelectCategories
