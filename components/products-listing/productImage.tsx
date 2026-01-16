import Image from 'next/image'
import { useState } from 'react'

type Props = {
  src: string
  alt: string
  className?: string
}

export default function SafeImage({ src, alt, className }: Props) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <Image
      src={imgSrc || '/images/dish.png'}
      alt={alt}
      fill
      className={className}
      onError={() => setImgSrc('/images/dish.png')}
    />
  )
}
