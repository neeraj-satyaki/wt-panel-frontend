import { A11y, Navigation, Zoom } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/zoom'

import { IconCross } from '@/shared/ui/icons/icon-cross'
import Image from 'next/image'
import { images } from './config'

export const SliderImagesOfProduct = ({ sliderRef, close }: { sliderRef: any; close: Function }) => {
  return (
    <div className="fixed w-full min-h-screen left-0 top-0 bg-black/60 flex flex-col justify-center items-center">
      <button onClick={() => close()}>
        <IconCross className="text-white absolute right-6 top-6" />
      </button>
      <div className="w-[80vw] laptop:w-[70%] h-[100vh]" ref={sliderRef}>
        <Swiper
          zoom={true}
          className="w-full h-full"
          modules={[Navigation, A11y, Zoom]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {images.map((image, i) => {
            return (
              <SwiperSlide key={i}>
                <div className="swiper-zoom-container">
                  <Image width={1920} height={1080} src={image.url} alt="Автомагнитола" className="w-full h-full" />
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}
