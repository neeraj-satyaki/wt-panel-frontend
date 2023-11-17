import { UiButton } from '@/shared/ui/components/ui-button'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { useChangeBlock } from '../model/use-learning'
import { learningBlocks } from './config'

export function LearnModal({ endLearn }: { endLearn: () => void }) {
  const { currentBlock, setCurrentBlock } = useChangeBlock()

  return (
    <div className="flex flex-col gap-6">
      <UiHeading level={'3'}>Добро пожаловать в панель</UiHeading>
      <div className="w-full bg-gray-200 h-[74vh] rounded-lg flex items-center justify-center flex-col">
        {learningBlocks.map((block, i: number) => {
          if (block.id === currentBlock) {
            return <div key={i}>{block.text}</div>
          }
        })}
      </div>
      <div className="grid grid-cols-2 w-1/4 mx-auto gap-2">
        <UiButton
          variant={'primary'}
          className="font-bold px-4 py-2"
          disabled={1 === currentBlock}
          onClick={() => setCurrentBlock(currentBlock - 1)}
        >
          Назад
        </UiButton>
        <UiButton
          variant={'primary'}
          className="font-bold px-4 py-2"
          disabled={learningBlocks.length === currentBlock}
          onClick={() => setCurrentBlock(currentBlock + 1)}
        >
          Вперёд
        </UiButton>
        {learningBlocks.length === currentBlock && (
          <UiButton
            variant={'primary'}
            className="font-bold px-4 py-2 col-span-2"
            disabled={learningBlocks.length != currentBlock}
            onClick={() => endLearn()}
          >
            Приступить к работе
          </UiButton>
        )}
      </div>
    </div>
  )
}
