export interface TodoItemProps {
  id: string
  title: string
  completed: boolean
}

export const myTodos: TodoItemProps[] = [
  {
    id: '1',
    title: 'Learn React',
    completed: false,
  },
  {
    id: '2',
    title: 'Learn TypeScript',
    completed: false,
  },
  {
    id: '3',
    title: 'Learn GraphQL',
    completed: false,
  },
]

export const myTodosDrop: TodoItemProps[] = [
  {
    id: '1',
    title: 'Learn React Dropping',
    completed: false,
  },
  {
    id: '2',
    title: 'Learn TypeScript Dropping',
    completed: false,
  },
  {
    id: '3',
    title: 'Learn GraphQL Dropping',
    completed: false,
  },
]
