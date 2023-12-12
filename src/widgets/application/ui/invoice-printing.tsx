import { useRef, useState } from 'react'
import ReactToPrint from 'react-to-print'
import { useGetCheck } from '@/entities/panel/queries'
import { UiPageSpinner } from '@/shared/ui/components/ui-page-spinner'
import { InvoiceItem } from '@/shared/api/generated'
import { Case, Gender, numeralize } from 'numeralize-ru'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { Button } from '@/shared/ui/components/ui/button'

type Props = {
  id: string
}

export function InvoicePrintring({ id }: Props) {
  const { data, isLoading, isError } = useGetCheck(id)
  const componentRef = useRef(null)

  const [show, setShow] = useState(false)

  if (isLoading) {
    return <UiPageSpinner />
  }
  if (isError) {
    return <div>Ошибка</div>
  }
  if (!data?.data.length) {
    return <div>Данные не получены</div>
  }

  const priceText = numeralize(+data.info.allsum, Gender.Masculine, Case.Nominative)
  const priceForForm = priceText.charAt(0).toUpperCase() + priceText.slice(1)
  return (
    <>
      <Button variant={'primary'} onClick={() => setShow(true)}>
        Печать
      </Button>
      {show && (
        <div className="absolute left-0 top-0 w-full bg-white flex flex-col  py-20 1024:py-10">
          <UiHeading level={'1'} className="self-center text-center">
            Печать счёта на оплату
          </UiHeading>
          <div
            className="w-[600px] p-10 print:w-full 1024:self-center"
            ref={componentRef}
          >
            <table className="table-auto border-2 border-black w-full text-[10px]">
              <tbody className="border border-black">
                <tr>
                  <td colSpan={2} className="">
                    {data.info.bank}
                  </td>
                  <td className="border-2 border-black pl-[3px] w-[50px]">БИК</td>
                  <td className="w-1/3">{data.info.bikbank}</td>
                </tr>
                <tr className="h-[20px] border-b-2 border-black">
                  <td colSpan={2} className="align-bottom">
                    Банк получателя
                  </td>
                  <td className="align-top border-2 border-black">Сч. №</td>
                  <td className="w-1/3 align-top">{data.info.schetbank}</td>
                </tr>
                <tr>
                  <td className="border-2 border-black">
                    ИНН {data.info.innorganization}
                  </td>
                  <td className="border-2 border-black">
                    КПП {data.info.kpporganization}
                  </td>
                  <td className="border-r-2 border-black">Сч. №</td>
                  <td className="w-1/3">{data.info.schetorganization}</td>
                </tr>
                <tr>
                  <td className="w-[350px]" colSpan={2}>
                    {data.info.organization}
                  </td>
                  <td className="border-x-2 border-black"></td>
                  <td className="w-1/3"></td>
                </tr>
                <tr>
                  <td colSpan={2} className="h-[25px] align-bottom">
                    Получатель
                  </td>
                  <td className="border-x-2 border-black"></td>
                  <td className="w-1/3"></td>
                </tr>
              </tbody>
            </table>
            <div className="text-base pl-2 py-2 border-b-2 border-black">
              Счёт на оплату №{data.info.num} от {data.info.date}г.
            </div>
            <table>
              <tbody>
                <tr>
                  <td className="w-[100px] align-top text-[12px]">
                    Поставщик (Исполнитель)
                  </td>
                  <td className="font-semibold text-[10px]">{data.info.provider}</td>
                </tr>
                <tr>
                  <td className="align-top text-[12px]">Покупатель (Заказчик)</td>
                  <td className="font-semibold text-xs">{data.info.buyer}</td>
                </tr>
              </tbody>
            </table>
            <table className="border-2 border-black text-[10px] w-full">
              <thead>
                <tr>
                  <th className="border-2 border-black">№</th>
                  <th className="border-2 border-black">Товары (работы, услуги)</th>
                  <th className="border-2 border-black w-[45px]">Кол-во</th>
                  <th className="border-2 border-black">Ед.</th>
                  <th className="border-2 border-black">Цена</th>
                  <th className="border-2 border-black">Сумма</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((row: InvoiceItem) => (
                  <tr key={`row_${row.position}`}>
                    <td className="border-2 border-black">{row.position}</td>
                    <td className="border-2 border-black min-w-[348px]">{row.name}</td>
                    <td className="border-2 border-black text-right align-top">
                      {row.count}
                    </td>
                    <td className="border-2 border-black min-w-[30px] align-top text-center">
                      шт
                    </td>
                    <td className="border-2 border-black w-[80px] text-right pr-[3px] align-top">
                      {row.cost},00
                    </td>
                    <td className="border-2 border-black w-[80px] text-right pr-[3px] align-top">
                      {row.sum},00
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table className="w-full text-[10px]">
              <tbody>
                <tr>
                  <td className="w-[518px] text-right font-semibold">Итого:</td>
                  <td className="w-[80px] text-right font-semibold">
                    {data.info.sum},00
                  </td>
                </tr>
                <tr>
                  <td className="w-[518px] text-right font-semibold">В том числе НДС:</td>
                  <td className="w-[80px] text-right font-semibold">
                    {data.info.withnds}
                  </td>
                </tr>
                <tr>
                  <td className="w-[518px] text-right font-semibold">Всего к оплате:</td>
                  <td className="w-[80px] text-right font-semibold">
                    {data.info.allsum},00
                  </td>
                </tr>
                <tr>
                  <td>
                    Всего наименований {data.data.length.toString()}, на сумму{' '}
                    {data.info.allsum},00 RUB
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td className="font-semibold">{priceForForm} рублей 00 копеек</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <div className="text-[8px] mt-4 border-b-2 border-black">
              <p>
                Внимание! Оплата данного счета означает согласие с условиями поставки
                товара.
              </p>
              <p>
                Уведомление об оплате обязательно, в противном случае не гарантируется
                наличие товара на складе.
              </p>
              <p>
                Товар отпускается по факту прихода денег на р/с Поставщика, самовывозом,
                при наличии доверенности и паспорта.
              </p>
            </div>
            <div className="flex justify-between mt-4 text-[12px]">
              <table className="w-[48%]">
                <tbody>
                  <tr>
                    <td className="w-1/4 font-semibold text-right">Руководитель</td>
                    <td className="w-1/2 border-b-2 border-black"></td>
                    <td className="w-1/4 border-b-2 border-black text-[10px] text-right align-bottom">
                      {data.info.director}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="w-[48%]">
                <tbody>
                  <tr>
                    <td className="w-1/4 font-semibold text-right">Бухгалтер</td>
                    <td className="w-1/2 border-b-2 border-black"></td>
                    <td className="w-1/4 border-b-2 border-black text-[10px] text-right align-bottom">
                      {data.info.buh}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex gap-2 justify-center w-full">
            <Button variant={'primary'} onClick={() => setShow(false)} className="px-4">
              Назад
            </Button>
            <ReactToPrint
              trigger={() => (
                <button className="bg-green-600 text-lg font-medium px-4 py-2 rounded-xl  text-white">
                  Распечатать
                </button>
              )}
              content={() => componentRef.current}
            />
          </div>
        </div>
      )}
    </>
  )
}
