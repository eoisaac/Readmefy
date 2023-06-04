import { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

type Item = {
  id: string
  content: string
}

const initialItems: Item[] = [
  { id: 'item-1', content: 'Item 1' },
  { id: 'item-2', content: 'Item 2' },
  { id: 'item-3', content: 'Item 3' },
]

export const TemplatesList = () => {
  const [items, setItems] = useState<Item[]>(initialItems)

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const updatedItems = [...items]
    const [movedItem] = updatedItems.splice(result.source.index, 1)
    updatedItems.splice(result.destination.index, 0, movedItem)

    setItems(updatedItems)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ listStyle: 'none' }}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="m-2 cursor-move select-none rounded-md border-2
                    border-gray-300 bg-white p-2 shadow-sm hover:bg-gray-50"
                    style={{
                      ...provided.draggableProps.style,
                    }}
                  >
                    {item.content}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  )
}
