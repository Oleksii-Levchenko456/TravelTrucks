'use client'

import { useState } from 'react'
import Image from 'next/image'
import css from './PageCamper.module.css'
import { Camper } from '@/types'
import { FeatureKey, FEATURES_CONFIG } from '@/constants/featuresConfig'
import toast, { Toaster } from 'react-hot-toast'
import { CustomDatePicker } from '../CustomDatePicker/CustomDatePicker'

type Props = {
  camper: Camper
}

export function PageCamper({ camper }: Props) {
  const [activeTab, setActiveTab] = useState<'features' | 'reviews'>('features')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  const features = (Object.keys(FEATURES_CONFIG) as FeatureKey[]).filter(
    (key) => camper[key]
  )

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    toast.success('Message sent successfully')

    e.currentTarget.reset()
  }

  return (
    <div className={css.page}>
      {/* HEADER */}
      <div className={css.header}>
        <div>
          <h1 className={css.title}>{camper.name}</h1>
          <div className={css.meta}>
            <span>⭐ {camper.rating}</span>
            <span>({camper.reviews.length} reviews)</span>
            <span>•</span>
            <span>{camper.location}</span>
          </div>
          <p className={css.price}>€{camper.price}.00</p>
        </div>
      </div>

      {/* GALLERY */}
      <div className={css.gallery}>
        {camper.gallery.map((img, i) => (
          <div key={i} className={css.galleryItem}>
            <Image
              src={img.original}
              alt={`${camper.name} photo ${i + 1}`}
              fill
              className={css.galleryImg}
            />
          </div>
        ))}
      </div>

      {/* DESCRIPTION */}
      <div className={css.descriptionDiv}>
        <p className={css.description}>{camper.description}</p>
        <div className={css.tabs}>
          <button
            className={`${css.tabButton} ${
              activeTab === 'features' ? css.activeTab : ''
            }`}
            onClick={() => setActiveTab('features')}
          >
            Features
          </button>
          <button
            className={`${css.tabButton} ${
              activeTab === 'reviews' ? css.activeTab : ''
            }`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className={css.bottom}>
        {/* LEFT SIDE */}
        <div
          className={`${css.left} ${
            activeTab === 'reviews' ? css['left-reviews'] : ''
          }`}
        >
          {activeTab === 'features' ? (
            <>
              <div className={css.block}>
                <ul className={css.features}>
                  {features.map((key) => {
                    const feature = FEATURES_CONFIG[key]
                    return (
                      <li key={key} className={css.featureItem}>
                        <svg className={css.icon}>
                          <use href={`/sprite.svg#${feature.icon}`} />
                        </svg>
                        <span>{feature.label}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>

              <div className={css.block}>
                <div className={css.divBottomLine}>
                  <h3 className={css.blockTitle}>Vehicle details</h3>
                </div>

                <ul className={css.details}>
                  <li>
                    <span>Form</span>
                    <span>{camper.form}</span>
                  </li>
                  <li>
                    <span>Length</span>
                    <span>{camper.length}</span>
                  </li>
                  <li>
                    <span>Width</span>
                    <span>{camper.width}</span>
                  </li>
                  <li>
                    <span>Height</span>
                    <span>{camper.height}</span>
                  </li>
                  <li>
                    <span>Tank</span>
                    <span>{camper.tank}</span>
                  </li>
                  <li>
                    <span>Consumption</span>
                    <span>{camper.consumption}</span>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className={css.review}>
              {camper.reviews.map((review, i) => (
                <div key={i}>
                  <div className={css.reviewHeader}>
                    <div className={css.avatar}>
                      <p className={css.nameOnAvatar}>
                        {review.reviewer_name[0]}
                      </p>
                    </div>
                    <div className={css.nameAndRating}>
                      <strong className={css.reviewer_name}>
                        {review.reviewer_name}
                      </strong>
                      <span className={css.stars}>
                        {'⭐'.repeat(review.reviewer_rating)}
                      </span>
                    </div>
                  </div>
                  <p className={css.comment}>{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SIDE — FORM */}
        <div className={css.right}>
          <h3 className={css.formTitle}>Book your campervan now</h3>
          <p className={css.description}>
            Stay connected! We are always ready to help you.
          </p>
          <form className={css.form} onSubmit={submitHandler}>
            <input className={css.input} placeholder="Name*" required />

            <input
              className={css.input}
              placeholder="Email*"
              type="email"
              required
            />
            <CustomDatePicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />

            <textarea className={css.textarea} placeholder="Comment" />

            <button type="submit" className={css.sendButton}>
              Send
            </button>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
