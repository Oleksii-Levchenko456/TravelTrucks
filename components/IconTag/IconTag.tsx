// components/Icon.tsx
type IconProps = {
  name: string
  size?: number
}

export function Icon({ name, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size}>
      <use href={`/sprite.svg#${name}`} />
    </svg>
  )
}
