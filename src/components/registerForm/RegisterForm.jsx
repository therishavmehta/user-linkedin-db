import React, {useState} from 'react';


function RegisterForm() {
    const [formInput, changeFormInput] = useState({
        fName: '',
        lName: '',
        email: '',
        phone: '',
        linkedIn: ''
    });

    const [errors, changeError] = useState({
        fName: '',
        lName: '',
        email: '',
        phone: '',
        linkedin: ''
    });

    const handleSubmit= (event) => {
        event.preventDefault();
        !hasErrorInForm() &&  console.log("Form to be submitted");
    }

    const formChange = (event, param) => {
        changeFormInput(otherProps => ({
            ...otherProps,
            [param]: event.target.value
        }));
    }

    const setError = (param, value) => {
        changeError(otherProps => ({
            ...otherProps,
            [param]: value
        }));
    }

    const validURL = (str) => {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }

    const isParamValid = (param, value) => {
        switch(param) {
            case RegisterForm.INPUT.fName:
                const errVal = !!value ? '' : 'First Name is required!';
                setError(RegisterForm.INPUT.fName, errVal);
                return !!!errVal;
            case RegisterForm.INPUT.lName:
                const errVal = !!value ? '' : 'Last Name is required!';
                setError(RegisterForm.INPUT.lName, errVal);
                return !!!errVal;
            case RegisterForm.INPUT.email:
                const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                const isValidEmail = re.test(value);
                const errVal = !!value && isValidEmail ? '' : 'Invalid Email Id!'
                setError(RegisterForm.INPUT.email, errVal);
                return !!!errVal;
            case RegisterForm.INPUT.phone:
                const re = /^\d{10}$/;
                const isValidNumer = re.test(value);
                const errVal = !!value && isValidNumer ? '' : 'Invalid phone number!';
                setError(RegisterForm.INPUT.phone, errVal);
                return !!!errVal;
            case RegisterForm.INPUT.linkedin:
                const isValidUrl = validURL(value);
                const errVal = !!value && isValidUrl ? '' : 'Invalid linkedin url!';
                setError(RegisterForm.INPUT.linkedin, errVal);
                return !!!errVal;
            default:
                return false;
        }
    }

    const hasErrorInForm = () => {
        return !Object.values(RegisterForm.INPUT)
                .every(param => isParamValid(param, formInput[param]));
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
               <label for="fname">First name:</label><br />
                <input type="text" id="fname" name="fname" value={formInput.fName}
                onChange={(event) => formChange(event, RegisterForm.INPUT.fName)}/><br />
                <span style={{ color: "red" }}>{errors[RegisterForm.INPUT.fName]}</span><br />
               <label for="lname">Last name:</label><br />
                <input type="text" id="lname" name="lname" value={formInput.lName}
                onChange={(event) => formChange(event, RegisterForm.INPUT.lName)}/>
                <span style={{ color: "red" }}>{errors[RegisterForm.INPUT.lName]}</span><br />
               <label for="email">Email:</label><br />
                <input type="text" id="email" name="email" value={formInput.email}
                onChange={(event) => formChange(event, RegisterForm.INPUT.email)}/><br />
                <span style={{ color: "red" }}>{errors[RegisterForm.INPUT.email]}</span><br />
               <label for="phone">Phone:</label><br />
                <input type="text" id="phone" name="phone" value={formInput.phone}
                onChange={(event) => formChange(event, RegisterForm.INPUT.phone)}/>
                <span style={{ color: "red" }}>{errors[RegisterForm.INPUT.email]}</span><br />
               <label for="linkedin">Last name:</label><br />
                <input type="text" id="linkedin" name="linkedin" value={formInput.linkedIn}
                onChange={(event) => formChange(event, RegisterForm.INPUT.linkedin)}/>
                <span style={{ color: "red" }}>{errors[RegisterForm.INPUT.linkedin]}</span><br />
               <input type="submit" />
            </form>
        </>
    )
}

RegisterForm.INPUT = {
    fName: 'fname',
    lName: 'lName',
    email: 'email',
    phone: 'phone',
    linkedin: 'linkedin'
}