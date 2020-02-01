import React from 'react'
import loader from '../icons/loader.gif'
const Spinner = () => {
    return (
        <div style={loaderStyles}>
            <img src={loader} alt='Loader' style={{ height: '100vh', width: '100%', objectFit: 'contain' }} />
        </div>
    )
}

const loaderStyles = { display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }

export default Spinner
