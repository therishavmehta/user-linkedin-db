import { React } from 'react';
import './styles.css';

/**
 *
 * @param {Object} props - properties which are passed.
 * gets the required item for the card and return the structured node
 */
function Card({ first_name='', last_name='', picture='', linkedInProfile='' }) {

    /**
     *
     * @param {String} url - url to open
     * opens url in new tab
     */
    const openCardInNewTab = (url) => {
        window.open(url, "_blank");
    }

    return (
        <a className="card" onClick={() => openCardInNewTab(linkedInProfile)}>
            <div className="card-image">
                <img src={picture} alt={`${first_name} ${last_name}` || 'user'} />
            </div>
            <div className="card-name">
                <h4>{`${first_name} ${last_name}`}</h4>
            </div>
        </a>
    )
}

export default Card;