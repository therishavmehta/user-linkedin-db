import React, {useState} from 'react';
import { Card, RegisterForm, Snackbar } from '../../components';
import './styles.css';

function ThemeDisplay(props) {
    const postAPI = 'http://13.235.55.43/test/api/create_user';
    const [profiles, addProfiles] = useState([]);
    const [snackbar, changeSnackbar] = useState('');

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

    const checkStatus = (response) => {
        const hasError = (response.status < 200 || response.status >= 300);
        if(hasError) {
            const err = response.text()
            changeSnackbar('Something went wrong!');
            setTimeout(() => {
                changeSnackbar('')
            }, 5000);
            return err;
        }
        return response;
    }

    /**
     *
     * @param {Object} data - post data
     * @param {string} url - post url
     */
    const postData = async (data = {}) => {
        const response = await fetch(postAPI, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, *cors, same-origin
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
        const result = checkStatus(response);
        return result.json(); // parses JSON response into native JavaScript objects
    }

    /**
     *
     * @param {Object} payload
     */
    const addResponseProfiles = async (payload) => {
        try {
            const results = await postData(payload);
            if(results && results["STATUS"] === "CREATED" || results["STATUS"] === "UPDATED") {
                results && results.data && addProfiles(preProfiles => ([...preProfiles, results.data]));
                changeSnackbar('Registration successful!');
                setTimeout(() => {
                    changeSnackbar('')
                }, 5000);
                return results;
            }
        return null;
        } catch(err) {
            Promise.resolve(err).then(e => {
                console.error(e);
            })
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
            {!!snackbar && <Snackbar text={snackbar}/>}
        </div>
    );

}

export default React.memo(ThemeDisplay);
