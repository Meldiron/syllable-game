import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Syllable Game</title>
        <meta name="description" content="Playful way to learn word spelling." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="#">Syllable Game!</a>
        </h1>

        <p className={styles.description}>
          Generage game at{' '}
          <code className={styles.code}>/api/game</code>
        </p>

        <div className={styles.grid}>
          <a href="#" className={styles.card}>
            <h2>Title</h2>
            <p>Set using <code className={styles.code}>topic</code> parameter.</p>
          </a>

          <a href="#" className={styles.card}>
            <h2>Words</h2>
            <p>Set using <code className={styles.code}>words</code> parameter. Use comma to separate words.</p>
          </a>

          <a
            href="#"
            className={styles.card}
          >
            <h2>Secret</h2>
            <p>Set using <code className={styles.code}>extra</code> parameter.</p>
          </a>

          <a className={styles.card} target="_blank"
            rel="noopener noreferrer" href="/api/game?words=piano,guitar,ukulele,trumpet,flute&topic=Music">

            <div>
              <h2>See in Action!</h2>
              <p>
                To see demo, click here.
              </p>
            </div>

          </a>
        </div>
      </main>
    </div >
  )
}
