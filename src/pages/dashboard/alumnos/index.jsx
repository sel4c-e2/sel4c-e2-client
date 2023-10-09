import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

import { DataContext } from '@/context/DataContext'

import DashboardLayout from '@/components/Layouts/DashboardLayout'
import StudentsTable from '@/components/StudentsTable'

import styles from '@/assets/styles/Page.module.css'

export default function Students() {
    const router = useRouter();
    const { isLogged, user } = useContext(DataContext);
    useEffect(() => {
        if (!isLogged) {
            router.push("/auth/login?returnTo=dashboard/alumnos");
        }
    }, [isLogged, router]);
    return (
        <>
            <Head>
                <title>Alumnos</title>
            </Head>
            <main className={styles.main}>
                <DashboardLayout>
                    <h3>Alumnos</h3>
                    <StudentsTable />
                </DashboardLayout>
            </main>
        </>
    )
}
