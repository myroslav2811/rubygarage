import { withFormik } from 'formik';

import SignIn from './SignIn';
import { signIn } from '../../axios/queries'

const SignInWithFormik = withFormik({
    mapPropsToValues: () => ({
        username: '',
        password: ''
    }),

    validate: values => {
        const errors = {};

        if (!values.username) {
            errors.username = 'Required';
        }

        if (!values.password) {
            errors.password = 'Required';
        }

        return errors;
    },

    handleSubmit: (values, { setErrors, setStatus, props }) => {
        signIn(values)
            .then((username) => {
                props.setIsAuth(username);
                setStatus(true);
            })
            .catch(err => {
                setErrors({ common: 'Wrong credentials!' });
            });
    },

    displayName: 'SignInForm',
})

export default SignInWithFormik(SignIn);