import Link from 'next/link'
import Image from 'next/image'

import style from '@/assets/styles/Page.module.css'

import chevronIcon from '@/assets/icons/chevron.svg'

export default function BackLink({link, text}) {
    return (
        <>
            <Link href={link ? link : "/dashboard"} className={style.backLink}>
                <Image src={chevronIcon} alt='Back icon' className={style.chevron} width={24} height={24} />
                {text ? text : "Panel"}
            </Link>
        </>
    )
}
