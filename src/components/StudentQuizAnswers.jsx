import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { SERVER_URL } from '@/config'

import { DataContext } from '@/context/DataContext'

import DashboardLayout from '@/components/Layouts/DashboardLayout'

import style from '@/assets/styles/Page.module.css'

export default function StudentQuizAnswers({userId, type, display}) {
    const [answers, setAnswers] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    
    const getAnswerText = (numericAnswer) => {
        switch (numericAnswer) {
            case 1:
                return "Totalmente en desacuerdo";
            case 2:
                return "En desacuerdo";
            case 3:
                return "Ni de acuerdo ni en desacuerdo";
            case 4:
                return "De acuerdo";
            case 5:
                return "Totalmente de acuerdo";
            default:
                return "Respuesta desconocida";
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${SERVER_URL}/questions/answers/${display}/user-id/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                console.log(data);
                console.log(data.answers);
                setMessage(data.message);
                setAnswers(data.answers);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);
    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                answers ? (
                    <div>
                        {answers.map((answer, index) => (
                            (type === answer.type || type === "all") && (
                                <div className='row'>
                                    <div className={style.leftColumn + ' col-8'}>
                                        <p><strong>{answer.question_id}:</strong> {answer.question}</p>
                                    </div>
                                    <div className='col-4'>
                                        <p>{getAnswerText(answer.answer)}</p>
                                    </div>
                                </div>
                            )))}
                    </div>
                ) : (
                    <div>
                        {message}
                    </div>
                )
            )}
        </>
    )
}