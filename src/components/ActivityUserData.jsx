import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { SERVER_URL } from '@/config'

import { DataContext } from '@/context/DataContext'

import BackLink from './Widgets/BackLink'

import style from '@/assets/styles/Page.module.css'

export default function ActivityUserData({activityId, userId}) {
    const { formatDatetime, setModalActive, setModalCloseable, setModalContent } = useContext(DataContext);
    const [message, setMessage] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnswer = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${SERVER_URL}/activities/answers/${activityId}/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                console.log(data);
                setMessage(data.message);
                setAnswer(data.answer);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setLoading(false);
        };
        fetchAnswer();
    }, []);
    return (
        <>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <>
                    <div className='col-12 col-sm-6'>
                        <div className={style.answerContainer + ' container'}>
                            <div className={style.answerContent}>
                                <p className={style.title3}>
                                    Actividad {activityId}
                                </p>
                                {answer ? <>
                                    {answer.file_path ? <Image src={SERVER_URL + "/" + answer.file_path} width={720} height={720} /> : <></>}
                                    <p>{answer.answer}</p>
                                </> : <p>
                                    {message}
                                </p>}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
