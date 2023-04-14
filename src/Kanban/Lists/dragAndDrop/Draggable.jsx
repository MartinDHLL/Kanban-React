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
    <div ref={setNodeRef} {...listeners} {...attributes} className="w-10">
      <hr className="border-[4px] mb-1 rounded-xl" />
      <hr className="border-[4px] rounded-xl" />
    </div>
  );
};

export default Draggable;
