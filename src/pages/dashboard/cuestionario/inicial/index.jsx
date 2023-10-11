import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { SERVER_URL } from '@/config'

import { DataContext } from '@/context/DataContext'

import DashboardLayout from '@/components/Layouts/DashboardLayout'
import StartQuizGraph from '@/components/Graphs/StartQuizGraph'

import styles from '@/assets/styles/Page.module.css'

export default function StartQuiz() {
    const router = useRouter();
    const { isLogged } = useContext(DataContext);
    const [questions, setQuestions] = useState(null);
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
            router.push("/auth/login?returnTo=dashboard/cuestionario/inicial");
        } else {
            fetchData();
        }
    }, [isLogged, router]);
    return (
        <>
            <Head>
                <title>Cuestionario inicial</title>
            </Head>
            <main className={styles.main}>
                <DashboardLayout>
                    <div className={styles.row + ' row'}>
                        <div className={styles.col + ' col'}>
                            <h3>Cuestionario inicial</h3>
                        </div>
                        {/* <div className={styles.col + ' col'}>
                            <button>Nueva pregunta</button>
                        </div> */}
                    </div>
                    <div className={styles.accordion + ' accordion'}>
                        <div className={styles.accordionItem + ' accordion-item'}>
                            <h2 className={styles.accordionHeader + ' accordion-header'}>
                                <button type='button' className={styles.accordionBtn + ' accordion-button collapsed'} data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                    Pasion y Compromiso
                                </button>
                            </h2>
                            <div id="collapseOne" className={styles.accordionContent + " accordion-collapse collapse"}>
                                <div className={styles.accordionBody + ' accordion-body'}>
                                {(questions && questions.length > 0) ? questions.map(question => (
                                    question.type === "Pasion y Compromiso" && <div className={styles.row + ' row'}>
                                        <div className={styles.col + ' col'}>
                                            <p>{question.id}</p>
                                        </div>
                                        <div className={styles.col + ' col'}>
                                            <p>{question.question}</p>
                                        </div>
                                        <div className={styles.col + ' col'}>
                                            <input type="checkbox" name="" id="" checked={!question.hidden} />
                                        </div>
                                    </div>
                                )) : <p>
                                    No hay preguntas en esta categoria
                                </p>}
                                </div>
                            </div>
                        </div>
                        <div className={styles.accordionItem + ' accordion-item'}>
                            <h2 className={styles.accordionHeader + ' accordion-header'}>
                                <button type='button' className={styles.accordionBtn + ' accordion-button collapsed'} data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Habilidades Interpersonales y Trabajo en Equipo
                                </button>
                            </h2>
                            <div id="collapseTwo" className={styles.accordionContent + " accordion-collapse collapse"}>
                                <div className={styles.accordionBody + ' accordion-body'}>
                                    {(questions && questions.length > 0) ? questions.map(question => (
                                        question.type === "Habilidades Interpersonales y Trabajo en Equipo" && <div className={styles.row + ' row'}>
                                            <div className={styles.col + ' col'}>
                                                <p>{question.id}</p>
                                            </div>
                                            <div className={styles.col + ' col'}>
                                                <p>{question.question}</p>
                                            </div>
                                            <div className={styles.col + ' col'}>
                                                <input type="checkbox" name="" id="" checked={!question.hidden} />
                                            </div>
                                        </div>
                                    )) : <p>
                                        No hay preguntas en esta categoria
                                    </p>}
                                </div>
                            </div>
                        </div>
                        <div className={styles.accordionItem + ' accordion-item'}>
                            <h2 className={styles.accordionHeader + ' accordion-header'}>
                                <button type='button' className={styles.accordionBtn + ' accordion-button collapsed'} data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    Pensamiento Analitico
                                </button>
                            </h2>
                            <div id="collapseThree" className={styles.accordionContent + " accordion-collapse collapse"}>
                                <div className={styles.accordionBody + ' accordion-body'}>
                                    {(questions && questions.length > 0) ? questions.map(question => (
                                        question.type === "Pensamiento Analitico" && <div className={styles.row + ' row'}>
                                            <div className={styles.col + ' col'}>
                                                <p>{question.id}</p>
                                            </div>
                                            <div className={styles.col + ' col'}>
                                                <p>{question.question}</p>
                                            </div>
                                            <div className={styles.col + ' col'}>
                                                <input type="checkbox" name="" id="" checked={!question.hidden} />
                                            </div>
                                        </div>
                                    )) : <p>
                                        No hay preguntas en esta categoria
                                    </p>}
                                </div>
                            </div>
                        </div>
                        <div className={styles.accordionItem + ' accordion-item'}>
                            <h2 className={styles.accordionHeader + ' accordion-header'}>
                                <button type='button' className={styles.accordionBtn + ' accordion-button collapsed'} data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                    Investigacion y Resolucion de Problemas
                                </button>
                            </h2>
                            <div id="collapseFour" className={styles.accordionContent + " accordion-collapse collapse"}>
                                <div className={styles.accordionBody + ' accordion-body'}>
                                    {(questions && questions.length > 0) ? questions.map(question => (
                                        question.type === "Investigacion y Resolucion de Problemas" && <div className={styles.row + ' row'}>
                                            <div className={styles.col + ' col'}>
                                                <p>{question.id}</p>
                                            </div>
                                            <div className={styles.col + ' col'}>
                                                <p>{question.question}</p>
                                            </div>
                                            <div className={styles.col + ' col'}>
                                                <input type="checkbox" name="" id="" checked={!question.hidden} />
                                            </div>
                                        </div>
                                    )) : <p>
                                        No hay preguntas en esta categoria
                                    </p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <StartQuizGraph />
                </DashboardLayout>
            </main>
        </>
    )
}
