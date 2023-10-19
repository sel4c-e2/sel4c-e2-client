import { createContext, useEffect, useState } from "react";
import { SERVER_URL } from '@/config';

const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
}

function formatInstructions(instructions, maxLength) {
    if (instructions.length > maxLength) {
        return instructions.slice(0, maxLength) + '...';
    }
    return instructions;
}

function formatDatetime(rawDatetime) {
    try {
        const datetime = new Date(rawDatetime);
        const day = datetime.getDate().toString().padStart(2, '0');
        const month = (datetime.getMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 porque los meses van de 0 a 11
        const year = datetime.getFullYear();
        const hour = datetime.getHours().toString().padStart(2, '0');
        const minute = datetime.getMinutes().toString().padStart(2, '0');
        return `${day}/${month}/${year} ${hour}:${minute}`;
    } catch (tcErr) {
        console.error(tcErr);
        return rawDatetime;
    }
}

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState({
        id: '',
        name: '',
        lastname: '',
        email: '',
        super: false
    });

    const [modalActive, setModalActive] = useState(false);
    const [modalCloseable, setModalCloseable] = useState(false);
    const [modalContent, setModalContent] = useState(null);

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
                        id: data.admin_id,
                        name: data.name,
                        lastname: data.lastname,
                        email: data.email,
                        super: data.super,
                        token: token
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
        <DataContext.Provider value={{ copyToClipboard, formatInstructions, formatDatetime, isLogged, setIsLogged, user, setUser, fetchUser, modalActive, setModalActive, modalCloseable, setModalCloseable, modalContent, setModalContent, isNavbarActive, setIsNavbarActive, toggleNavbar, closeNavbar }}>
            {children}
        </DataContext.Provider>
    );
}