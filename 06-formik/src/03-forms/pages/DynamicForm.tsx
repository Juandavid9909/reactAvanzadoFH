import { Form, Formik } from "formik";
import * as Yup from "yup";

import { MySelect, MyTextInput } from "../components";

import formJson from "../data/custom-form.json";

const initialValues: { [key: string]: any } = {};
const requiredFields: { [key: string]: any } = {};

for(const input of formJson) {
    initialValues[input.name] = input.value;

    if(!input.validations) continue;

    let schema = Yup.string();

    for(const rule of input.validations) {
        if(rule.type === "required") {
            schema = schema.required("This field is required");
        }

        if(rule.type === "minLength") {
            schema = schema.min((rule as any).value || 2, `Minimum ${ (rule as any).value } characters`);
        }

        if(rule.type === "email") {
            schema = schema.email("Invalid email address");
        }
    }

    requiredFields[input.name] = schema;
}

const validationSchema = Yup.object({ ...requiredFields });

export const DynamicForm = () => {
    return (
        <div>
            <h1>Dynamic Form</h1>

            <Formik
                initialValues={ initialValues }
                onSubmit={ (values) => {
                    console.log(values);
                } }
                validationSchema={ validationSchema }
            >
                {
                    (formik) => (
                        <Form noValidate>
                            {
                                formJson.map(({ label, name, options, placeholder, type }) => {
                                    if(
                                        type === "input" ||
                                        type === "password" ||
                                        type === "email"
                                    ) {
                                        return (
                                            <MyTextInput
                                                key={ name }
                                                label={ label }
                                                name={ name }
                                                placeholder={ placeholder }
                                                type={ (type as any) }
                                            />
                                        );
                                    }
                                    else if(type === "select") {
                                        return (
                                            <MySelect
                                                key={ name }
                                                label={ label }
                                                name={ name }
                                            >
                                                <option value="">Select an option</option>

                                                {
                                                    options?.map(({ id, label }) => (
                                                        <option
                                                            key={ id }
                                                            value={ id }
                                                        >
                                                            { label }
                                                        </option>
                                                    ))
                                                }
                                            </MySelect>
                                        );
                                    }

                                    throw new Error(`Type: ${ type } not supported`);
                                })
                            }

                            <button type="submit">Submit</button>
                        </Form>
                    )
                }
            </Formik>
        </div>
    );
};