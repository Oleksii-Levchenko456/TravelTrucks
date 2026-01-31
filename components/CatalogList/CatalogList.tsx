'use client'

import { useCampersStore } from '@/store/useCampersStore'
import Image from 'next/image'
import Link from 'next/link'
import css from './CatalogList.module.css'
import { FEATURES_CONFIG, FeatureKey } from '@/constants/featuresConfig'
import { Icon } from '../IconTag/IconTag'

export function CatalogList() {
  const campers = useCampersStore((state) => state.campers)
  const loadCampers = useCampersStore((state) => state.loadCampers)

  const favorites = useCampersStore((state) => state.favorites)
  const toggleFavorite = useCampersStore((state) => state.toggleFavorite)

  const isFavorite = (id: string) => favorites.includes(id)

  return (
    <div className={css.container}>
      {campers.map((camper) => {
        const tags = Object.entries(camper)
          .filter(([_, value]) => typeof value === 'boolean' && value)
          .map(([key]) => key as FeatureKey)

        return (
          <div key={camper.id} className={css.outsideWrapperCard}>
            <div className={css.wrapperCard}>
              <div className={css.photo}>
                <Image
                  src={camper.gallery[0].thumb}
                  alt={camper.name}
                  fill
                  style={{
                    objectFit: 'cover',
                    objectPosition: '60% center',
                  }}
                />
              </div>

              <div className={css.info}>
                <div className={css.topLineInfo}>
                  <h2 className={css.headerAuto}>{camper.name}</h2>
                  <div className={css.displayDiv}>
                    <p className={css.headerAuto}>€{camper.price}.00</p>
                    {isFavorite(camper.id) ? (
                      <span
                        onClick={() => toggleFavorite(camper.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        ❤️
                      </span>
                    ) : (
                      <svg
                        className={css.iconLike}
                        onClick={() => toggleFavorite(camper.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <use href="/sprite.svg#like" />
                      </svg>
                    )}
                  </div>
                </div>
                <div className={css.ratingLocation}>
                  <p className={css.rating}>
                    ⭐{camper.rating} ({camper.reviews.length} reviews)
                  </p>
                  <p>{camper.location}</p>
                </div>

                <p className={css.description}>{camper.description}</p>

                <ul className={css.divTags}>
                  {tags.map((tag) => {
                    const feature = FEATURES_CONFIG[tag]

                    if (!feature) return null

                    return (
                      <li key={tag} className={css.tag}>
                        <Icon name={feature.icon} />
                        <span>{feature.label}</span>
                      </li>
                    )
                  })}
                </ul>

                <Link href={`/catalog/${camper.id}`} className={css.button}>
                  Show more
                </Link>
              </div>
            </div>
          </div>
        )
      })}

      <button onClick={loadCampers} className={css.buttonLoadMore}>
        Load more
      </button>
    </div>
  )
}
