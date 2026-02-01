'use client'

import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import css from './CustomDatePicker.module.css'

type Props = {
  selectedDate: Date | undefined
  setSelectedDate: (date: Date | undefined) => void
}

export function CustomDatePicker({ selectedDate, setSelectedDate }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className={css.customDatePicker}>
      <input
        type="text"
        value={selectedDate ? selectedDate.toLocaleDateString() : ''}
        placeholder="Select date*"
        readOnly
        onClick={() => setOpen(!open)}
        className={css.input}
      />
      {open && (
        <DayPicker
          className={css.rdp_months}
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            setSelectedDate(date)
            setOpen(false)
          }}
        />
      )}
    </div>
  )
}
