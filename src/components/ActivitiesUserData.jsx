import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { SERVER_URL } from '@/config'

import { DataContext } from '@/context/DataContext'

import BackLink from './Widgets/BackLink'

import style from '@/assets/styles/Page.module.css'

export default function ActivityUserData({userId}) {
    const { formatDatetime, setModalActive, setModalCloseable, setModalContent } = useContext(DataContext);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState(null);

    useEffect(() => {
        const fetchAnswers = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${SERVER_URL}/activities/answers/user/${userId}`, {
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
        fetchAnswers();
    }, [userId]);
    return (
        <>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <>
                    {answers && answers.length > 0 ? (
                        answers.map((answer, index) => (
                            <div key={index} className='col-12 col-sm-6'>
                                <div className={style.answerContainer + ' container'}>
                                    <div className={style.answerContent}>
                                        <p className={style.title3}>
                                            Actividad {answer.activity_id}
                                        </p>
                                        <p>
                                            {formatDatetime(answer.created_at)}
                                        </p>
                                        {answer.file_path ? <Image src={SERVER_URL + "/" + answer.file_path} width={720} height={720} /> : <></>}
                                        {/* <Image src={`${SERVER_URL}/activities/download/${userId}/${answer.activity_id}`} width={720} height={720} /> */}
                                        <p className='mt-2'>{answer.answer}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay evidencias</p>
                    )}
                </>
            )}
        </>
    )
}
