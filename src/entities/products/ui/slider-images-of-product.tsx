import { A11y, Zoom, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/zoom'
import 'swiper/css/pagination'

import Image from 'next/image'
import { IconCross } from '@/shared/ui/icons/icon-cross'

export default function SliderImagesOfProduct({
  close,
  photos,
}: {
  close: Function
  photos: string[]
}) {
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
          {photos.map((photo, i) => {
            return (
              <SwiperSlide key={i}>
                <div className="swiper-zoom-container">
                  <Image width={1920} height={1080} src={photo} alt="" />
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}
