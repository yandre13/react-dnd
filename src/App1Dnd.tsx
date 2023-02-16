import { DragDropContext, Droppable } from '@hello-pangea/dnd'

import { useState } from 'react'
import TodoList from './components/TodoList'
import { myTodos } from './data'

function App() {
  const [todos, setTodos] = useState(myTodos)
  // Add todo
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const input = document.querySelector('input') as HTMLInputElement
    const value = input.value

    if (value.length < 3) return

    const newTodo = {
      id: Date.now().toString(),
      title: value,
      completed: false,
    }

    setTodos((todos) => [...todos, newTodo])

    // Clear input
    input.value = ''
  }

  // Remove todo
  function handleRemove(id: string) {
    setTodos((todos) => todos.filter((todo) => todo.id !== id))
  }

  function handleDragEnd(result: any) {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const newItems = Array.from(todos)
    const [removedItem] = newItems.splice(source.index, 1)
    newItems.splice(destination.index, 0, removedItem)

    setTodos(newItems)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <form action="#" onSubmit={handleSubmit}>
        <h1>Today's Tasks</h1>
        <div>
          <input type="text" placeholder="Add a task" />
          <button type="submit">Add</button>
        </div>
      </form>
      {/* <TodoForm updateTodos={setTodos} /> */}

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <TodoList todos={todos} removeTodo={handleRemove} />
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="mt-20" />
      {/* Droppable */}
    </div>
  )
}

export default App
