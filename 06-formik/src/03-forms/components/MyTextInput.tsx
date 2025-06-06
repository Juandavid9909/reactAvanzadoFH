import { ErrorMessage, useField } from "formik";

interface Props {
    label: string;
    name: string;
    placeholder?: string;
    type?: "text" | "email" | "password";
    [x: string]: any;
}

export const MyTextInput = ({ label, ...props }: Props) => {
    const [field] = useField(props);

    return (
        <>
            <label htmlFor={ props.id || props.name }>{ label }</label>

            <input
                className="text-input"
                { ...field }
                { ...props }
            />

            <ErrorMessage component="span" name={ props.name } />

            {
                // meta.touched && meta.error && (
                //     <span className="error">{ meta.error }</span>
                // )
            }
        </>
    );
};