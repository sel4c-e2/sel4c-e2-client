import { createContext, useEffect, useState } from "react";

const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
}

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);

    const [modalActive, setModalActive] = useState(false);
    const [modalCloseable, setModalCloseable] = useState(false);

    const [isNavbarActive, setIsNavbarActive] = useState(true);
    const toggleNavbar = () => {
        setIsNavbarActive(!isNavbarActive);
    };
    const closeNavbar = () => {
        setIsNavbarActive(false);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLogged(true);
        }
    }, []);
    
    return (
        <DataContext.Provider value={{ copyToClipboard, isLogged, setIsLogged, modalActive, setModalActive, modalCloseable, setModalCloseable, isNavbarActive, setIsNavbarActive, toggleNavbar, closeNavbar }}>
            {children}
        </DataContext.Provider>
    );
}