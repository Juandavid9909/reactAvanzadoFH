import { Form, Formik } from "formik";
import * as Yup from "yup";

import "../styles/styles.css";
import { MyTextInput } from "../components";

export const RegisterFormikPage = () => {
    return (
        <div>
            <h1>Register Formik Page</h1>

            <Formik
                initialValues={{
                    name: "",
                    email: "",
                    password1: "",
                    password2: "",
                }}
                onSubmit={ (values) => {
                    console.log(values);
                } }
                validationSchema={
                    Yup.object({
                        name: Yup.string()
                            .min(2, "Name must be at least 2 characters")
                            .max(15, "Name must be at most 15 characters")
                            .required("Required"),
                        email: Yup.string()
                            .email("Invalid email address")
                            .required("Required"),
                        password1: Yup.string()
                            .min(6, "Password must be at least 6 characters")
                            .required("Required"),
                        password2: Yup.string()
                            .oneOf([Yup.ref("password1")], "Passwords must match")
                            .required("Required"),
                    })
                }
            >
                {
                    ({ handleReset }) => (
                        <Form>
                            <MyTextInput
                                label="Name"
                                name="name"
                                placeholder="Juan"
                                type="text"
                            />

                            <MyTextInput
                                label="Email"
                                name="email"
                                placeholder="juan@mail.com"
                                type="email"
                            />

                            <MyTextInput
                                label="Password"
                                name="password1"
                                placeholder="********"
                                type="password"
                            />

                            <MyTextInput
                                label="Confirm Password"
                                name="password2"
                                placeholder="********"
                                type="password"
                            />

                            <button type="submit">Create</button>
            
                            <button type="button" onClick={ handleReset }>Reset Form</button>
                        </Form>
                    )
                }
                </Formik>
        </div>
    );
};