import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

import { DataContext } from '@/context/DataContext'

import ActivitiesLayout from '@/components/Layouts/ActivitiesLayout'

import styles from '@/assets/styles/Page.module.css'

export default function StartQuiz() {
    const router = useRouter();
    const { isLogged } = useContext(DataContext);
    useEffect(() => {
        if (!isLogged) {
            router.push("/auth/login?returnTo=dashboard/cuestionario/final");
        }
    }, [isLogged, router]);
    return (
        <>
            <Head>
                <title>Cuestionario final</title>
            </Head>
            <main className={styles.main}>
                <ActivitiesLayout>
                    <h3>Cuestionario final</h3>
                </ActivitiesLayout>
            </main>
        </>
    )
}
