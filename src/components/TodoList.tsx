import { useState } from 'react'
import { Draggable, Droppable } from '@hello-pangea/dnd'
import { TodoItemProps } from '../data'
import TodoItem from './TodoItem'

function TodoList({
  todos,
  removeTodo,
}: {
  todos: TodoItemProps[]
  removeTodo: (id: string) => void
}) {
  return (
    <Droppable droppableId="droppable">
      {(provided) => (
        <ul ref={provided.innerRef} {...provided.droppableProps}>
          {todos.map((todo, index) => (
            <Draggable key={todo.id} draggableId={todo.id} index={index}>
              {(provided, snapshot) => (
                <TodoItem
                  provided={provided}
                  snapshot={snapshot}
                  {...todo}
                  removeTodo={removeTodo}
                />
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  )
}

export default TodoList
