import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/assets/styles/Home.module.css'
import landingImg from '@/assets/img/landing-img.png';

export default function Home() {
  return (
    <>
      <Head>
        <title>SEL4C</title>
      </Head>
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerContainer + ' container'}>
            <div className={styles.content + ' row'}>
              <div className={styles.column + ' col-12 col-sm-6'}>
                <h1>
                  Descubre, Aprende, Transforma
                </h1>
                <p>
                  Desbloquea tu potencial para el cambio social a través del aprendizaje interactivo. Únete a nuestra comunidad y crea un impacto real.
                </p>
              </div>
              <div className={styles.column + ' col-12 col-sm-6'}>
                <Image src={landingImg} alt='Landing Image' />
              </div>
            </div>
          </div>
        </header>
      </main>
    </>
  )
}
