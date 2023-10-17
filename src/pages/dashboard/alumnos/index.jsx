import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

import { DataContext } from '@/context/DataContext'

import PageLayout from '@/components/Layouts/PageLayout'
import StudentsTable from '@/components/StudentsTable'
import BackLink from '@/components/Widgets/BackLink'

import style from '@/assets/styles/Page.module.css'

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
            <main className={style.main}>
                <PageLayout>
                    <div>
                        <BackLink />
                        <h4>Alumnos</h4>
                    </div>
                    <StudentsTable />
                </PageLayout>
            </main>
        </>
    )
}
