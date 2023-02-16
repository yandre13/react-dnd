import { useDroppable } from '@dnd-kit/core'
import { TodoItemProps } from '../data'

function DroppableItem({ id, title }: TodoItemProps) {
  const { setNodeRef } = useDroppable({
    id: id,
    data: {
      accepts: ['type1', 'type2'],
    },
  })

  return (
    <li
      ref={setNodeRef}
      className="py-3 px-4 from-gray-800 to-blue-900 bg-gradient-to-r rounded-md flex justify-between items-center border-2 border-green-700 border-solid text-white font-semibold"
    >
      {title}
    </li>
  )
}

function DroppableList({
  todosDroppable,
}: {
  todosDroppable: TodoItemProps[]
}) {
  return (
    <ul className="flex flex-col gap-2">
      {todosDroppable.map((todo) => (
        <DroppableItem key={todo.id} {...todo} />
      ))}
    </ul>
  )
}

export default DroppableList
