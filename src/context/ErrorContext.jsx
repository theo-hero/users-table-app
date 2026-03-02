import { createContext, useContext, useState } from "react";

const ErrorContext = createContext(undefined);

export function ErrorProvider({ children }) {

    const [error, setError] = useState(null);

    return (
        <ErrorContext.Provider value={{ error, setError }}>
            {children}
        </ErrorContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useError() {
    const context = useContext(ErrorContext);

    if (!context) {
        throw new Error("Error Tools must be used within ErrorProvider");
    }

    return context;
}