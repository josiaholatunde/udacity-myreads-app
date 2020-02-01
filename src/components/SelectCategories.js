import React from 'react'

const SelectCategories = ({ moveToCategory, shelf }) => {
    if (!shelf) {
        shelf = 'none'
    }

    const availableCategories = [
        {
            displayName: 'Currently Reading',
            value: 'currentlyReading'
        },
        {
            displayName: 'Want to Read',
            value: 'wantToRead'
        },
        {
            displayName: 'Read',
            value: 'read'
        },
        {
            displayName: 'None',
            value: 'none'
        },
    ]
    return (
        <select name='category' value={shelf} onChange={({ target: { value } }) => moveToCategory(value)}>
            <option value="move" disabled>Move to...</option>
            {availableCategories.map(({ displayName, value }, index) => (<option key={index} value={value}>{displayName}</option>
            ))}

        </select>
    )
}

export default SelectCategories
