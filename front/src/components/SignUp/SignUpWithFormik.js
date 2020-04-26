import { withFormik } from 'formik';

import SignUp from './SignUp';
import axios from '../../axios/axios';

const SignInWithFormik = withFormik({
    mapPropsToValues: () => ({
        username: '',
        password: '',
        passwordRepeat: '',
    }),

    validate: values => {
        const errors = {};

        if (!values.username) {
            errors.username = 'Required';
        }

        if (values.username.length > 20) {
            errors.username = 'username should contain no more than 20 characters'
        }

        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length < 6) {
            errors.password = 'password should contain at least 6 characters';
        }

        if (!values.passwordRepeat) {
            errors.passwordRepeat = 'Required';
        } else if (values.passwordRepeat !== values.password) {
            errors.passwordRepeat = 'Passwords do not match';
        }

        return errors;
    },

    handleSubmit: (values, { setErrors, setStatus, props }) => {
        axios.post('/signup', {
            username: values.username,
            password: values.password,
            passwordRepeat: values.passwordRepeat
        })
            .then((res) => {
                console.log(1, res)
                setStatus(true);
            })
            .catch(err => {
                console.log(2, err.status);
                setErrors({ common: 'Sign up error!' });
            });
    },

    displayName: 'SignUpForm',
})

export default SignInWithFormik(SignUp);