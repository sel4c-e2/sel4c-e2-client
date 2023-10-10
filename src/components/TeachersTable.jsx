import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { SERVER_URL } from '@/config'

import styles from '@/assets/styles/Page.module.css'

export default function TeachersTable() {
    const [admins, setAdmins] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingSuper, setLoadingSuper] = useState(false);
    const [loadingAccess, setLoadingAccess] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(SERVER_URL + "/admins", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setAdmins(data.admins);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };

    const handleSuperChange = async (adminId, isChecked) => {
        setLoadingSuper(true);
        try {
            const response = await fetch(`${SERVER_URL}/admins/${adminId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    super: isChecked
                })
            });
            console.log(response);
            if (!response.ok) {
                throw new Error('Error updating admin super status');
            }
            await fetchData();
        } catch (error) {
          console.error('Error:', error);
        }
        setLoadingSuper(false);
    };

    const handleAccessChange = async (adminId, isChecked) => {
        setLoadingAccess(true);
        try {
            const response = await fetch(`${SERVER_URL}/admins/${adminId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    access: isChecked
                })
            });
            console.log(response);
            if (!response.ok) {
                throw new Error('Error updating admin super status');
            }
            await fetchData();
        } catch (error) {
          console.error('Error:', error);
        }
        setLoadingAccess(false);
    };

    const handleDeleteAdmin = async (adminId) => {
        try {
            const response = await fetch(`${SERVER_URL}/admins/${adminId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
            if (!response.ok) {
                throw new Error('Error deleting admin');
            }
            await fetchData();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const countSuperAdmins = () => {
        return admins.filter(admin => admin.super).length;
    };
    
    const countAccessAdmins = () => {
        return admins.filter(admin => admin.access).length;
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    return (
        <>
            <div className={styles.table}>
                <div className={`${styles.tableHead} ${styles.tableRow} row`}>
                    <div className={styles.tableCol + ' col'}>
                        <p>Nombre</p>
                    </div>
                    <div className={styles.tableCol + ' col'}>
                        <p>Apellido</p>
                    </div>
                    <div className={styles.tableCol + ' col'}>
                        <p>Correo electrónico</p>
                    </div>
                    <div className={styles.tableCol + ' col'}>
                        <p>Acceso a la plataforma</p>
                    </div>
                    <div className={styles.tableCol + ' col'}>
                        <p>Privilegios de administrador</p>
                    </div>
                    <div className={styles.tableCol + ' col'}></div>
                </div>
                {loading ? <>
                    <p>Cargando profesores...</p>
                </> : <>
                    {admins && admins.length > 0 ? <>
                        {admins.map((admin, index) => (
                            <div className={styles.tableRow + ' row'} key={admin.admin_id}>
                                <div className={styles.tableCol + ' col'}>
                                    <p>{admin.name}</p>
                                </div>
                                <div className={styles.tableCol + ' col'}>
                                    <p>{admin.lastname}</p>
                                </div>
                                <div className={styles.tableCol + ' col'}>
                                    <p>{admin.email}</p>
                                </div>
                                <div className={styles.tableCol + ' col'}>
                                    <input type="checkbox" checked={admin.access} onChange={(e) => handleAccessChange(admin.admin_id, e.target.checked)} disabled={loadingAccess || index === 0} />
                                </div>
                                <div className={styles.tableCol + ' col'}>
                                    <input type="checkbox" checked={admin.super} onChange={(e) => handleSuperChange(admin.admin_id, e.target.checked)} disabled={loadingSuper || index === 0} />
                                </div>
                                <div className={styles.tableCol + ' col'}>
                                    <button onClick={() => handleDeleteAdmin(admin.admin_id)} disabled={index === 0}>Eliminar</button>
                                </div>
                            </div>
                        ))}
                    </> : <>
                        <p>No se encontraron profesores</p>
                    </>}
                </>}
            </div>
        </>
    )
}
