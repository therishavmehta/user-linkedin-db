import React from 'react';
import {Link} from 'react-router-dom';
import './styles.css';

function PageNotFound(props) {
    return (
        <>
        <div style={{paddingTop: '50px'}}>
            <h1>404! Page Not Found</h1>
            <Link to="/">
                <button>HomePage</button>
            </Link>
        </div>
        </>
    )
}

export default PageNotFound;
