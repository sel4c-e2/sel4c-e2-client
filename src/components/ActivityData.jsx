import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { SERVER_URL } from '@/config'

import { DataContext } from '@/context/DataContext'

import BackLink from './Widgets/BackLink'

import style from '@/assets/styles/Page.module.css'

export default function ActivityData({activityId}) {
    const { formatDatetime, setModalActive, setModalCloseable, setModalContent } = useContext(DataContext);
    const [activity, setActivity] = useState(null);
    const [answers, setAnswers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [viewAnswer, setViewAnswer] = useState(null);

    const openModal = () => {
        setModalActive(true);
        setModalCloseable(true);
        setModalContent(
            <div className='col-12'>
                <h1>{activity.activity_name}</h1>
                <br />
                <p>{activity.instructions}</p>
                <br />
                <p>{activity.questions}</p>
                <br />
                <p>{activity.answer_type}</p>
                <br />
                <p>{activity.deliverables}</p>
            </div>
        );
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${SERVER_URL}/activities/${activityId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                console.log(data);
                setActivity(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setLoading(false);
        };
        const fetchAnswers = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${SERVER_URL}/activities/answers/${activityId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                console.log(data);
                setAnswers(data.answers);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setLoading(false);
        };
        fetchData();
        fetchAnswers();
    }, []);
    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                activity && (
                    <>
                        <div className='col-6'>
                            <BackLink link="/dashboard/actividades" text="Actividades" />
                            <br />
                            <br />
                        </div>
                        <div className='col-6 text-end'>
                            <button onClick={openModal}>Ver instrucciones</button>
                        </div>
                        {/* <div className='col-12'>
                            <h1>{activity.activity_name}</h1>
                            <br />
                            <p>{activity.instructions}</p>
                            <br />
                            <p>{activity.questions}</p>
                            <br />
                            <p>{activity.answer_type}</p>
                            <br />
                            <p>{activity.deliverables}</p>
                        </div> */}
                        <div className={style.leftColumn + ' col-12 col-sm-6'}>
                            <h4 className={style.title4}>
                                Actividad {activity.id} - {activity.activity_name}
                            </h4>
                            {!loading ? (
                                answers && answers.length > 0 ? (
                                    answers.map((answer, index) => (
                                        <div key={index} className='row'>
                                            <div className='col-1'>
                                                <p>{answer.user_id}</p>
                                            </div>
                                            <div className='col'>
                                                <p>{answer.name}</p>
                                            </div>
                                            <div className='col'>
                                                <p>{formatDatetime(answer.updated_at)}</p>
                                            </div>
                                            <div className='col'>
                                                <button onClick={() => setViewAnswer(answer.id)}>
                                                    Ver evidencia
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No hay evidencias para esta actividad</p>
                                )
                            ) : (
                                <p>Cargando...</p>
                            )}
                        </div>
                        <div className='col-12 col-sm-6'>
                            <h4 className={style.title4}>
                                Evidencia del alumno
                            </h4>
                            <div className={style.answerContainer + ' container'}>
                                <div className={style.answerContent}>
                                    {viewAnswer ? (
                                        answers.map((answer, index) => (
                                            answer.id === viewAnswer && (
                                                <>
                                                    {answer.file_path ? <Image src={SERVER_URL + "/" + answer.file_path} width={720} height={720} /> : <></>}
                                                    <p>{answer.answer}</p>
                                                </>
                                            )
                                        ))
                                    ) : (
                                        <p>Haz click en "Ver evidencia" para ver la evidencia de un alumno</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )
            )}
        </>
    )
}
