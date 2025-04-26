import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';

import "../styles/styles.css";

export const FormikComponents = () => {
    return (
        <div>
            <h1>Formik Components</h1>

            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    terms: false,
                    jobType: "",
                }}
                onSubmit={ (values) => {
                    console.log(values);
                } }
                validationSchema={ Yup.object({
                    firstName: Yup.string()
                        .max(15, "Must be 15 characters or less")
                        .required("Required"),
                    lastName: Yup.string()
                        .max(10, "Must be 10 characters or less")
                        .required("Required"),
                    email: Yup.string()
                        .email("Invalid email address")
                        .required("Required"),
                    jobType: Yup.string()
                        .required("Required")
                        .notOneOf(["it-jr"], "This option is not allowed"),
                    terms: Yup.boolean()
                        .oneOf([true], "You must accept terms and conditions"),
                }) }
            >
                {
                    (formik) => (
                        <Form>
                            <label htmlFor="firstName">First Name</label>
                            <Field name="firstName" type="text" />
                            <ErrorMessage component="span" name="firstName" />

                            <label htmlFor="lastName">Last Name</label>
                            <Field name="lastName" type="text" />
                            <ErrorMessage component="span" name="lastName" />

                            <label htmlFor="email">Email</label>
                            <Field name="email" type="text" />
                            <ErrorMessage component="span" name="email" />

                            <label htmlFor="jobType">Job Type</label>
                            <Field name="jobType" as="select">
                                <option value="">Pick something</option>

                                <option value="developer">Developer</option>

                                <option value="designer">Designer</option>

                                <option value="it-senior">IT Senior</option>

                                <option value="it-jr">IT Jr.</option>
                            </Field>
                            <ErrorMessage component="span" name="jobType" />

                            <label>
                                <Field name="terms" type="checkbox" />
                                Terms and conditions
                            </label>
                            <ErrorMessage component="span" name="terms" />

                            <button type="submit">Submit</button>
                        </Form>
                    )
                }
            </Formik>
        </div>
    );
};