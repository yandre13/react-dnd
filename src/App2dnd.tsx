import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

const App = () => {
  const [columns, setColumns] = useState([
    {
      id: 'column-1',
      title: 'To Do',
      items: [
        { id: '1', content: 'Item 1' },
        { id: '2', content: 'Item 2' },
      ],
    },
    {
      id: 'column-2',
      title: 'In Progress',
      items: [
        { id: '3', content: 'Item 3' },
        { id: '4', content: 'Item 4' },
      ],
    },
    {
      id: 'column-3',
      title: 'Done',
      items: [
        { id: '5', content: 'Item 5' },
        { id: '6', content: 'Item 6' },
      ],
    },
  ])

  const onDragEnd = (result) => {
    // Destructuring de los resultados de la operación de arrastre
    const { destination, source, draggableId } = result

    // Si no hay un destino, no hacemos nada y terminamos la función
    if (!destination) {
      return
    }

    // Si el índice y el ID de la columna de origen son iguales al de destino, no hacemos nada y terminamos la función
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // Validamos si el elemento arrastrado se ha soltado en la misma columna
    if (destination.droppableId === source.droppableId) {
      // Mapeamos a través de las columnas
      return setColumns(
        columns.map((column) => {
          // Si la columna es la columna de origen, reordenamos los elementos en la columna
          if (column.id === source.droppableId) {
            const newItems = [...column.items]
            const [removed] = newItems.splice(source.index, 1)
            newItems.splice(destination.index, 0, removed)
            return {
              ...column,
              items: newItems,
            }
          }

          // Si no es la columna de origen, simplemente devolvemos la columna sin cambios
          return column
        })
      )
    }

    // Si el elemento se ha soltado en una columna diferente, hacemos los siguientes cambios
    // Creamos una copia de las columnas actuales
    const newColumns = [...columns]
    // Encontramos el índice de la columna de origen
    const sourceColumnIndex = newColumns.findIndex(
      ({ id }) => id === source.droppableId
    )
    // Encontramos la columna de origen
    const sourceColumn = newColumns[sourceColumnIndex]
    // Encontramos el índice de la columna de destino
    const destinationColumnIndex = newColumns.findIndex(
      ({ id }) => id === destination.droppableId
    )
    // Encontramos la columna de destino
    const destinationColumn = newColumns.find(
      ({ id }) => id === destination.droppableId
    )

    // Creamos una copia de los elementos de la columna de origen
    const newSourceItems = [...sourceColumn.items]
    // Extraemos el elemento arrastrado de los elementos de la columna de origen
    const [removed] = newSourceItems.splice(source.index, 1)
    // Creamos una copia de los elementos de la columna de destino
    const newDestinationItems = [...destinationColumn.items]
    // Insertamos el elemento arrastrado en la posición correspondiente en la columna de destino
    newDestinationItems.splice(destination.index, 0, removed)

    // Actualizamos la columna de origen con los elementos actualizados
    newColumns[sourceColumnIndex] = {
      ...sourceColumn,
      items: newSourceItems,
    }

    // Actualizamos la columna de destino con los elementos actualizados
    newColumns[destinationColumnIndex] = {
      ...destinationColumn,
      items: newDestinationItems,
    }

    // Finalmente, actualizamos el estado global con las columnas actualizadas
    setColumns(newColumns)
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
