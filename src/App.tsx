import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
const App = () => {
  const [columns, setColumns] = useState([
    { id: 'column-1', title: 'To Do' },
    { id: 'column-2', title: 'In Progress' },
    { id: 'column-3', title: 'Done' },
  ])

  const [items, setItems] = useState([
    { id: '1', content: 'Item 1', columnId: 'column-1' },
    { id: '2', content: 'Item 2', columnId: 'column-1' },
    { id: '3', content: 'Item 3', columnId: 'column-2' },
    { id: '4', content: 'Item 4', columnId: 'column-2' },
    { id: '5', content: 'Item 5', columnId: 'column-3' },
    { id: '6', content: 'Item 6', columnId: 'column-3' },
  ])

  const onDragEnd = (result) => {
    // Desestructuramos las propiedades necesarias del resultado del evento de arrastre
    const { source, destination, draggableId } = result

    // No se hace nada si el item no se soltó en una columna
    if (!destination) return

    // Si el índice y el ID de la columna de origen son iguales al de destino, no hacemos nada y terminamos la función
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // Validamos si el elemento arrastrado se ha soltado en la misma columna
    if (destination.droppableId === source.droppableId) {
      // Filtramos los elementos que pertenecen a la misma columna que el elemento arrastrado
      const sourceItems = items.filter(
        (item) => item.columnId === source.droppableId
      )

      // Extraemos el elemento arrastrado de la lista de elementos de la columna de origen
      const [draggedItem] = sourceItems.splice(source.index, 1)

      // Actualizamos el ID de la columna del elemento arrastrado
      draggedItem.columnId = destination.droppableId

      // Insertamos el elemento arrastrado en el nuevo índice en la columna de origen
      sourceItems.splice(destination.index, 0, draggedItem)

      // Actualizamos el estado global de los elementos con la nueva lista de elementos de la columna de origen
      setItems([
        ...items.filter((item) => item.columnId !== source.droppableId),
        ...sourceItems,
      ])

      return
    }

    // Si el elemento arrastrado se ha soltado en una columna diferente
    const sourceItems = items.filter(
      (item) => item.columnId === source.droppableId
    )
    const destinationItems = items.filter(
      (item) => item.columnId === destination.droppableId
    )
    const [draggedItem] = sourceItems.splice(source.index, 1)
    draggedItem.columnId = destination.droppableId
    destinationItems.splice(destination.index, 0, draggedItem)
    setItems([
      ...items.filter(
        (item) =>
          item.columnId !== source.droppableId &&
          item.columnId !== destination.droppableId
      ),
      ...sourceItems,
      ...destinationItems,
    ])
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {columns.map((column, index) => (
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
                  {/*map items and associate it with column id*/}
                  {items
                    .filter((item) => item.columnId === column.id)
                    .map((item, index) => (
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
