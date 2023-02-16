import { useDraggable } from '@dnd-kit/core'

function DraggableItem() {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable',
    data: {
      type: 'type1',
    },
  })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
      }}
      {...attributes}
      {...listeners}
    >
      Draggable Item
    </div>
  )
}

export default DraggableItem
