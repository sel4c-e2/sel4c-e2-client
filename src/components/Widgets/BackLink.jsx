import Link from 'next/link'
import Image from 'next/image'

import style from '@/assets/styles/Page.module.css'

export default function BackLink({link, text}) {
    return (
        <>
            <Link href={link ? link : "/dashboard"} className={style.backLink}>{text ? "< " + text : "< Panel"}</Link>
        </>
    )
}
