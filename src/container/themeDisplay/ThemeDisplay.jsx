import React, {useState} from 'react';
import { Card, RegisterForm } from '../../components';
import './styles.css';

function ThemeDisplay(props) {
    const postAPI = 'http://13.235.55.43/test/api/create_user';
    const [profiles, addProfiles] = useState([]);

    /**
     *
     * @param {Array} list - gets cards list
     */
    const getCardInstance = (list = []) => {
        const cards = [];
        list.length && list.forEach((profile, idx) => {
            cards.push(<Card key={idx} {...profile} />)
        });
        return cards;
    }

    /**
     *
     * @param {Object} data - post data
     * @param {string} url - post url
     */
    const postData = async (data = {}, url = postAPI) => {
        try {
            const response = await fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
            return response.json(); // parses JSON response into native JavaScript objects
        } catch(err) {
            throw new Error(err);
        }
    }

    /**
     * 
     * @param {Object} payload 
     */
    const addResponseProfiles = async (payload) => {
        try {
            const results = await postData(payload);
            addProfiles(preProfiles => ([...preProfiles, results.data]));
        } catch(err) {
            throw new Error(err);
        }
    }

    const theme = {
        backgroundColor: props.bgColor
    }

    return (
        <div className="display-container" style={theme}>
            <div className="card-content">
                {getCardInstance(profiles)}
            </div>
            <div className="register-form">
                <RegisterForm postData={addResponseProfiles}/>
            </div>
        </div>
    );

}

export default React.memo(ThemeDisplay);
