import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as LoginService from "./login.service";

// This is undefined
let im = Immuto.init(true, "https://dev.immuto.io");

export default function LoginForm() {
  const login = async () => {
    await im
      .authenticate("immuto.test@gmail.com", "Test12345!")
      .then((authToken) => {
        console.log("auth token => ", authToken);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <button onClick={() => login()}>Log In Test</button>
      <br />
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
