import { useEditor } from '@/contexts/EditorContext'
import { HTMLAttributes } from 'react'
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd'
import { TemplateItem } from './TemplateItem'

type LayoutEditorProps = HTMLAttributes<HTMLUListElement>

export const LayoutEditor = ({ ...rest }: LayoutEditorProps) => {
  const { layout, updateLayoutOrder, selectTemplate } = useEditor()

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const updatedItems = [...layout]
    const [movedItem] = updatedItems.splice(result.source.index, 1)
    updatedItems.splice(result.destination.index, 0, movedItem)

    updateLayoutOrder(updatedItems)
  }

  return (
    <section className="absolute inset-0 flex overflow-auto">
      <h3 className="sr-only">Layout Editor</h3>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
              {...rest}
              className="flex-1 space-y-2 p-[2px] pr-1"
            >
              {layout.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <TemplateItem
                      ref={provided.innerRef}
                      id={item.id}
                      label={item.label}
                      markdown={item.markdown}
                      provided={provided}
                      onItemSelect={selectTemplate}
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
  )
}
