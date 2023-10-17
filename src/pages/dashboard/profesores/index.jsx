import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

import { DataContext } from '@/context/DataContext'

import PageLayout from '@/components/Layouts/PageLayout'
import TeachersTable from '@/components/TeachersTable'
import BackLink from '@/components/Widgets/BackLink'

import style from '@/assets/styles/Page.module.css'

export default function Teachers() {
    const router = useRouter();
    const { isLogged, user } = useContext(DataContext);
    useEffect(() => {
        if (!isLogged) {
            router.push("/auth/login?returnTo=dashboard/profesores");
        }
        if (!user.super) {
            router.push("/dashboard");
        }
    }, [isLogged, router]);
    return (
        <>
            <Head>
                <title>Profesores</title>
            </Head>
            <main className={style.main}>
                <PageLayout>
                    <div>
                        <BackLink />
                        <h3>Profesores</h3>
                    </div>
                    <TeachersTable />
                </PageLayout>
            </main>
        </>
    )
}
