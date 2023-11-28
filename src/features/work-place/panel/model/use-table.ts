export function getColorProcessing(processing: string) {
  switch (processing) {
    case 'Обращение':
      return 'bg-[#FFFB93]'
    case 'Заявка':
      return 'bg-[#FFA6A6]'
    case 'Сборка':
      return 'bg-[#70F45A]'
    case 'Продажа':
      return 'bg-[#FB7FEF]'
    case 'Отправка в тк':
      return 'bg-[#8A63FA]'
    case 'Отправка в тк':
      return 'bg-[#60E2FF]'
    case 'Отправлено клиенту':
      return 'bg-[#60E2FF]'
    case 'Упаковка':
      return 'bg-[#C67700]'
    case 'Заказ получен':
      return 'bg-[#55FFE0]'
    default:
      return ''
  }
}
