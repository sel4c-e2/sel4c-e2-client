import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { SERVER_URL } from '@/config';

import { DataContext } from '@/context/DataContext';

import style from '@/assets/styles/Form.module.css';

export default function LogoutButton() {
    const router = useRouter();

    const { setUser, setIsLogged } = useContext(DataContext);

    const formAction = SERVER_URL + "/admins/logout";
    const formMethod = "POST";

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            localStorage.removeItem("token");
            setUser({
                name: '',
                lastname: '',
                email: '',
                super: false
            });
            setIsLogged(false);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form action={formAction} method={formMethod} onSubmit={handleSubmit} className={style.logout}>
            <button type='submit'>
                Cerrar sesión
            </button>
        </form>
    );
}
