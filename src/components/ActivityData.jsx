import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { SERVER_URL } from '@/config'

import { DataContext } from '@/context/DataContext'

import DashboardLayout from '@/components/Layouts/DashboardLayout'

import style from '@/assets/styles/Page.module.css'

export default function ActivityData({activityId}) {
    const [activity, setActivity] = useState(null);
    const [answers, setAnswers] = useState(null);
    const [loading, setLoading] = useState(true);
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
                        <div className=''>
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
                    </>
                )
            )}
        </>
    )
}
