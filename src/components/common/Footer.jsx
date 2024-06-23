import React from 'react'

const FooterComponent = () => {
    return (
        <div>
            <footer className='footer'>
                <span>Kacper Karabinowski &copy; {new Date().getFullYear()} </span>
            </footer>
        </div>
    )
}

export default FooterComponent