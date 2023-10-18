import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { SERVER_URL } from '@/config'

import { DataContext } from '@/context/DataContext'

import PageLayout from '@/components/Layouts/PageLayout'
import ActivityData from '@/components/ActivityData'

import style from '@/assets/styles/Page.module.css'

export default function Activity() {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { activityId } = router.query;
    const { isLogged } = useContext(DataContext);
    useEffect(() => {
        if (activityId) {
            setLoading(false);
            if (!isLogged) {
                router.push("/auth/login?returnTo=dashboard/actividades/" + router.query.activityId);
            }
        }
    }, [isLogged, router, activityId]);
    return (
        <>
            <PageLayout>
                {loading ? <p>
                    Cargando...
                </p> : <>
                    <ActivityData activityId={activityId} />
                </>}
            </PageLayout>
        </>
    )
}
