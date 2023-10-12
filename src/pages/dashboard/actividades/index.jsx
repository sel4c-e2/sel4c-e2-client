import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

import { DataContext } from '@/context/DataContext'

import ActivitiesLayout from '@/components/Layouts/ActivitiesLayout'
import Activity from '@/components/Activity'

import style from '@/assets/styles/Page.module.css'

export default function Students() {
    const router = useRouter();
    const { isLogged } = useContext(DataContext);
    useEffect(() => {
        if (!isLogged) {
            router.push("/auth/login?returnTo=dashboard/actividades");
        }
    }, [isLogged, router]);
    return (
        <>
            <Head>
                <title>Actividades</title>
            </Head>
            <main className={style.main}>
                <ActivitiesLayout>
                    <h3>Actividades</h3>
                    <div className={style.activitiesContainer + ' row'}>
                        <Activity
                            name={"Actividad 1"}
                        />
                    </div>
                </ActivitiesLayout>
            </main>
        </>
    )
}
