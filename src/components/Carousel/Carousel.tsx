import { useState } from 'react'
import styles from './Carousel.module.scss'

type CarouselProps = {
  images: string[]
}

export default function Carousel({ images }: CarouselProps) {
  const [imageIndex, setImageIndex] = useState<number>(0)

  const selectImage = (index: number) => {
    return () => {
      setImageIndex(index)
    }
  }

  const selectedImage = images[imageIndex]

  return (
    <div className={styles.carousel}>
      <div className={styles.selectedImage}>
        <img src={selectedImage} alt='' />
      </div>
      {images.length > 1 && (
        <div className={styles.thumbnails}>
          {images.map((image, index) => (
            <div
              key={image}
              className={styles.thumbnail}
              onClick={selectImage(index)}
            >
              <img src={image} alt='' />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}