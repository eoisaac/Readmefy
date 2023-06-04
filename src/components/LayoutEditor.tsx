import { en_US } from '@/data/templates/templates-en_US'
import { HTMLAttributes, useState } from 'react'
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd'
import { twMerge } from 'tailwind-merge'
import { TemplateItem } from './TemplateItem'

interface TemplateItemProps {
  id: string
  label: string
  markdown: string
}

interface LayoutEditorProps extends HTMLAttributes<HTMLUListElement> {
  onLayoutChange: (event: string) => void
}

export const LayoutEditor = ({
  onLayoutChange,
  ...rest
}: LayoutEditorProps) => {
  const [items, setItems] = useState<TemplateItemProps[]>(en_US)
  const [selectedItems, setSelectedItems] = useState<TemplateItemProps[]>([])

  const { className } = rest

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const updatedItems = [...selectedItems]
    const [movedItem] = updatedItems.splice(result.source.index, 1)
    updatedItems.splice(result.destination.index, 0, movedItem)

    setSelectedItems(updatedItems)
  }

  const handleSelectedItemClick = () => {
    console.log('clicked')
  }

  const handleRemoveItem = (item: TemplateItemProps) => {
    const updatedItems = items.filter((i) => i.id !== item.id)
    setItems(updatedItems)
  }

  const handleSelectItem = (item: TemplateItemProps) => {
    const updatedSelectedItems = [...selectedItems, item]
    setSelectedItems(updatedSelectedItems)
    handleRemoveItem(item)
  }

  return (
    <div className={twMerge('relative', className)}>
      <div
        className="absolute inset-0 flex flex-col gap-4
      md:gap-6 lg:gap-8"
      >
        <section className="relative flex-1 overflow-auto">
          <header className="sticky top-0 bg-slate-100">
            <h3 className="font-medium">Layout</h3>
          </header>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="list">
              {(provided) => (
                <ul
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  {...rest}
                  className="flex flex-col items-stretch gap-2 p-[2px] pr-1"
                >
                  {selectedItems.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <TemplateItem
                          ref={provided.innerRef}
                          id={item.id}
                          label={item.label}
                          markdown={item.markdown}
                          provided={provided}
                          onClick={handleSelectedItemClick}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </section>

        <section className="relative flex-1 overflow-auto">
          <header className="sticky top-0 bg-slate-100">
            <h3 className="font-medium">Sections</h3>
          </header>
          <ul className="flex flex-col items-stretch gap-2 p-[2px] pr-1">
            {items.map((item) => (
              <TemplateItem
                key={item.id}
                id={item.id}
                label={item.label}
                markdown={item.markdown}
                onSelected={handleSelectItem}
              />
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
