import { en_US } from '@/data/templates/templates-en_US'
import { ArrowCounterClockwise } from '@phosphor-icons/react'
import { HTMLAttributes, useEffect, useState } from 'react'
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd'
import { twMerge } from 'tailwind-merge'
import { Button } from './Button'
import { Template, TemplateItem } from './TemplateItem'

interface LayoutEditorProps extends HTMLAttributes<HTMLUListElement> {
  onLayoutChange: (updatedLayoutContent: string) => void
  onSelectSection?: (sectionContent: string) => void
}

export const LayoutEditor = ({
  onLayoutChange,
  onSelectSection,
  ...rest
}: LayoutEditorProps) => {
  const [layoutItems, setLayoutItems] = useState<Template[]>([])
  const [sectionItems, setSectionItems] = useState<Template[]>(en_US)

  const { className } = rest

  useEffect(() => {
    const updatedLayoutContent = layoutItems
      .map((item) => item.markdown)
      .join('')
    onLayoutChange(updatedLayoutContent)

    return () => onLayoutChange('')
  }, [layoutItems, onLayoutChange])

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const updatedItems = [...layoutItems]
    const [movedItem] = updatedItems.splice(result.source.index, 1)
    updatedItems.splice(result.destination.index, 0, movedItem)

    setLayoutItems(updatedItems)
  }

  const handleRemoveSectionItem = (item: Template) => {
    const updatedItems = sectionItems.filter((i) => i.id !== item.id)
    setSectionItems(updatedItems)
  }

  const handleSelectSectionItem = (item: Template) => {
    const updatedSelectedItems = [...layoutItems, item]
    setLayoutItems(updatedSelectedItems)
    handleRemoveSectionItem(item)
  }

  const handleSelectLayoutItem = (item: Template) => {
    onSelectSection && console.log('From item', item)
    onSelectSection && onSelectSection(item.markdown)
  }

  const handleResetAllItems = () => {
    setLayoutItems([])
    setSectionItems(en_US)
  }

  return (
    <div className={twMerge('relative', className)}>
      <div
        className="absolute inset-0 flex flex-col gap-4
      md:gap-6 lg:gap-8"
      >
        <section className="relative flex-1 overflow-auto p-1">
          <header
            className="sticky -top-1 flex h-10 items-center
          justify-between bg-slate-100 p-1"
          >
            <h3 className="font-medium">Layout</h3>
            <Button
              label="Reset"
              title="Reset Layout"
              icon={<ArrowCounterClockwise size={18} />}
              variant="link"
              size="fit"
              onClick={handleResetAllItems}
            />
          </header>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="list">
              {(provided) => (
                <ul
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  {...rest}
                  className="m-1 flex flex-col items-stretch gap-2"
                >
                  {layoutItems.map((item, index) => (
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
                          onItemSelect={handleSelectLayoutItem}
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
          <header className="sticky top-0 h-10 bg-slate-100 p-1">
            <h3 className="font-medium">Sections</h3>
          </header>
          <ul className="m-1 flex flex-col items-stretch gap-2">
            {sectionItems.map((item) => (
              <TemplateItem
                key={item.id}
                id={item.id}
                label={item.label}
                markdown={item.markdown}
                onItemSelect={handleSelectSectionItem}
              />
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
