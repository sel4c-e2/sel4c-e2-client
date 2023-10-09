import { createContext, useEffect, useState } from "react";
import { SERVER_URL } from '@/config';

const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
}

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState({
        name: '',
        lastname: '',
        email: ''
    });

    const [modalActive, setModalActive] = useState(false);
    const [modalCloseable, setModalCloseable] = useState(false);

    const [isNavbarActive, setIsNavbarActive] = useState(true);
    const toggleNavbar = () => {
        setIsNavbarActive(!isNavbarActive);
    };
    const closeNavbar = () => {
        setIsNavbarActive(false);
    };

    const fetchUser = async (token) => {
        if (!token) {
            token = localStorage.getItem("token");
        }
        if (token) {
            try {
                const response = await fetch(SERVER_URL + "/admins/admin", {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser({
                        name: data.name,
                        lastname: data.lastname,
                        email: data.email
                    });
                    setIsLogged(true);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);
    
    return (
        <DataContext.Provider value={{ copyToClipboard, isLogged, setIsLogged, user, setUser, fetchUser, modalActive, setModalActive, modalCloseable, setModalCloseable, isNavbarActive, setIsNavbarActive, toggleNavbar, closeNavbar }}>
            {children}
        </DataContext.Provider>
    );
}