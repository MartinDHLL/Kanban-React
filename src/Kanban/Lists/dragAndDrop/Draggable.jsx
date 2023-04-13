import { useDraggable } from "@dnd-kit/core";
import { useEffect } from "react";

const Draggable = ({
  list,
  handleCurrentPosition,
  setInitialPosition,
  tasks,
}) => {
  const { setNodeRef, transform, listeners, attributes } = useDraggable({
    id: `DraggableList${list.id + 1}`,
    data: { list: list, tasks: tasks, type: "list" },
  });

  useEffect(() => {
    if (transform) {
      handleCurrentPosition({
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      });
    } else {
      handleCurrentPosition(undefined);
    }
  }, [handleCurrentPosition, transform, setInitialPosition]);

  return (
    <hr
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="border-[10px] mb-2 rounded-xl hover:border-zinc-800"
    />
  );
};

export default Draggable;
