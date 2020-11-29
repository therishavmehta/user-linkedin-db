import React, {useState} from 'react';
import './styles.css';

function RegisterForm(props) {
    const { postData } = props;
    const [formInput, changeFormInput] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        linkedinProfile: ''
    });

    const [errors, changeError] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        linkedinProfile: ''
    });

    /**
     *
     * @param {Object} event
     */
    const handleSubmit= async (event) => {
        event.preventDefault();
        if(!hasErrorInForm()) {
            const response = await postData(formInput);
            if (response["STATUS"] === "CREATED" || response["STATUS"] === "UPDATED") {
                changeFormInput({
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone: '',
                    linkedinProfile: ''});
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
        let pattern = new RegExp('^(https?:\/\/(w{3}\.))*?linkedin.com\/?.*$', 'i');
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
        let errVal;
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
                const isValid = isValidEmail(value);
                errVal = !!value && isValid ? '' : 'Invalid Email Id!'
                setError(RegisterForm.INPUT.email, errVal);
                return !!!errVal;
            case RegisterForm.INPUT.phone:
                const re = /^\d{10}$/;
                const isValidNumer = re.test(value);
                errVal = !!value && isValidNumer ? '' : 'Invalid phone number!';
                setError(RegisterForm.INPUT.phone, errVal);
                return !!!errVal;
            case RegisterForm.INPUT.linkedinProfile:
                const isValidUrl = isValidURL(value);
                errVal = !!value && isValidUrl ? '' : 'Invalid linkedin url!';
                setError(RegisterForm.INPUT.linkedinProfile, errVal);
                return !!!errVal;
            default:
                return false;
        }
    }

    /**
     * checks all the field in the form
     */
    const hasErrorInForm = () => {
        const allValid = true;
        Object.values(RegisterForm.INPUT)
                .forEach(param => allValid && isParamValid(param, formInput[param]));
        return allValid
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
                <input type="text" id="phone" name="phone" value={formInput.phone}
                    onChange={(event) => formChange(event, RegisterForm.INPUT.phone)} /><br />
                <span style={{ color: "red" }}>{errors[RegisterForm.INPUT.phone]}</span><br />
               <label for="linkedinProfile">Linkedin ID:</label><br />
                <input type="text" id="linkedinProfile" name="linkedinProfile" value={formInput.linkedinProfile}
                    onChange={(event) => formChange(event, RegisterForm.INPUT.linkedinProfile)} /><br />
                <span style={{ color: "red" }}>{errors[RegisterForm.INPUT.linkedinProfile]}</span><br />
               <input type="submit" />
            </form>
        </>
    )
}

RegisterForm.INPUT = {
    first_name: 'first_name',
    last_name: 'last_name',
    email: 'email',
    phone: 'phone',
    linkedinProfile: 'linkedinProfile'
}

export default RegisterForm;