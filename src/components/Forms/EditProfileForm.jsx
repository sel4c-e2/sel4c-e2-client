// Falta manejar erroes como, no haz puesto tu nombre, email, contraseña, etc
// Falta manejar errores de servidor y que aparezca que paso
// Falta loading...
// Falta estilo

import React, { useContext, useEffect, useState } from 'react';
import { SERVER_URL } from '@/config';

import { DataContext } from '@/context/DataContext';

import style from '@/assets/styles/Form.module.css';

export default function EditProfileForm() {
    const { fetchUser, user } = useContext(DataContext);

    const formAction = SERVER_URL + "/admins/" + user.id;
    const formMethod = "PUT";
    const [ogFormData, setOgFormData] = useState({
        name: user.name,
        lastname: user.lastname
    });
    const [formData, setFormData] = useState({
        name: user.name,
        lastname: user.lastname
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
        const nameChanged = formData.name !== ogFormData.name;
        const lastnameChanged = formData.lastname !== ogFormData.lastname;
        setDataChanged(nameChanged || lastnameChanged);
    }, [formData, ogFormData]);

    return (
        <form action={formAction} method={formMethod} onSubmit={handleSubmit} className={`${style.form} ${style.login}`}>
            <div className={style.formRow + ' row'}>
                <div className={style.column + ' col-12 col-sm-6'}>
                    <label htmlFor="name">Nombre</label>
                    <input id='name' type="name" name="name" value={formData.name} onChange={handleInputChange} aria-autocomplete='none' />
                </div>
                <div className={style.column + ' col-12 col-sm-6'}>
                    <label htmlFor="lastname">Apellido</label>
                    <input id='lastname' type="lastname" name="lastname" value={formData.lastname} onChange={handleInputChange} aria-autocomplete='none' />
                </div>
            </div>
            <div className={style.formRow + ' row'}>
                <div className={style.column + ' col-12'}>
                    <label htmlFor="email">Correo electrónico</label>
                    <input id='email' type="email" name="email" value={user.email} readOnly />
                </div>
            </div>
            <div className={style.formRow + ' row'}>
                <div className={style.column + ' col-12 text-center'}>
                    <button type='submit' disabled={loading || !dataChanged}>
                        Modificar datos
                    </button>
                </div>
            </div>
        </form>
    );
}
