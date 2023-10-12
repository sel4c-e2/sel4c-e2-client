import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

import { DataContext } from '@/context/DataContext'

import DashboardLayout from '@/components/Layouts/DashboardLayout'
import StudentStartQuizAnswers from '@/components/StudentStartQuizAnswers'

import styles from '@/assets/styles/Home.module.css'

export default function Alumno() {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { userId } = router.query;
    const { isLogged } = useContext(DataContext);
    useEffect(() => {
        if (userId) {
            setLoading(false)
        }
        if (!loading) {
            if (!isLogged) {
                router.push("/auth/login?returnTo=dashboard/alumnos/" + router.query.userId);
            }
        }
    }, [isLogged, router, userId]);
    return (
        <>
            <Head>
                <title>Alumno</title>
            </Head>
            <main className={styles.main}>
                <DashboardLayout>
                    <p>Alumno {userId}</p>
                    <h5>Cuestionario inicial:</h5>
                    <div className='row'>
                        <div className='col'>
                            <p>Pregunta</p>
                        </div>
                        <div className='col'>
                            <p>Respuesta</p>
                        </div>
                    </div>
                    {!loading && <StudentStartQuizAnswers userId={userId} />}
                </DashboardLayout>
            </main>
        </>
    )
}
