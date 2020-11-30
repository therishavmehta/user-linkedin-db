import React, {useState} from 'react';
import './styles.css';

function RegisterForm(props) {
    const { postData } = props;
    const [formInput, changeFormInput] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        linkedInProfile: ''
    });

    const [errors, changeError] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        linkedInProfile: ''
    });

    /**
     *
     * @param {Object} event
     */
    const handleSubmit= async (event) => {
        event.preventDefault();
        if(!hasErrorInForm()) {
            const response = await postData(formInput);
            if (response && response.data && (response["STATUS"] === "CREATED" || response["STATUS"] === "UPDATED")) {
                changeFormInput({
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone: '',
                    linkedInProfile: ''});
            }
        }
    }

    /**
     *
     * @param {Object} event
     * @param {Enum} param
     */
    const formChange = (event, param) => {
        changeFormInput(otherProps => ({
            ...otherProps,
            [param]: event.target.value
        }));
    }

    /**
     *
     * @param {Enum} param
     * @param {string} value
     */
    const setError = (param, value) => {
        changeError(otherProps => ({
            ...otherProps,
            [param]: value
        }));
    }

    /**
     *
     * @param {String} str - to be tested
     */
    const isValidURL = (str) => {
        let pattern = new RegExp('^(https?:\/\/(w{3}\.))?linkedIn.com\/?.*$', 'i');
        return !!pattern.test(str);
    }

    /**
    *
    * @param {String} str - to be tested
    */
    const isValidEmail = (str) => {
        const pattern = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$', 'i');
        return !!pattern.test(str);

    }

    /**
     *
     * @param {Enum} param - param to be tested
     * @param {string} value - value of field
     */
    const isParamValid = (param, value) => {
        let errVal, isValue;
        switch(param) {
            case RegisterForm.INPUT.first_name:
                errVal = !!value ? '' : 'First Name is required!';
                setError(RegisterForm.INPUT.first_name, errVal);
                return !!!errVal;
            case RegisterForm.INPUT.last_name:
                errVal = !!value ? '' : 'Last Name is required!';
                setError(RegisterForm.INPUT.last_name, errVal);
                return !!!errVal;
            case RegisterForm.INPUT.email:
                isValue = !!value;
                const isValid = isValidEmail(value);
                errVal = `${!isValue ? 'Email is required!' : ''}${isValue && !isValid ? 'Invalid Email Id': ''}`
                setError(RegisterForm.INPUT.email, errVal);
                return !!!errVal;
            case RegisterForm.INPUT.phone:
                const re = /^\d{10}$/;
                isValue = !!value;
                const isValidNumer = re.test(value);
                errVal = `${!isValue ? 'Phone number is required!' : ''}${isValue && !isValidNumer ? 'Invalid Phone number!' : ''}`
                setError(RegisterForm.INPUT.phone, errVal);
                return !!!errVal;
            case RegisterForm.INPUT.linkedInProfile:
                isValue = !!value;
                const isValidUrl = isValidURL(value);
                errVal = `${!isValue ? 'linkedIn URL is required!' : ''}${isValue && !isValidUrl ? 'Invalid linkedIn URL' : ''}`
                setError(RegisterForm.INPUT.linkedInProfile, errVal);
                return !!!errVal;
            default:
                return false;
        }
    }

    /**
     * checks all the field in the form
     */
    const hasErrorInForm = () => {
        let accumulator = [];
        Object.values(RegisterForm.INPUT)
            .forEach((param) => accumulator.push(isParamValid(param, formInput[param])));
        return !accumulator.every(item => item);
    }


    return (
        <>
            <form className="form-container" onSubmit={handleSubmit}>
               <label for="first_name">First name:</label><br />
                <input type="text" id="first_name" name="first_name" value={formInput.first_name}
                onChange={(event) => formChange(event, RegisterForm.INPUT.first_name)}/><br />
                <span style={{ color: "red" }}>{errors[RegisterForm.INPUT.first_name]}</span><br />
               <label for="last_name">Last name:</label><br />
                <input type="text" id="last_name" name="last_name" value={formInput.last_name}
                onChange={(event) => formChange(event, RegisterForm.INPUT.last_name)}/><br />
                <span style={{ color: "red" }}>{errors[RegisterForm.INPUT.last_name]}</span><br />
               <label for="email">Email:</label><br />
                <input type="text" id="email" name="email" value={formInput.email}
                onChange={(event) => formChange(event, RegisterForm.INPUT.email)}/><br />
                <span style={{ color: "red" }}>{errors[RegisterForm.INPUT.email]}</span><br />
               <label for="phone">Phone:</label><br />
                <input type="number" id="phone" name="phone" value={formInput.phone}
                    onChange={(event) => formChange(event, RegisterForm.INPUT.phone)} /><br />
                <span style={{ color: "red" }}>{errors[RegisterForm.INPUT.phone]}</span><br />
               <label for="linkedInProfile">linkedIn ID:</label><br />
                <input type="text" id="linkedInProfile" name="linkedInProfile" value={formInput.linkedInProfile}
                    onChange={(event) => formChange(event, RegisterForm.INPUT.linkedInProfile)} /><br />
                <span style={{ color: "red" }}>{errors[RegisterForm.INPUT.linkedInProfile]}</span><br />
               <input type="submit" value="Register" />
            </form>
        </>
    )
}

RegisterForm.INPUT = {
    first_name: 'first_name',
    last_name: 'last_name',
    email: 'email',
    phone: 'phone',
    linkedInProfile: 'linkedInProfile'
}

export default RegisterForm;