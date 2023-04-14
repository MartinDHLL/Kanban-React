import { useDroppable } from "@dnd-kit/core";
import { useCallback, useEffect, useState } from "react";

const Droppable = ({ task, tasks, isDragging, setTasks }) => {
  const { setNodeRef, isOver, over, active } = useDroppable({
    id: `DroppableList${task.id + 1}`,
    data: { task: task, acceptedType: "list" },
  });

  const [canUpdate, setUpdateState] = useState(true);

  // invert the current list position with the draggable list over this droppable box
  const invertTaskPosition = useCallback(
    (task1, task2) => {
      const task1Pos = task1.position;
      const task2Pos = task2.position;
      const reorderedTask = tasks.map((actualTask) =>
        task1.id === actualTask.id && task1Pos !== task2Pos
          ? { ...actualTask, position: task2Pos }
          : task2.id === actualTask.id && task1Pos !== task2Pos
          ? { ...actualTask, position: task1Pos }
          : actualTask
      );
      setTasks(reorderedTask);
      setUpdateState(false); // block update state to avoid infinite re-render on same droppable box
    },
    [setTasks, tasks]
  );

  useEffect(() => {
    if (isOver && canUpdate) {
      const activeData = active?.data.current ?? null;
      const overData = over?.data.current ?? null;
      over && activeData.type === overData.acceptedType
        ? invertTaskPosition(activeData.task, overData.task) // invert position of tasks
        : console.log("type incorrect");
    }
    if (!isOver) setUpdateState(true); // allow to re-render when over event is gone
  }, [active, over, isOver, invertTaskPosition, canUpdate]);

  return (
    <div
      className={`h-10 bg-orange-200 animate-pulse ${
        isDragging ? "visible" : "invisible"
      }`}
      ref={setNodeRef}
    ></div>
  );
};

export default Droppable;
