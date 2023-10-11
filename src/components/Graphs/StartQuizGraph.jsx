import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { SERVER_URL } from '@/config'

import { DataContext } from '@/context/DataContext'

import DashboardLayout from '@/components/Layouts/DashboardLayout'

import styles from '@/assets/styles/Page.module.css'

export default function StartQuizGraph() {
    const [] = useState(null);

    useEffect(() => {
        
    }, []);
    
    return (
        <>
            hola
        </>
    )
}
