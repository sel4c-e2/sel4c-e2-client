import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

import style from '@/assets/styles/Page.module.css'

export default function Activity({name}) {
    return (
        <>
            <div className={style.column + ' col-12 col-sm-6 col-md-4'}>
                <div className={style.columnContainer + ' container'}>
                    {name}
                </div>
            </div>
        </>
    )
}
