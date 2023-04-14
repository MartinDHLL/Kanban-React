import { useEffect, useState } from "react";
import ContextMenuButton from "../ContextMenuButton/ContextMenuButton";
import { toast } from "react-hot-toast";
import Draggable from "../Lists/dragAndDropTask/Draggable";
import Droppable from "../Lists/dragAndDropTask/Droppable";

const Task = ({ task, handleRemove, handleUpdate, tasks, isDragging }) => {
  const [nameComponent, setNameComponent] = useState(
    <p className="w-full overflow-x-auto">{task.name}</p>
  );

  useEffect(() => {
    function handleInputAddTask(e) {
      const isAdding = e.target.value.length <= 0;
      //controler la valeur initiale afin de définir le message toast (add or edit)
      const message = isAdding
        ? "La tâche a bien été créée"
        : "La tâche a bien été mise à jour";
      if (e.key === "Enter") {
        task.name = e.target.value;
        task.mode = "show";
        isAdding
          ? toast.error("Le nom de la tâche ne peux pas etre vide")
          : handleUpdate(task) || toast.success(message);
      }
      if (e.key === "Escape") {
        task.mode = "show";
        isAdding
          ? handleRemove(task.id) || toast("Tâche annulée")
          : handleUpdate(task);
      }
    }

    function handleTextClick(e) {
      task.mode = "edit";
      handleUpdate(task);
    }

    switch (task.mode) {
      default:
        setNameComponent(
          <p onClick={handleTextClick} className="w-60 overflow-x-auto">
            {task.name}
          </p>
        );
        break;
      case "show":
        setNameComponent(
          <p onClick={handleTextClick} className="w-60 overflow-x-auto">
            {task.name}
          </p>
        );
        break;
      case "edit":
        setNameComponent(
          <input
            className="input input-sm input-bordered text-center"
            defaultValue={task.name}
            onKeyDown={handleInputAddTask}
          />
        );
        break;
    }
  }, [task, handleRemove, handleUpdate]);

  const [position, setPosition] = useState(undefined);

  return (
    <div
      colSpan={2}
      className="w-full text-center flex justify-between gap-x-5 items-center"
      style={position}
    >
      <Droppable
        task={task}
        setTasks={handleUpdate}
        tasks={tasks}
        isDragging={isDragging}
      />
      <Draggable task={task} handleCurrentPosition={setPosition} />
      {nameComponent}
      <ContextMenuButton
        type={"task"}
        handleRemove={() => handleRemove(task.id)}
      />
    </div>
  );
};

export default Task;
