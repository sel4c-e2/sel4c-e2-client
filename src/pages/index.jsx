import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/assets/styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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
                <Image src={""} alt='Header Image' />
              </div>
            </div>
          </div>
        </header>
      </main>
    </>
  )
}
