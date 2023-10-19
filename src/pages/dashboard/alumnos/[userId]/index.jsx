import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { SERVER_URL } from '@/config'

import { DataContext } from '@/context/DataContext'

import DashboardLayout from '@/components/Layouts/DashboardLayout'
import PageLayout from '@/components/Layouts/PageLayout'
import StudentQuizAnswers from '@/components/StudentQuizAnswers'
import BackLink from '@/components/Widgets/BackLink'

import style from '@/assets/styles/Page.module.css'
import styleDashboard from '@/assets/styles/Dashboard.module.css'
import styleForm from '@/assets/styles/Form.module.css'

export default function Alumno() {
    const router = useRouter();
    const { userId } = router.query;
    const { isLogged, user } = useContext(DataContext);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    const deleteUser = async (id, token) => {
        const confirmed = window.confirm("Seguro que quieres eliminar a este alumno?");
        if (!confirmed) {
            return;
        }
        try {
            const response = await fetch(`${SERVER_URL}/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.ok) {
                console.log('User deleted successfully');
                router.push('/dashboard/alumnos');
            } else {
                const data = await response.json();
                console.error('Error deleting user:', data.message);
            }
        } catch (tcErr) {
            console.error('Error deleting user:', tcErr);
        }
    };
    

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
                    <div className={styleDashboard.mainCard2 + ' col-12'}>
                        <div className={styleDashboard.contentCard}>
                            <div className={styleDashboard.containerCard + ' container'}>
                                <div className='row'>
                                    <div className='col-12'>
                                        <BackLink link={"/dashboard/alumnos"} text={"Atras"} />
                                        <br />
                                        <br />
                                        <div className='row'>
                                            <div className='col-8'>
                                                <p className={style.title1}>
                                                    {userData.name} {userData.lastname}
                                                </p>
                                                <p className={style.title3 + ' d-inline ms-4'}>
                                                    #{userData.user_id}
                                                </p>
                                            </div>
                                            {user.super ? <div className='col-4 text-end'>
                                                <button onClick={() => deleteUser(userId, user.token)} className={styleForm.deleteBtn}>Eliminar alumno</button>
                                            </div> : <></>}
                                        </div> 
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
                    <div className={styleDashboard.card2 + ' col-12 col-sm-6'}>
                        <div className={styleDashboard.contentCard}>
                            <div className={styleDashboard.containerCard + ' container'}>
                                <div>
                                    <p className={styleDashboard.bigText}>Cuestionario inicial</p>
                                </div>
                                <div className='row'>
                                    <div className={style.leftColumn + ' col-8'}>
                                        <p>Pregunta</p>
                                    </div>
                                    <div className='col-4'>
                                        <p>Respuesta</p>
                                    </div>
                                </div>
                                {!loading && <StudentQuizAnswers userId={userId} type="all" display="start" />}
                            </div>
                        </div>
                    </div>
                    <div className={styleDashboard.card2 + ' col-12 col-sm-6'}>
                        <div className={styleDashboard.contentCard}>
                            <div className={styleDashboard.containerCard + ' container'}>
                                <div>
                                    <p className={styleDashboard.bigText}>Cuestionario final</p>
                                </div>
                                <div className='row'>
                                    <div className={style.leftColumn + ' col-8'}>
                                        <p>Pregunta</p>
                                    </div>
                                    <div className='col-4'>
                                        <p>Respuesta</p>
                                    </div>
                                </div>
                                {!loading && <StudentQuizAnswers userId={userId} type="all" display="end" />}
                            </div>
                        </div>
                    </div>
                    <div className={styleDashboard.card2 + ' col-12'}>
                        <div className={styleDashboard.contentCard}>
                            <div className={styleDashboard.containerCard + ' container'}>
                                <div>
                                    <p className={styleDashboard.bigText}>Actividades</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </>}
                </DashboardLayout>
            </main>
        </>
    )
}
