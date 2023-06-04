import { HTMLAttributes, forwardRef } from 'react'
import { DraggableProvided } from 'react-beautiful-dnd'
import { twMerge } from 'tailwind-merge'

interface TemplateItemProps extends HTMLAttributes<HTMLLIElement> {
  id: string
  label: string
  markdown: string
  provided?: DraggableProvided
  onSelected?: (item: TemplateItemProps) => void
}

export const TemplateItem = forwardRef<HTMLLIElement, TemplateItemProps>(
  (
    { id, label, markdown, provided, onSelected, ...rest }: TemplateItemProps,
    ref,
  ) => {
    const { className } = rest

    const handleOnSelected = () => {
      onSelected && onSelected({ id, label, markdown })
    }

    return (
      <li
        ref={ref}
        className="active:shadow-md"
        style={{ ...provided?.draggableProps.style }}
        {...provided?.draggableProps}
        {...provided?.dragHandleProps}
        {...rest}
      >
        <button
          className={twMerge(
            `w-full rounded-md bg-slate-200 px-4 py-2
            text-left`,
            className,
          )}
          onClick={handleOnSelected}
        >
          {label}
        </button>
      </li>
    )
  },
)

TemplateItem.displayName = 'TemplateItem'
