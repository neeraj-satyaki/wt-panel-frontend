import { UiButton } from '@/shared/ui/components/ui-button'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { useChangeBlock } from '../model/use-learning'
import { learningBlocks } from './config'

export function LearnModal({ endLearn }: { endLearn: () => void }) {
  const changeBlock = useChangeBlock()

  return (
    <div className="flex flex-col gap-6">
      <UiHeading level={'3'}>Добро пожаловать в панель</UiHeading>
      <div className="w-full bg-gray-200 h-[74vh] rounded-lg flex items-center justify-center flex-col">
        {learningBlocks.map((block, i: number) => {
          if (block.id === changeBlock.currentBlock) {
            return <div key={i}>{block.text}</div>
          }
        })}
      </div>
      <div className="grid grid-cols-2 w-1/4 mx-auto gap-2">
        <UiButton
          variant={'primary'}
          className="font-bold px-4 py-2"
          disabled={1 === changeBlock.currentBlock}
          onClick={() => changeBlock.prevBlock()}
        >
          Назад
        </UiButton>
        <UiButton
          variant={'primary'}
          className="font-bold px-4 py-2"
          disabled={learningBlocks.length === changeBlock.currentBlock}
          onClick={() => changeBlock.nextBlock()}
        >
          Вперёд
        </UiButton>
        {learningBlocks.length === changeBlock.currentBlock && (
          <UiButton
            variant={'primary'}
            className="font-bold px-4 py-2 col-span-2"
            disabled={learningBlocks.length != changeBlock.currentBlock}
            onClick={() => endLearn()}
          >
            Приступить к работе
          </UiButton>
        )}
      </div>
    </div>
  )
}
