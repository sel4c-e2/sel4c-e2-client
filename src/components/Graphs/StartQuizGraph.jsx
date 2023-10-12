import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {Chart,ArcElement} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { SERVER_URL } from '@/config'

import { DataContext } from '@/context/DataContext'

import DashboardLayout from '@/components/Layouts/DashboardLayout'

import styles from '@/assets/styles/Page.module.css'

Chart.register(ArcElement)

export default function StartQuizGraph() {
    const [example, setExample] = useState(null);

    const cakeGraph = {
        labels: ['Totalmente De Acuerdo', 'De Acuerdo', 'Ni Acuerdo ni Desacuerdo', 'Desacuerdo', 'Totalmente en Desacuerdo'],
        datasets: [
            {
                label: 'Resultados Cuestionario Inicial - Pasión y Compromiso',
                data: [2,4,3,2,1],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const cakeGraph2 = {
        labels: ['Totalmente De Acuerdo', 'De Acuerdo', 'Ni Acuerdo ni Desacuerdo', 'Desacuerdo', 'Totalmente en Desacuerdo'],
        datasets: [
            {
                label: 'Resultados Cuestionario Inicial - Habilidades Iniciales',
                data: [4,3,1,1,3],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const cakeGraph3 = {
        labels: ['Totalmente De Acuerdo', 'De Acuerdo', 'Ni Acuerdo ni Desacuerdo', 'Desacuerdo', 'Totalmente en Desacuerdo'],
        datasets: [
            {
                label: 'Resultados Cuestionario Inicial - Pensamiento',
                data: [7,0,1,2,2],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const cakeGraph4 = {
        labels: ['Totalmente De Acuerdo', 'De Acuerdo', 'Ni Acuerdo ni Desacuerdo', 'Desacuerdo', 'Totalmente en Desacuerdo'],
        datasets: [
            {
                label: 'Resultados Cuestionario Inicial - Investigación',
                data: [7,4,1,2,2],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    

    // useEffect(() => {
        
    // }, []);
    
    return (
        <div className={styles.pageContent}>
            <div className={styles.chartContainer}>
                <div className={styles.chart}>
                    <Doughnut data={cakeGraph} />
                </div>
                <div className={styles.chart}>
                    <Doughnut data={cakeGraph2} />
                </div>
                <div className={styles.chart}>
                    <Doughnut data={cakeGraph3} />
                </div>
                <div className={styles.chart}>
                    <Doughnut data={cakeGraph4} />
                </div>
            </div>
        </div>
    );
}
