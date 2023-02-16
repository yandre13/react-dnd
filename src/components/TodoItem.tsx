import { TodoItemProps } from '../data'
import { BsCheckCircleFill } from 'react-icons/bs'
import { DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd'

function TodoItem({
  id,
  title,
  completed,
  provided,
  snapshot,
  removeTodo,
}: TodoItemProps & {
  removeTodo: (id: string) => void
  provided: DraggableProvided
  snapshot: DraggableStateSnapshot
}) {
  return (
    <li
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onDoubleClick={() => removeTodo(id)}
      className="mb-2 py-3 px-4 from-gray-800 to-blue-900 bg-gradient-to-r rounded-md flex justify-between items-center border-2 border-green-700 border-solid
      text-white font-semibold"
    >
      {title}
    </li>
  )
}

export default TodoItem
