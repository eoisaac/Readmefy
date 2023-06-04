import { useEditor } from '@/contexts/EditorContext'
import { ArrowCounterClockwise } from '@phosphor-icons/react'
import { HTMLAttributes } from 'react'
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd'
import { twMerge } from 'tailwind-merge'
import { Button } from './Button'
import { TemplateItem } from './TemplateItem'

type LayoutEditorProps = HTMLAttributes<HTMLUListElement>

export const LayoutEditor = ({ ...rest }: LayoutEditorProps) => {
  const {
    layout,
    templates,
    updateLayoutOrder,
    selectCurrentTemplate,
    addLayoutTemplate,
    resetLayoutAndTemplates,
  } = useEditor()

  const { className } = rest

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const updatedItems = [...layout]
    const [movedItem] = updatedItems.splice(result.source.index, 1)
    updatedItems.splice(result.destination.index, 0, movedItem)

    updateLayoutOrder(updatedItems)
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
              onClick={resetLayoutAndTemplates}
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
                  {layout.map((item, index) => (
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
                          onItemSelect={selectCurrentTemplate}
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
            {templates.map((item) => (
              <TemplateItem
                key={item.id}
                id={item.id}
                label={item.label}
                markdown={item.markdown}
                onItemSelect={addLayoutTemplate}
              />
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
