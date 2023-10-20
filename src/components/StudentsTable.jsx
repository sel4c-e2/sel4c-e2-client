import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { SERVER_URL } from '@/config'

import { DataContext } from '@/context/DataContext'

import DashboardLayout from '@/components/Layouts/DashboardLayout'

import styles from '@/assets/styles/Page.module.css'

export default function StudentsTable() {
    const { user } = useContext(DataContext);
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(SERVER_URL + "/users", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const data = await response.json();
                setUsers(data.users);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setLoading(false);
        };
    
        fetchData();
    }, [user]);
    
    return (
        <>
            <div className={styles.table}>
                <div className={`${styles.tableHead} ${styles.tableRow} row`}>
                    <div className={styles.tableCol + ' col'}>
                        <p>Correo electrónico</p>
                    </div>
                    <div className={styles.tableCol + ' col'}>
                        <p>Nombre</p>
                    </div>
                    <div className={styles.tableCol + ' col'}>
                        <p>Edad</p>
                    </div>
                    <div className={styles.tableCol + ' col'}>
                        <p>Genero</p>
                    </div>
                    <div className={styles.tableCol + ' col'}>
                        <p>Pais</p>
                    </div>
                    <div className={styles.tableCol + ' col'}>
                        <p>Universidad</p>
                    </div>
                </div>
                {loading ? <>
                    <p>Cargando alumnos...</p>
                </> : <>
                    {users && users.length > 0 ? <>
                        {users.map(user => (
                            <Link href={"/dashboard/alumnos/" + user.user_id} className={styles.tableRow + ' row'} key={user.user_id}>
                                <div className={styles.tableCol + ' col'}>
                                    <p>{user.email}</p>
                                </div>
                                <div className={styles.tableCol + ' col'}>
                                    <p>{user.name}</p>
                                </div>
                                <div className={styles.tableCol + ' col'}>
                                    <p>{user.age}</p>
                                </div>
                                <div className={styles.tableCol + ' col'}>
                                    <p>{user.gender}</p>
                                </div>
                                <div className={styles.tableCol + ' col'}>
                                    <p>{user.country_name}</p>
                                </div>
                                <div className={styles.tableCol + ' col'}>
                                    <p>{user.university_name}</p>
                                </div>
                            </Link>
                        ))}
                    </> : <>
                        <p>No se encontraron alumnos</p>
                    </>}
                </>}
            </div>
        </>
    )
}
