// src/components/LoginForm.js
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function LoginForm() {
  const [loginError, setLoginError] = useState(null); // State for login errors

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={Yup.object({
        username: Yup.string().required('Required'),
        password: Yup.string().required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })
          .then(res => {
            if (!res.ok) {
              return res.json().then(err => {throw new Error(err.message || "Login failed")})
            }
            return res.json();
          })
          .then(data => {
            // Handle successful login (e.g., store token, redirect)
            console.log('Login successful:', data);
            setLoginError(null); // Clear any previous errors
            // Example: localStorage.setItem('token', data.token);
            // Example: useNavigate('/profile'); // Redirect using useNavigate hook
          })
          .catch(error => {
            console.error('Login error:', error);
            setLoginError(error.message); // Set the error message
          })
          .finally(() => setSubmitting(false));
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <label htmlFor="username">Username:</label>
          <Field type="text" name="username" />
          <ErrorMessage name="username" component="div" className="error" />

          <label htmlFor="password">Password:</label>
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" className="error" />

          <button type="submit" disabled={isSubmitting}>
            Login
          </button>

          {loginError && <div className="error">{loginError}</div>} {/* Display error */}
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;