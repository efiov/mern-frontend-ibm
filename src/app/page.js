'use client'
import styles from './page.module.css'
import Register from '../components/organisms/register'
export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Get started by editing&nbsp;</p>
      </div>
      <Register />
    </main>
  )
}
