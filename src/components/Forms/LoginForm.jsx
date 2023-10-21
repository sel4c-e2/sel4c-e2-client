// Falta manejar erroes como, no haz puesto tu nombre, email, contraseña, etc
// Falta manejar errores de servidor y que aparezca que paso
// Falta loading...
// Falta estilo

import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { SERVER_URL } from '@/config';

import { DataContext } from '@/context/DataContext';

import style from '@/assets/styles/Form.module.css';

export default function LoginForm() {
    const router = useRouter();

    const { fetchUser } = useContext(DataContext);

    const returnTo = router.query.returnTo || "dashboard";
    const formAction = SERVER_URL + "/admins/login";
    const formMethod = "POST";
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(formAction, {
                method: formMethod,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                fetchUser(data.token);
                router.push('/' + returnTo);
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }

    return (
        <form action={formAction} method={formMethod} onSubmit={handleSubmit} className={`${style.form} ${style.login}`}>
            <div className={style.formRow + ' row'}>
                <div className={style.column + ' col-12'}>
                    <label htmlFor="email">Correo electrónico</label>
                    <input id='email' type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder='abc@abc.com...' />
                </div>
            </div>
            <div className={style.formRow + ' row'}>
                <div className={style.column + ' col-12'}>
                    <label htmlFor="password">Contraseña</label>
                    <input id='password' type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder='contraseña...' />
                </div>
            </div>
            <div className={style.formRow + ' row'}>
                <div className={style.column + ' col-12 text-center'}>
                    <button type='submit' disabled={loading}>
                        Iniciar sesión
                    </button>
                    <p className={style.smallText}>Aún no tienes cuenta? Haz click <Link href={"/auth/signup"}>aquí</Link></p>
                    <p className={style.smallText}>Comunicate con un administrador para tener acceso</p>
                </div>
            </div>
        </form>
    );
}
