import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { SERVER_URL } from '@/config'

import { DataContext } from '@/context/DataContext'

import PageLayout from '@/components/Layouts/PageLayout'
import StartQuizGraph from '@/components/Graphs/StartQuizGraph'

import style from '@/assets/styles/Page.module.css'

function formatCatName(name) {
  return name.replace(/\s+/g, '');
}


const QuestionCategory = ({ category, questions }) => {
  const formattedCategory = formatCatName(category);

  return (
    <div className={style.accordionItem + ' accordion-item'}>
      <h2 className={style.accordionHeader + ' accordion-header'}>
        <button type='button' className={style.accordionBtn + ' accordion-button collapsed'} data-bs-toggle="collapse" data-bs-target={`#collapse${formattedCategory}`} aria-expanded="false" aria-controls={`collapse${formattedCategory}`}>
          {category}
        </button>
      </h2>
      <div id={`collapse${formattedCategory}`} className={style.accordionContent + " accordion-collapse collapse"}>
        <div className={style.accordionBody + ' accordion-body'}>
          {(questions && questions.length > 0) ? questions.map(question => (
            question.type === category && 
            <div className={style.row + ' row'}>
              <div className={style.col + ' col'}>
                <p>{question.id}</p>
              </div>
              <div className={style.col + ' col'}>
                <p>{question.question}</p>
              </div>
              <div className={style.col + ' col'}>
                <input type="checkbox" name="" id="" checked={!question.hidden} />
                <button>Ocultar</button>
                <button>Editar</button>
                <button>Eliminar</button>
              </div>
            </div>
          )) : <p>
            No hay preguntas en esta categoria
          </p>}
        </div>
      </div>
    </div>
  )
}


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
                <main className={style.main}>
                    <PageLayout>
                        <div className={style.row + ' row'}>
                            <div className={style.col + ' col'}>
                                <Link href={"/dashboard"} className={style.backLink}>{"< Panel"}</Link>
                                <h4>Cuestionario inicial</h4>
                            </div>
                        </div>
                        <div className={style.accordion + ' accordion'}>
                            <QuestionCategory category="Pasion y Compromiso" questions={questions} />
                            <QuestionCategory category="Habilidades Interpersonales y Trabajo en Equipo" questions={questions} />
                            <QuestionCategory category="Pensamiento Analitico" questions={questions} />
                            <QuestionCategory category="Investigacion y Resolucion de Problemas" questions={questions} />
                        </div>
                    </PageLayout>
                </main>
            </>
        )
}
