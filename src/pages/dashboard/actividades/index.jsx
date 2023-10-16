import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { SERVER_URL } from '@/config'

import { DataContext } from '@/context/DataContext'

import ActivitiesLayout from '@/components/Layouts/ActivitiesLayout'
import ActivityLink from '@/components/ActivityLink'

import style from '@/assets/styles/Page.module.css'

export default function Activities() {
    const router = useRouter();
    const { isLogged } = useContext(DataContext);
    const [activities, setActivities] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${SERVER_URL}/activities`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                console.log(data.activities);
                setActivities(data.activities);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setLoading(false);
        };

        if (!isLogged) {
            router.push("/auth/login?returnTo=dashboard/actividades");
        } else {
            fetchData();
        }
    }, [isLogged, router]);
    return (
        <>
            <Head>
                <title>Actividades</title>
            </Head>
            <main className={style.main}>
                <ActivitiesLayout>
                    <Link href={"/dashboard"} className={style.backLink}>{"< Panel"}</Link>
                    <h3>Actividades</h3>
                    {loading ? <p>
                        Cargando actividades...
                    </p> : <div className={style.activitiesContainer + ' row'}>
                        {(activities && activities.length > 0) ? activities.map((activity, index) => (
                            <ActivityLink
                                key={activity.id}
                                id={activity.id}
                                num={activity.activity_number}
                                name={activity.activity_name}
                                instructions={activity.instructions}
                                questions={activity.questions}
                                deliverables={activity.deliverables}
                                answerType={activity.answer_type}
                            />
                        )) : <p>
                            No hay actividades
                        </p>}
                    </div>}
                </ActivitiesLayout>
            </main>
        </>
    )
}
