import css from './HomePage.module.css'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className={css.hero}>
      <div className={css.heroDiv}>
        <h1 className={css.heroHeader}>Campers of your dreams</h1>
        <h2 className={css.heroDescription}>
          You can find everything you want in our catalog
        </h2>
        <Link href="/catalog" className={`${css.button} ${css.buttonHero} `}>
          Catalog
        </Link>
      </div>
    </div>
  )
}
