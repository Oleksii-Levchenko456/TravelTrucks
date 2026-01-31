'use client'

import { useEffect } from 'react'
import { CatalogList } from '../CatalogList/CatalogList'
import { FiltersPanel } from '../FiltersPanel/FiltersPanel'
import { useCampersStore } from '@/store/useCampersStore'
import css from './CatalogPage.module.css'

export function CatalogPage() {
  const campers = useCampersStore((state) => state.campers)
  const loadCampers = useCampersStore((state) => state.loadCampers)

  useEffect(() => {
    if (campers.length === 0) {
      loadCampers()
    }
  }, [campers, loadCampers])

  return (
    <>
      <div className={css.container}>
        <FiltersPanel />
        <CatalogList />
      </div>
    </>
  )
}
