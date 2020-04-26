import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import Loading from '../Loading/Loading';

const invalidDataStyle = {
    color: 'red',
    textAlign: 'center',
    padding: '10px'
}

const formWrapper = {
    width: '600px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    margin: '100px auto'
}

const headStyle = {
    textTransform: 'uppercase',
    color: '#303030',
    margin: '20px 0 40px',
    textAlign: 'center'
}

const linkStyle = {
    display: 'block',
    textAlign: 'center',

}

const SignIn = props => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        status,
        isAuth,
    } = props;

    const history = useHistory();

    if (isAuth || status) {
        history.push('/');
    }

    if (isAuth === null) {
        return <Loading />
    }

    return (
        <div style={formWrapper}>
            <Form noValidate onSubmit={handleSubmit}>
                <h2 style={headStyle}>
                    Sign In
                    </h2>
                <Form.Group controlId="formBasicUsername">
                    <Form.Control
                        name="username"
                        type="text"
                        placeholder="Username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.username && !errors.username}
                        isInvalid={!!errors.username && !!touched.username}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.username}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.password && !errors.password}
                        isInvalid={!!errors.password && !!touched.password}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Sign In
                    </Button>
                {errors.common && <p style={invalidDataStyle}>{errors.common}</p>}
                <Link to='/signup' style={linkStyle}>Or create new account</Link>
            </Form>
        </div>
    );
};

export default SignIn;