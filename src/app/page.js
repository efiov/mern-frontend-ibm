import Image from 'next/image'
import styles from './page.module.css'
import Button from '../components/atoms/Button'
import Input from '../components/atoms/Input'
import SearchBar from '../components/molecules/SearchBar'
import Header from '../components/organisms/Header'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.js</code>
        </p>
      </div>
      <div>
        <Input label="Input" />
      </div>
      <Button label="Button" />
      <SearchBar />
      <Header />
    </main>
  )
}
