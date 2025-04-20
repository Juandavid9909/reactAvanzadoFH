import { FormEvent } from "react";

import { useForm } from "../hooks/useForm";

import "../styles/styles.css";

export const RegisterPage = () => {
    const { name, email, password1, password2, onChange, resetForm, isValidEmail } =  useForm({
        name: "",
        email: "",
        password1: "",
        password2: "",
    });

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <div>
            <h1>Register Page</h1>

            <form noValidate onSubmit={ onSubmit }>
                <input
                    className={ `${ name.trim().length <= 0 && "has-error" }` }
                    name="name"
                    onChange={ onChange }
                    placeholder="Name"
                    type="text"
                    value={ name }
                />

                {
                    name.trim().length <= 0 && <span>Este campo es necesario</span>
                }

                <input
                    className={ `${ !isValidEmail(email) && "has-error" }` }
                    name="email"
                    onChange={ onChange }
                    placeholder="Email"
                    type="email"
                    value={ email }
                />

                {
                    !isValidEmail(email) && <span>Email no es válido</span>
                }

                <input
                    className={ `${ name.trim().length <= 0 && "has-error" }` }
                    name="password1"
                    onChange={ onChange }
                    placeholder="Password"
                    type="password"
                    value={ password1 }
                />

                {
                    password1.trim().length <= 0 && <span>Este campo es necesario</span>
                }

                {
                    password1.trim().length < 6 && password1.trim().length > 0 && <span>La contraseña tiene que tener 6 letras</span>
                }

                <input
                    className={ `${ name.trim().length <= 0 && "has-error" }` }
                    name="password2"
                    onChange={ onChange }
                    placeholder="Repeat password"
                    type="password"
                    value={ password2 }
                />

                {
                    password2.trim().length <= 0 && <span>Este campo es necesario</span>
                }

                {
                    password2.trim().length > 0 && password1 !== password2 && <span>Las contraseñas deben de ser iguales</span>
                }

                <button type="submit">Create</button>

                <button type="button" onClick={ resetForm }>Reset Form</button>
            </form>
        </div>
    );
};