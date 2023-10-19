import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { SERVER_URL } from '@/config'

import { DataContext } from '@/context/DataContext'

import DashboardLayout from '@/components/Layouts/DashboardLayout'
import LogoutButton from '@/components/Forms/LogoutButton'

import styles from '@/assets/styles/Home.module.css'
import stylesPage from '@/assets/styles/Page.module.css'
import stylesDashboard from '@/assets/styles/Dashboard.module.css'

export default function Dashboard() {
    const router = useRouter();
    const { isLogged, user } = useContext(DataContext);
    const [usersCount, setUsersCount] = useState(null);
    const [adminsCount, setAdminsCount] = useState(null);
    const [activitiesCount, setActivitiesCount] = useState(null);
    useEffect(() => {
        if (!isLogged) {
            router.push("/auth/login?returnTo=dashboard");
        }
        fetch(`${SERVER_URL}/users/count`)
            .then(response => response.json())
            .then(data => setUsersCount(data.count))
            .catch(error => console.error('Error fetching students count:', error));
        fetch(`${SERVER_URL}/activities/count`)
            .then(response => response.json())
            .then(data => setActivitiesCount(data.count))
            .catch(error => console.error('Error fetching students count:', error));
        if (user.super) {
            fetch(`${SERVER_URL}/admins/count`)
                .then(response => response.json())
                .then(data => setAdminsCount(data.count))
                .catch(error => console.error('Error fetching students count:', error));
        }
    }, [isLogged, router]);
    return (
        <>
            <Head>
                <title>Panel</title>
            </Head>
            <main className={styles.main}>
                <DashboardLayout>
                    <div className={stylesDashboard.mainCard + ' col-12'}>
                        <div className={stylesDashboard.contentCard}>
                            <div className={stylesDashboard.containerCard + ' container'}>
                                <h1>
                                    {user.super ? 'Panel de administrador' : 'Panel de profesor'}
                                </h1>
                                <div className='row'>
                                    <div className='col-6 col-sm-3'>
                                        <h3>
                                            <Link href={"/dashboard/alumnos"}>
                                                Alumnos
                                            </Link>
                                        </h3>
                                        <p className={stylesDashboard.bigText}>
                                            {usersCount !== null ? usersCount : 'Cargando...'}
                                        </p>
                                    </div>
                                    {user.super ? <div className='col-6 col-sm-3'>
                                        <h3>
                                            <Link href={"/dashboard/profesores"}>
                                                Profesores
                                            </Link>
                                        </h3>
                                        <p className={stylesDashboard.bigText}>
                                            {adminsCount !== null ? adminsCount : 'Cargando...'}
                                        </p>
                                    </div> : <></>}
                                    <div className='col-6 col-sm-3'>
                                        <h3>
                                            <Link href={"/account"}>
                                                Mi cuenta
                                            </Link>
                                        </h3>
                                        <p className={stylesDashboard.bigText}>
                                            {user.name} {user.lastname}
                                        </p>
                                    </div>
                                </div>
                                <br />
                                <LogoutButton />
                            </div>
                        </div>
                    </div>
                    <div className={stylesDashboard.card + ' col-12 col-sm-4'}>
                        <div className={stylesDashboard.contentCard}>
                            <div className={stylesDashboard.containerCard + ' container'}>
                                <div>
                                    <p className={stylesDashboard.bigText}>Actividades</p>
                                    <h3>
                                        <Link href={"/dashboard/actividades"}>
                                            {activitiesCount !== null ? activitiesCount : 'Cargando...'} actividades
                                        </Link>
                                    </h3>
                                </div>
                                <Link href={"/dashboard/actividades"} className={stylesPage.btnType1}>
                                    Ver actividades
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={stylesDashboard.card + ' col-12 col-sm-4'}>
                        <div className={stylesDashboard.contentCard}>
                            <div className={stylesDashboard.containerCard + ' container'}>
                                <p className={stylesDashboard.bigText}>Cuestionario inicial</p>
                                <div className='row'>
                                    <div className='col-12'>
                                        {user.super ? <>
                                            <Link href={"/dashboard/cuestionario/inicial"} className={stylesPage.btnType2}>
                                                Ver preguntas
                                            </Link>
                                            <br />
                                        </> : <></>}
                                        <Link href={"/dashboard/cuestionario/inicial/respuestas"} className={stylesPage.btnType1}>
                                            Ver resultados
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={stylesDashboard.card + ' col-12 col-sm-4'}>
                        <div className={stylesDashboard.contentCard}>
                            <div className={stylesDashboard.containerCard + ' container'}>
                                <p className={stylesDashboard.bigText}>Cuestionario final</p>
                                <div className='row'>
                                    <div className='col-12'>
                                        {user.super ? <>
                                            <Link href={"/dashboard/cuestionario/final"} className={stylesPage.btnType2}>
                                                Ver preguntas
                                            </Link>
                                            <br />
                                        </> : <></>}
                                        <Link href={"/dashboard/cuestionario/final/respuestas"} className={stylesPage.btnType1}>
                                            Ver resultados
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </DashboardLayout>
            </main>
        </>
    )
}
