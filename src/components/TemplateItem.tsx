import { useEditor } from '@/contexts/EditorContext'
import { ArrowCounterClockwise, Trash } from '@phosphor-icons/react'
import { HTMLAttributes, forwardRef } from 'react'
import { DraggableProvided } from 'react-beautiful-dnd'
import { twMerge } from 'tailwind-merge'
import { Button } from './Button'

export interface Template {
  id: string
  label: string
  markdown: string
}

interface TemplateItemProps extends HTMLAttributes<HTMLLIElement> {
  id: string
  label: string
  markdown: string
  provided?: DraggableProvided
  onItemSelect: (item: Template) => void
}

export const TemplateItem = forwardRef<HTMLLIElement, TemplateItemProps>(
  (
    { id, label, markdown, provided, onItemSelect, ...rest }: TemplateItemProps,
    ref,
  ) => {
    const { currentTemplate } = useEditor()
    const { className } = rest

    const isSelected = currentTemplate?.id === id

    const handleOnSelect = () => {
      onItemSelect({ id, label, markdown })
    }

    const handleResetTemplate = () => {
      console.log('reset template')
    }

    const handleDeleteTemplate = () => {
      console.log('delete template')
    }

    return (
      <li
        ref={ref}
        className={twMerge(
          `flex cursor-pointer select-none items-center justify-between
          rounded-md bg-slate-200 px-4 py-2 text-left active:shadow-md`,
          isSelected ? 'bg-indigo-500 text-slate-50' : '',
          className,
        )}
        onClick={handleOnSelect}
        style={{ ...provided?.draggableProps.style }}
        {...provided?.draggableProps}
        {...provided?.dragHandleProps}
        {...rest}
      >
        <strong className="font-normal">{label}</strong>

        {isSelected && (
          <div className="inline-flex items-center gap-1">
            <Button
              label="Reset current template"
              icon={<ArrowCounterClockwise />}
              variant="primary"
              size="xxs"
              onClick={handleResetTemplate}
              srLabel
            />
            <Button
              label="Delete current template"
              icon={<Trash />}
              variant="primary"
              size="xxs"
              onClick={handleDeleteTemplate}
              srLabel
            />
          </div>
        )}
      </li>
    )
  },
)

TemplateItem.displayName = 'TemplateItem'
