import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { SERVER_URL } from '@/config'

import { DataContext } from '@/context/DataContext'

import PageLayout from '@/components/Layouts/PageLayout'
import StartQuizGraph from '@/components/Graphs/StartQuizGraph'
import BackLink from '@/components/Widgets/BackLink'

import style from '@/assets/styles/Page.module.css'

export default function StartQuizAnswers() {
    const router = useRouter();
    const { isLogged } = useContext(DataContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${SERVER_URL}/questions/display/start`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                console.log(data.questions);
                setQuestions(data.questions);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (!isLogged) {
            router.push("/auth/login?returnTo=dashboard/cuestionario/inicial/respuestas");
        } else {
            fetchData();
        }
    }, [isLogged, router]);
    return (
            <>
                <Head>
                    <title>Cuestionario inicial</title>
                </Head>
                <main className={style.main}>
                    <PageLayout>
                        <div className={style.row + ' row'}>
                            <div className={style.col + ' col'}>
                              <BackLink />
                              <h4 className={style.title4 + ' mt-4'}>Respuestas cuestionario inicial</h4>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-3'></div>
                            <div className='col-6'>
                              <StartQuizGraph />
                            </div>
                          <div className='col-3'></div>
                        </div>
                    </PageLayout>
                </main>
            </>
        )
}
