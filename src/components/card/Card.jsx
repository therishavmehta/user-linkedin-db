import { React } from 'react';
import './styles.css';

/**
 *
 * @param {Object} props - properties which are passed.
 * gets the required item for the card and return the structured node
 */

function Card({ first_name='', last_name='', picture='', linkedInProfile='', email='', phone='' }) {
    /**
     *
     * @param {String} url - url to open
     * opens url in new tab
     */
    const openCardInNewTab = (url) => {
        window.open(url, "_blank");
    }

    return (
        <a className="card">
            <div className="card-image">
                <img src={picture} alt={`${first_name} ${last_name}` || 'user'} />
            </div>
            <div className="card-name">
                Name: {`${first_name} ${last_name}`}<br />
                Email: <a href={`mailto:${email}`} target="_blank">{email}</a><br />
                Phone: <a href={`tel:${phone}`} target="_blank">{phone}</a><br />
                Linkedin: <a href={linkedInProfile} target="_blank">Profile</a>
            </div>
        </a>
    )
}

export default Card;