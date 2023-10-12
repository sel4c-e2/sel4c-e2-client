import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

import { DataContext } from '@/context/DataContext'

import style from '@/assets/styles/Page.module.css'

export default function ActivityLink({id, num, name, instructions, questions, deliverables, answerType}) {
    const { formatInstructions } = useContext(DataContext);
    return (
        <>
            <Link href={"/dashboard/actividades/" + id} className={style.column + ' col-12 col-sm-6 col-md-4'}>
                <div className={style.columnContainer + ' container'}>
                    <h5>{name}</h5>
                    {formatInstructions(instructions, 80)}
                </div>
            </Link>
        </>
    )
}
