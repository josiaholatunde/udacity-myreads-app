import React from 'react'
import loader from '../icons/loader.gif'
const Spinner = () => {
    return (
        <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <img src={loader} alt='Loader' style={{ height: '100vh', width: '100%', objectFit: 'contain' }} />
        </div>
    )
}

export default Spinner
