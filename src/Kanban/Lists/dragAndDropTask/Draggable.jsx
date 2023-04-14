import { useDraggable } from "@dnd-kit/core";
import { useEffect } from "react";

const Draggable = ({ task, handleCurrentPosition, setInitialPosition }) => {
  const { setNodeRef, transform, listeners, attributes } = useDraggable({
    id: `DraggableTask${task.id + 1}`,
    data: { task: task, type: "task" },
  });

  useEffect(() => {
    if (transform) {
      handleCurrentPosition({
        transform: `translate(0px, ${transform.y}px)`,
      });
    } else {
      handleCurrentPosition(undefined);
    }
  }, [handleCurrentPosition, transform, setInitialPosition]);

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} className="w-10">
      <hr className="border-[4px] mb-1 rounded-xl border-slate-700" />
      <hr className="border-[4px] rounded-xl border-slate-600" />
    </div>
  );
};

export default Draggable;
