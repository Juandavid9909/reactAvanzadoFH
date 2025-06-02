import reactLogo from "../logo.svg";

export const ReactLogo = () => {
    return (
        <img
            alt="React Logo"
            src={ reactLogo }
            style={{
                bottom: "20px",
                position: "fixed",
                right: "20px",
                width: "130px",
            }}
        />
    );
};