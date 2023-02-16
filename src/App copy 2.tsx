import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

const items = [
  { id: 'item-1', content: 'Item 1' },
  { id: 'item-2', content: 'Item 2' },
  { id: 'item-3', content: 'Item 3' },
  { id: 'item-4', content: 'Item 4' },
  { id: 'item-5', content: 'Item 5' },
  { id: 'item-6', content: 'Item 6' },
]

const myColumns = [
  {
    id: 'column-1',
    title: 'Column 1',
    items: items.slice(0, 2),
  },
  {
    id: 'column-2',
    title: 'Column 2',
    items: items.slice(2, 4),
  },
  {
    id: 'column-3',
    title: 'Column 3',
    items: items.slice(4, 6),
  },
]

const onDragEnd = (result) => {
  console.log(result)
  // const { destination, source, draggableId } = result

  // if (!destination) {
  //   return
  // }

  // if (
  //   destination.droppableId === source.droppableId &&
  //   destination.index === source.index
  // ) {
  //   return
  // }

  // const column = columns.find((column) => column.id === source.droppableId)
  // const newItems = Array.from(column.items)
  // newItems.splice(source.index, 1)
  // newItems.splice(
  //   destination.index,
  //   0,
  //   items.find((item) => item.id === draggableId)
  // )

  // const newColumn = {
  //   ...column,
  //   items: newItems,
  // }

  // const newColumns = columns.map((column) => {
  //   if (column.id === newColumn.id) {
  //     return newColumn
  //   }
  //   return column
  // })

  // setColumns(newColumns)
}

const App = () => {
  const [columns, setColumns] = useState(myColumns)

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {columns.map((column) => (
          <div
            key={column.id}
            style={{
              width: '30%',
              height: '100%',
              border: '1px solid gray',
              padding: '10px',
            }}
          >
            <h2>{column.title}</h2>
            <Droppable droppableId={column.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    background: snapshot.isDraggingOver
                      ? 'lightblue'
                      : 'lightgrey',
                    padding: '8px',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  {column.items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            userSelect: 'none',
                            padding: '16px',
                            margin: '0 0 8px 0',
                            minHeight: '50px',
                            backgroundColor: snapshot.isDragging
                              ? '#263B4A'
                              : '#456C86',
                            color: 'white',
                            ...provided.draggableProps.style,
                          }}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  )
}

export default App
