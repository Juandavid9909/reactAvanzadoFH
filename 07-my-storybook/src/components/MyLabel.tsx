import "./MyLabel.css";

interface Props {
    /**
     * Capitalize all letters
     */
    allCaps?: boolean;
    /**
     * Background color
     */
    backgroundColor?: string;
    /**
     * Label color
     */
    color?: "text-primary" | "text-secondary" | "text-tertiary";
    /**
     * Font color
     */
    fontColor?: string;
    /**
     * Text to display
     */
    label: string;
    /**
     * Label size
     */
    size?: "normal" | "h1" | "h2" | "h3";
}

export const MyLabel = ({
    allCaps = false,
    backgroundColor = "transparent",
    color,
    fontColor,
    label,
    size = "normal"
}: Props) => {
    return (
        <span
            className={ `${ color } ${ size }` }
            style={{
                backgroundColor,
                color: fontColor
            }}
        >
            { allCaps ? label.toUpperCase() : label }
        </span>
    );
};