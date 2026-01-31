// config/features.ts
export const FEATURES_CONFIG = {
  AC: {
    label: 'AC',
    icon: 'wind',
  },
  kitchen: {
    label: 'Kitchen',
    icon: 'cup-hot',
  },
  radio: {
    label: 'Radio',
    icon: 'radio',
  },
  TV: {
    label: 'TV',
    icon: 'tv',
  },
  bathroom: {
    label: 'Bathroom',
    icon: 'ph_shower',
  },
  refrigerator: {
    label: 'Refrigerator',
    icon: 'solar_fridge-outline',
  },
} as const

export type FeatureKey = keyof typeof FEATURES_CONFIG
