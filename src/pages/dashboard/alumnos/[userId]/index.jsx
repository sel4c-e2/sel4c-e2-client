import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { SERVER_URL } from '@/config'

import { DataContext } from '@/context/DataContext'

import DashboardLayout from '@/components/Layouts/DashboardLayout'
import PageLayout from '@/components/Layouts/PageLayout'
import StudentStartQuizAnswers from '@/components/StudentStartQuizAnswers'
import BackLink from '@/components/Widgets/BackLink'

import style from '@/assets/styles/Page.module.css'
import styleDashboard from '@/assets/styles/Dashboard.module.css'

export default function Alumno() {
    const router = useRouter();
    const { userId } = router.query;
    const { isLogged } = useContext(DataContext);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${SERVER_URL}/users/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                console.log(data);
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
            setLoading(false);
        };

        if (userId) {
            fetchData();
        }

        if (!loading) {
            if (!isLogged) {
                router.push("/auth/login?returnTo=dashboard/alumnos/" + router.query.userId);
            }
        }
    }, [isLogged, router, userId, loading]);
    return (
        <>
            <Head>
                <title>Alumno</title>
            </Head>
            <main className={style.main}>
                <DashboardLayout>
                    {loading ? 'Cargando...' : <>
                    <div className={styleDashboard.mainCard + ' col-12'}>
                        <div className={styleDashboard.contentCard}>
                            <div className={styleDashboard.containerCard + ' container'}>
                                <div className='row'>
                                    <div className='col-12'>
                                        <BackLink link={"/dashboard/alumnos"} text={"Atras"} />
                                        <br />
                                        <br />
                                        <p className={style.title1}>
                                            {userData.name} {userData.lastname}
                                        </p>
                                        <p className={style.title3 + ' d-inline ms-4'}>
                                            #{userData.user_id}
                                        </p>
                                    </div>
                                    <div className='col-3'>
                                        <p className={style.mutedText}>
                                            Edad:
                                            <br />
                                            {userData.age} años
                                        </p>
                                    </div>
                                    <div className='col-3'>
                                        <p className={style.mutedText}>
                                            Genero:
                                            <br />
                                            {userData.gender}
                                        </p>
                                    </div>
                                    <div className='col-3'>
                                        <p className={style.mutedText}>
                                            Pais:
                                            <br />
                                            {userData.country_name}
                                        </p>
                                    </div>
                                    <div className='col-3'>
                                        <p className={style.mutedText}>
                                            Universidad:
                                            <br />
                                            {userData.university_name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        

                        {/* <h5>Cuestionario inicial:</h5>
                        <div className='row'>
                            <div className='col'>
                                <p>Pregunta</p>
                            </div>
                            <div className='col'>
                                <p>Respuesta</p>
                            </div>
                        </div>
                        {!loading && <StudentStartQuizAnswers userId={userId} />} */}
                    </>}
                </DashboardLayout>
            </main>
        </>
    )
}
