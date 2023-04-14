import { DndContext } from "@dnd-kit/core";
import Task from "./Task";
import { useState } from "react";

export default function Tasks({ tasks, handleRemove, handleUpdate }) {
  const [isDragging, setDraggingState] = useState(false);
  return (
    <td
      className={
        tasks.length > 0
          ? "h-full w-full overflow-y-auto flex flex-col gap-y-5"
          : "text-center flex justify-between gap-x-5 items-center"
      }
      colSpan={2}
    >
      <DndContext
        onDragStart={() => setDraggingState(true)}
        onDragEnd={() => setDraggingState(false)}
        onDragCancel={() => setDraggingState(false)}
      >
        {tasks.length > 0 ? (
          tasks
            .sort((a, b) => a.position - b.position)
            .map((task, i) => (
              <Task
                key={i}
                task={task}
                handleRemove={handleRemove}
                handleUpdate={handleUpdate}
                tasks={tasks}
                isDragging={isDragging}
              />
            ))
        ) : (
          <p className="w-full">Aucunes tâches</p>
        )}
      </DndContext>
    </td>
  );
}
