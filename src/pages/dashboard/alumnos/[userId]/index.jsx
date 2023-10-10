import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

import { DataContext } from '@/context/DataContext'

import DashboardLayout from '@/components/Layouts/DashboardLayout'

import styles from '@/assets/styles/Home.module.css'

export default function Alumno() {
    const router = useRouter();
    const { userId } = router.query;
    const { isLogged } = useContext(DataContext);
    useEffect(() => {
        if (!isLogged) {
            router.push("/auth/login?returnTo=dashboard/alumnos/" + userId);
        }
    }, [isLogged, router]);
    return (
        <>
            <Head>
                <title>Alumno</title>
            </Head>
            <main className={styles.main}>
                <DashboardLayout>
                    <p>Alumno {userId}</p>
                </DashboardLayout>
            </main>
        </>
    )
}
