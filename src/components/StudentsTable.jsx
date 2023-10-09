import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { SERVER_URL } from '@/config'

import { DataContext } from '@/context/DataContext'

import DashboardLayout from '@/components/Layouts/DashboardLayout'

import styles from '@/assets/styles/Page.module.css'

export default function StudentsTable() {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch(SERVER_URL + "/users/", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data.message);
            console.log(data.users);
            console.log(data.users[0]);
            setUsers(data.users);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };
    const fetchCountryAndUniversityInfo = async () => {
        if (users) {
            const updatedUsers = await Promise.all(
                users.map(async (user) => {
                    try {
                        const countryResponse = await fetch(`${SERVER_URL}/countries/${user.country_id}`);
                        const countryData = await countryResponse.json();
                        const universityResponse = await fetch(`${SERVER_URL}/universities/${user.university_id}`);
                        const universityData = await universityResponse.json();
                        return {
                            ...user,
                            country_name: countryData.name,
                            university_name: universityData.name
                        };
                    } catch (error) {
                        console.error('Error fetching country or university data:', error);
                        return user; // Return the user without additional info if there's an error
                    }
                })
            );
            setUsers(updatedUsers);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, []);
    useEffect(() => {
        fetchCountryAndUniversityInfo();
    }, [users]);
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
                    {users.length > 0 ? <>
                        {users.map(user => (
                            <div className={styles.tableRow + ' row'} key={user.user_id}>
                                <div className={styles.tableCol + ' col'}>
                                    <p>{user.name}</p>
                                </div>
                                <div className={styles.tableCol + ' col'}>
                                    <p>{user.lastname}</p>
                                </div>
                                <div className={styles.tableCol + ' col'}>
                                    <p>{user.age}</p>
                                </div>
                                <div className={styles.tableCol + ' col'}>
                                    <p>{user.gender}</p>
                                </div>
                                <div className={styles.tableCol + ' col'}>
                                    {user.country_name ? <p>
                                        {user.country_name}
                                    </p> : <p>
                                        Cargando pais...
                                    </p>}
                                </div>
                                <div className={styles.tableCol + ' col'}>
                                    {user.university_name ? <p>
                                        {user.university_name}
                                    </p> : <p>
                                        Cargando universidad...
                                    </p>}
                                </div>
                            </div>
                        ))}
                    </> : <>
                        <p>No se encontraron alumnos</p>
                    </>}
                </>}
            </div>
        </>
    )
}
