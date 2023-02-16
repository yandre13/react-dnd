import { Dispatch, SetStateAction } from 'react'
import { TodoItemProps } from '../data'

function TodoForm({
  updateTodos,
}: {
  updateTodos: Dispatch<SetStateAction<TodoItemProps[]>>
}) {
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

    updateTodos((todos) => [...todos, newTodo])

    // Clear input
    input.value = ''
  }

  return (
    <form action="#" onSubmit={handleSubmit}>
      <h1>Today's Tasks</h1>
      <div>
        <input type="text" placeholder="Add a task" />
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

export default TodoForm
