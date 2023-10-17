import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { SERVER_URL } from '@/config';

import { DataContext } from '@/context/DataContext'

import style from '@/assets/styles/Page.module.css'

export default function ActivityLink({id, num, name, instructions, questions, deliverables, answerType}) {
    const { formatInstructions } = useContext(DataContext);
    const [ answersCount, setAnswersCount ] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${SERVER_URL}/activities/count/answers/${id}`);
                const data = await response.json();
                console.log(data);
                setAnswersCount(data.count);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <>
            <Link href={"/dashboard/actividades/" + id} className={style.column + ' col-12 col-sm-6 col-md-4'}>
                <div className={style.columnContainer + ' container'}>
                    <div className={style.columnContent}>
                        <h5>{name}</h5>
                        <p className={style.text}>
                            {formatInstructions(instructions, 100)}
                        </p>
                        <p className={style.title3}>
                            {answersCount} respuestas
                        </p>
                    </div>
                </div>
            </Link>
        </>
    )
}
