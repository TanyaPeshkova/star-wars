import React from 'react';
import NavBar from './NavBar';

const Layout = ({children}) => {
    return (
        
        <div>
            <NavBar />
            <main>
            <div className="full-screen-bg"></div>
                {children}
            </main>
        </div>
    )
}

export default Layout;