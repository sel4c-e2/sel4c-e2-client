// Falta manejar erroes como, no haz puesto tu nombre, email, contraseña, etc
// Falta manejar errores de servidor y que aparezca que paso
// Falta loading...
// Falta estilo

import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { SERVER_URL } from '@/config';

import { DataContext } from '@/context/DataContext';

import style from '@/assets/styles/Form.module.css';

export default function SignupForm() {
    const router = useRouter();

    const { fetchUser } = useContext(DataContext);

    const formAction = SERVER_URL + "/admins";
    const formMethod = "POST";
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
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
                // localStorage.setItem("token", data.token);
                // fetchUser(data.token);
                router.push('/auth/login');
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }

    return (
        <form action={formAction} method={formMethod} onSubmit={handleSubmit} className={`${style.form} ${style.signup}`}>
            <div className={style.formRow + ' row'}>
                <div className={style.column + ' col-12 col-sm-6'}>
                    <label htmlFor="name">Nombre</label>
                    <input id='name' type="text" name="name" value={formData.name} onChange={handleInputChange} />
                </div>
                <div className={style.column + ' col-12 col-sm-6'}>
                    <label htmlFor="lastname">Apellido</label>
                    <input id='lastname' type="text" name="lastname" value={formData.lastname} onChange={handleInputChange} />
                </div>
            </div>
            <div className={style.formRow + ' row'}>
                <div className={style.column + ' col-12 col-sm-6'}>
                    <label htmlFor="email">Correo electrónico</label>
                    <input id='email' type="email" name="email" value={formData.email} onChange={handleInputChange} />
                </div>
                <div className={style.column + ' col-12 col-sm-6'}>
                    <label htmlFor="password">Contraseña</label>
                    <input id='password' type="password" name="password" value={formData.password} onChange={handleInputChange} />
                </div>
            </div>
            <div className={style.formRow + ' row'}>
                <div className={style.column + ' col-12 text-center'}>
                    <button type='submit' disabled={loading}>
                        Crear cuenta
                    </button>
                </div>
            </div>
        </form>
    );
}
