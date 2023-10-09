import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

import { DataContext } from '@/context/DataContext'

import DashboardLayout from '@/components/Layouts/DashboardLayout'
import LogoutButton from '@/components/Forms/LogoutButton'

import styles from '@/assets/styles/Home.module.css'

export default function Dashboard() {
    const router = useRouter();
    const { isLogged, user } = useContext(DataContext);
    useEffect(() => {
        if (!isLogged) {
            router.push("/auth/login?returnTo=dashboard");
        }
    }, [isLogged, router]);
    return (
        <>
            <Head>
                <title>Panel</title>
            </Head>
            <main className={styles.main}>
                <DashboardLayout>
                    <p>Dashboard</p>
                    <LogoutButton />
                </DashboardLayout>
            </main>
        </>
    )
}
