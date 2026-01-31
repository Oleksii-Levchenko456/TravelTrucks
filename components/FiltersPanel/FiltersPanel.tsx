'use client'

import { useCampersStore } from '@/store/useCampersStore'
import { useState } from 'react'
import css from './FiltersPanel.module.css'
import { Filters } from '@/types'

export function FiltersPanel() {
  const [location, setLocation] = useState('')

  const [activeBooleanFilters, setActiveBooleanFilters] = useState<
    Record<string, boolean>
  >({})

  const toggleFilter = (key: keyof Filters) => {
    const newState = {
      ...activeBooleanFilters,
      [key]: !activeBooleanFilters[key],
    }

    setActiveBooleanFilters(newState)

    if (newState[key]) {
      setFilter(key, true)
    } else {
      setFilter(key, false)
    }
  }

  const setFilter = useCampersStore((state) => state.setFilter)
  const applyFilters = useCampersStore((state) => state.applyFilters)
  const [vehicleType, setVehicleType] = useState<
    'panelTruck' | 'fullyIntegrated' | 'alcove' | ''
  >('')
  const vehicleTypeLabels: Record<string, string> = {
    panelTruck: 'Panel Truck',
    fullyIntegrated: 'Fully Integrated',
    alcove: 'Alcove',
  }

  const resetFilters = useCampersStore((state) => state.resetFilters)

  const handleSearch = async () => {
    resetFilters()

    if (vehicleType) {
      setFilter('form', vehicleType)
    }

    // boolean filters
    Object.entries(activeBooleanFilters).forEach(([key, value]) => {
      if (value) setFilter(key as keyof Filters, true)
    })

    if (location.trim() !== '') {
      setFilter('location', location)
    }

    await applyFilters()
  }

  return (
    <>
      <div className={css.filters}>
        <label htmlFor="location" className={css.description}>
          Location
        </label>
        <input
          type="text"
          value={location}
          className={css.inputLocation}
          placeholder="Kyiv"
          id="location"
          onChange={(e) => {
            const value = e.target.value
            setLocation(value)
            setFilter('location', value)
          }}
        />
        <p className={css.description}>Filters</p>

        <p className={css.headerFilter}>Vehicle equipment</p>
        <hr className={css.hr} />
        <div className={css.divTags}>
          <button
            className={`${css.filterTagButton} ${
              activeBooleanFilters.AC ? css.active : ''
            }`}
            onClick={() => toggleFilter('AC')}
          >
            <svg className={css.icon}>
              <use href="/sprite.svg#wind"></use>
            </svg>
            AC
          </button>
          <button
            className={`${css.filterTagButton} ${
              activeBooleanFilters.kitchen ? css.active : ''
            }`}
            onClick={() => toggleFilter('kitchen')}
          >
            <svg className={css.icon}>
              <use href="/sprite.svg#cup-hot"></use>
            </svg>
            Kitchen
          </button>
          <button
            className={`${css.filterTagButton} ${
              activeBooleanFilters.TV ? css.active : ''
            }`}
            onClick={() => toggleFilter('TV')}
          >
            <svg className={css.icon}>
              <use href="/sprite.svg#tv"></use>
            </svg>
            TV
          </button>
          <button
            className={`${css.filterTagButton} ${
              activeBooleanFilters.bathroom ? css.active : ''
            }`}
            onClick={() => toggleFilter('bathroom')}
          >
            <svg className={css.icon}>
              <use href="/sprite.svg#ph_shower"></use>
            </svg>
            Bathroom
          </button>
          <button
            className={`${css.filterTagButton} ${
              activeBooleanFilters.radio ? css.active : ''
            }`}
            onClick={() => toggleFilter('radio')}
          >
            <svg className={css.icon}>
              <use href="/sprite.svg#radio"></use>
            </svg>
            Radio
          </button>
          <button
            className={`${css.filterTagButton} ${
              activeBooleanFilters.refrigerator ? css.active : ''
            }`}
            onClick={() => toggleFilter('refrigerator')}
          >
            <svg className={css.icon}>
              <use href="/sprite.svg#solar_fridge-outline"></use>
            </svg>
            Refrigerator
          </button>
          <button
            className={`${css.filterTagButton} ${
              activeBooleanFilters.microwave ? css.active : ''
            }`}
            onClick={() => toggleFilter('microwave')}
          >
            <svg className={css.icon}>
              <use href="/sprite.svg#lucide_microwave"></use>
            </svg>
            Microwave
          </button>
          <button
            className={`${css.filterTagButton} ${
              activeBooleanFilters.gas ? css.active : ''
            }`}
            onClick={() => toggleFilter('gas')}
          >
            <svg className={css.icon}>
              <use href="/sprite.svg#hugeicons_gas-stove"></use>
            </svg>
            Gas
          </button>
          <button
            className={`${css.filterTagButton} ${
              activeBooleanFilters.water ? css.active : ''
            }`}
            onClick={() => toggleFilter('water')}
          >
            <svg className={css.icon}>
              <use href="/sprite.svg#ion_water-outline"></use>
            </svg>
            Water
          </button>
        </div>
        <h3 className={css.headerFilter}>Vehicle type</h3>
        <hr className={css.hr} />
        <div className={css.vehicleType}>
          {(['panelTruck', 'fullyIntegrated', 'alcove'] as const).map(
            (type) => (
              <button
                key={type}
                className={`${css.vehicleTypeButton} ${
                  vehicleType === type ? css.active : ''
                }`}
                onClick={() => setVehicleType(type)}
              >
                {vehicleTypeLabels[type]}
              </button>
            )
          )}
        </div>

        <button className={css.button} onClick={handleSearch}>
          Search
        </button>
      </div>
    </>
  )
}
