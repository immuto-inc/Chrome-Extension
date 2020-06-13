import React from "react";
import * as Yup from "yup";
// let im = Immuto.init(true, "https://dev.immuto.io");

export const FIELDS = {
  EMAIL: "email",
  PASSWORD: "password",
};

export const INITIAL_VALUES = {
  [FIELDS.EMAIL]: "",
  [FIELDS.PASSWORD]: "",
};

export const handleSubmit = (values, actions) => {
  let { email, password } = values;
  //   im.authenticate(email, password)
  //     .then((authToken) => {
  //       console.log("auth token = ", authToken);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  actions.resetForm();
};

export const SignupSchema = Yup.object().shape({
  [FIELDS.EMAIL]: Yup.string()
    .email("Invalid email")
    .required("Email is required."),
  [FIELDS.PASSWORD]: Yup.string().required("Password is required"),
});

export const formikProps = {
  initialValues: INITIAL_VALUES,
  onSubmit: handleSubmit,
  validationSchema: SignupSchema,
  validateOnChange: true,
};

export const TextInput = ({ handleChange, handleBlur, values, name }) => (
  <input
    autoFocus
    type="text"
    onChange={handleChange}
    onBlur={handleBlur}
    value={values[name]}
    name={name}
    placeholder="Email"
    autoComplete="on"
  />
);

export const PasswordInput = ({ handleChange, handleBlur, values, name }) => (
  <input
    type="password"
    onChange={handleChange}
    onBlur={handleBlur}
    value={values[name]}
    name={name}
    placeholder="Password"
    autoComplete="on"
  />
);

export const Error = ({ msg }) => (
  <div>
    <p>{msg}</p>
  </div>
);
