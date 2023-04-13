import { useState } from "react";
import ContextMenuButton from "../ContextMenuButton/ContextMenuButton";
import Tasks from "../Tasks/Tasks";
import { toast } from "react-hot-toast";
import Draggable from "./dragAndDrop/Draggable";
import Droppable from "./dragAndDrop/Droppable";

const List = ({ list, handleRemove, isDragging, lists, setLists }) => {
  const [tasks, setTasks] = useState([]);

  const [isEdit, setEditState] = useState(false);
  const addTask = () => {
    setTasks([
      ...tasks,
      { id: (tasks[tasks.length - 1]?.id ?? -1) + 1, name: "", mode: "edit" },
    ]);
  };

  const updateTask = (task) => {
    setTasks(
      tasks.map((actualTask) =>
        actualTask.id === task.id ? { ...actualTask, task } : actualTask
      )
    );
  };

  const removeTask = (id) =>
    setTasks(
      tasks.filter((actualTask) => (actualTask.id !== id ? actualTask : null))
    );

  const handleInput = (e) => {
    if (e.key === "Enter") {
      list.name = e.target.value;
      updateTask(list);
      toast.success("Le nom de la liste a bien été mis à jour");
      setEditState(false);
    }
    if (e.key === "Escape") {
      setEditState(false);
    }
  };

  const [position, setPosition] = useState(undefined);

  return (
    <div>
      <Draggable
        list={list}
        tasks={tasks}
        handleCurrentPosition={setPosition}
      />
      <Droppable
        list={list}
        isDragging={isDragging}
        tasks={tasks}
        setTasks={setTasks}
        lists={lists}
        setLists={setLists}
      />
      <table
        style={position}
        className="table shadow-lg overflow-y-auto h-[95%]"
      >
        <thead>
          <tr>
            <th className="text-center flex justify-between gap-x-5 items-center bg-stone-800 text-white">
              {isEdit ? (
                <input
                  className="input input-sm input-bordered text-center text-black"
                  defaultValue={list.name}
                  onKeyDown={handleInput}
                />
              ) : (
                <p
                  onClick={() => setEditState(true)}
                  className="w-60 overflow-x-auto"
                >
                  {list.name}
                </p>
              )}
              <ContextMenuButton
                type={"list"}
                handleRemove={() => handleRemove(list.id)}
                handleAddTask={addTask}
              />
            </th>
          </tr>
        </thead>

        <tbody className="h-full">
          <tr className="h-full">
            <Tasks
              tasks={tasks}
              handleRemove={removeTask}
              handleUpdate={updateTask}
            />
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default List;
