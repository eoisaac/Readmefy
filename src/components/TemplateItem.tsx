import { HTMLAttributes, forwardRef } from 'react'
import { DraggableProvided } from 'react-beautiful-dnd'
import { twMerge } from 'tailwind-merge'

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
    const { className } = rest

    const handleOnSelect = () => {
      onItemSelect({ id, label, markdown })
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
            `w-full rounded-md bg-slate-200 px-4 py-2 text-left`,
            className,
          )}
          onClick={handleOnSelect}
        >
          {label}
        </button>
      </li>
    )
  },
)

TemplateItem.displayName = 'TemplateItem'
