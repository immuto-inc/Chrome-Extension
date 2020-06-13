import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as LoginService from "./login.service";

export default function LoginForm() {
  return (
    <>
      <h3>Login</h3>
      <Formik {...LoginService.formikProps}>
        {({ errors, touched, ...props }) => (
          <Form>
            {/* Email Field  */}
            <>
              <Field
                name={LoginService.FIELDS.EMAIL}
                as={LoginService.TextInput}
                {...props}
              />
              <ErrorMessage name={LoginService.FIELDS.EMAIL}>
                {(msg) => <LoginService.Error msg={msg} />}
              </ErrorMessage>
            </>

            {/* Password Field  */}
            <>
              <Field
                name={LoginService.FIELDS.PASSWORD}
                as={LoginService.PasswordInput}
                {...props}
              />
              <ErrorMessage name={LoginService.FIELDS.PASSWORD}>
                {(msg) => <LoginService.Error msg={msg} />}
              </ErrorMessage>
            </>

            <button type="submit">submit</button>
          </Form>
        )}
      </Formik>
    </>
  );
}
