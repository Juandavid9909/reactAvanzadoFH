import { ErrorMessage, useField } from "formik";

interface Props {
    label: string;
    name: string;
    placeholder?: string;
    [x: string]: any;
}

export const MySelect = ({ label, ...props }: Props) => {
    const [field] = useField(props);

    return (
        <>
            <label htmlFor={ props.id || props.name }>{ label }</label>

            <select
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