// Falta manejar erroes como, no haz puesto tu nombre, email, contraseña, etc
// Falta manejar errores de servidor y que aparezca que paso
// Falta loading...
// Falta estilo

import React, { useContext, useEffect, useState } from 'react';
import { SERVER_URL } from '@/config';

import { DataContext } from '@/context/DataContext';

import style from '@/assets/styles/Form.module.css';

export default function EditPasswordForm() {
    const { fetchUser, user } = useContext(DataContext);

    const formAction = SERVER_URL + "/admins/password/" + user.id;
    const formMethod = "PUT";
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: ''
    });
    const [dataChanged, setDataChanged] = useState(false);
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
                console.log(data);
                fetchUser();
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        const cPwdChanged = formData.currentPassword !== '';
        const nPwdChanged = formData.newPassword !== '';
        setDataChanged(cPwdChanged && nPwdChanged);
    }, [formData]);

    return (
        <form action={formAction} method={formMethod} onSubmit={handleSubmit} className={`${style.form} ${style.login}`}>
            <div className={style.formRow + ' row'}>
                <div className={style.column + ' col-12'}>
                    <label htmlFor="currentPassword">Contraseña actual</label>
                    <input id='currentPassword' type="password" name="currentPassword" value={formData.currentPassword} onChange={handleInputChange} aria-autocomplete='none' />
                </div>
            </div>
            <div className={style.formRow + ' row'}>
                <div className={style.column + ' col-12'}>
                    <label htmlFor="newPassword">Nueva contraseña</label>
                    <input id='newPassword' type="password" name="newPassword" value={formData.newPassword} onChange={handleInputChange} aria-autocomplete='none' />
                </div>
            </div>
            <div className={style.formRow + ' row'}>
                <div className={style.column + ' col-12 text-center'}>
                    <button type='submit' disabled={loading || !dataChanged}>
                        Cambiar contraseña
                    </button>
                </div>
            </div>
        </form>
    );
}
