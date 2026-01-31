'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import css from './Header.module.css'

export default function Header() {
  const pathname = usePathname()

  return (
    <div className={css.header}>
      <div>
        <span className={css.spanTravel}>Travel</span>
        <span className={css.spanTrucks}>Trucks</span>
      </div>

      <div className={css.headerNavigator}>
        <Link href="/" className={pathname === '/' ? css.active : ''}>
          Home
        </Link>

        <Link
          href="/catalog"
          className={pathname === '/catalog' ? css.active : ''}
        >
          Catalog
        </Link>
      </div>
    </div>
  )
}
