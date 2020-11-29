import React from 'react';
import {Link} from 'react-router-dom';
import './styles.css';

function PageNotFound(props) {
    return (
        <>
            <h1>404! Page Not Found</h1>
            <Link to="/">
                <button>HomePage</button>
            </Link>
        </>
    )
}

export default PageNotFound;
