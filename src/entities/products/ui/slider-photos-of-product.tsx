import { A11y, Zoom, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/zoom'
import 'swiper/css/pagination'
import Image from 'next/image'
import { IconCross } from '@/shared/ui/icons/icon-cross'
import { useState, useEffect } from 'react'

export default function SliderImagesOfProduct({
  close,
  photos,
}: {
  close: Function
  photos: string[]
}) {
  const [imageLoadings, setImageLoadings] = useState(photos.map(() => true))
  const [loadedImages, setLoadedImages] = useState(new Set<number>())

  const handleImageLoad = (index: number) => {
    const updatedLoadings = [...imageLoadings]
    updatedLoadings[index] = false
    setImageLoadings(updatedLoadings)
    setLoadedImages((prevLoadedImages) => new Set(prevLoadedImages).add(index))
  }

  const resetImageLoadings = () => {
    setImageLoadings(photos.map((_, i) => loadedImages.has(i)))
  }

  useEffect(() => {
    resetImageLoadings()
  }, [photos, loadedImages])

  return (
    <div
      className="fixed top-0 left-0 w-full h-screen bg-black/60 z-20 backdrop-blur"
      onClick={() => close()}
    >
      <button className="text-white right-4 top-4 absolute z-20">
        <IconCross />
      </button>

      <div
        className="text-white font-bold text-2xl overflow-hidden mx-auto h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <Swiper
          pagination={{
            type: 'fraction',
          }}
          zoom={true}
          className="h-full"
          modules={[A11y, Zoom, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          scrollbar={{ draggable: true }}
        >
          {photos.map((photo, i) => (
            <SwiperSlide key={i}>
              <div className="swiper-zoom-container">
                {!imageLoadings[i] && (
                  <div className="text-white text-center absolute">Загрузка...</div>
                )}
                <Image
                  width={1920}
                  height={1080}
                  src={photo}
                  alt=""
                  onLoad={() => handleImageLoad(i)}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
