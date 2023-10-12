import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { SERVER_URL } from '@/config'

import { DataContext } from '@/context/DataContext'

import DashboardLayout from '@/components/Layouts/DashboardLayout'

import style from '@/assets/styles/Page.module.css'

export default function StudentStartQuizAnswers({userId}) {
    const [answers, setAnswers] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${SERVER_URL}/questions/answers/user-id/${userId}`, {
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
                            <div className='row'>
                                <p className='col'>
                                    {answer.question_id}
                                </p>
                                <p className='col'>
                                    {answer.answer}
                                </p>
                            </div>
                        ))}
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
