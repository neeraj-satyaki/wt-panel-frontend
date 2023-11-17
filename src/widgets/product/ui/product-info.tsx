import { useSliderProduct } from '../model/use-slider-product'
import { SliderImagesOfProduct } from './slider-images-of-product'

export const ProductInfo = ({ id }: { id: string | string[] }) => {
  const { isShow, open, close, sliderRef } = useSliderProduct()

  return (
    <div className="flex gap-2">
      <div
        className="w-64 h-52 bg-gray-300 rounded-lg cursor-pointer"
        onClick={() => open()}
      ></div>
      <div>
        <div>Кронштейн</div>
        <div>Кронштейн - описание</div>
        <div>14 999 Р</div>
      </div>

      {isShow && <SliderImagesOfProduct sliderRef={sliderRef} close={close} />}
    </div>
  )
}
