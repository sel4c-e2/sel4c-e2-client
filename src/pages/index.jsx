import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import style from '@/assets/styles/Home.module.css'
import stylePage from '@/assets/styles/Page.module.css'
import landingImg from '@/assets/img/landing-img.png';

export default function Home() {
  return (
    <>
      <Head>
        <title>SEL4C</title>
      </Head>
      <main className={style.main}>
        <header className={style.header}>
          <div className={style.headerContainer + ' container'}>
            <div className={style.content + ' row'}>
              <div className={style.column + ' col-12 col-sm-6'}>
                <div className={style.columnContent}>
                  <h1>
                    Descubre, Aprende, Transforma
                  </h1>
                  <p>
                    Desbloquea tu potencial para el cambio social a través del aprendizaje interactivo. Únete a nuestra comunidad y crea un impacto real.
                  </p>
                  <Link href={"/auth/signup"} className={style.btn}>
                    Registrate
                  </Link>
                </div>
              </div>
              <div className={style.column + ' col-12 col-sm-6'}>
                <Image src={landingImg} alt='Landing Image' />
              </div>
            </div>
          </div>
        </header>
      </main>
    </>
  )
}
