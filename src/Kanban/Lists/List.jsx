import { useState } from "react";
import ContextMenuButton from "../ContextMenuButton/ContextMenuButton";
import Tasks from "../Tasks/Tasks";
import { toast } from "react-hot-toast";
import Draggable from "./dragAndDropList/Draggable";
import Droppable from "./dragAndDropList/Droppable";

const List = ({
  list,
  handleRemove,
  isDragging,
  handleUpdate,
  lists,
  setLists,
}) => {
  const [tasks, setTasks] = useState([]);

  const [isEdit, setEditState] = useState(false);

  const addTask = () => {
    setTasks((tasks) => [
      ...tasks,
      {
        id: (tasks.sort((a, b) => a.id - b.id)[tasks.length - 1]?.id ?? -1) + 1,
        position:
          (tasks.sort((a, b) => a.position - b.position)[tasks.length - 1]
            ?.position ?? -1) + 1,
        name: "",
        mode: "edit",
      },
    ]);
  };

  const updateTask = (task) => {
    setTasks(
      tasks.map((actualTask) =>
        actualTask.id === task.id ? { ...actualTask, ...task } : actualTask
      )
    );
    console.log(tasks);
  };

  const removeTask = (id) =>
    setTasks(
      tasks.filter((actualTask) => (actualTask.id !== id ? actualTask : null))
    );

  const handleInput = (e) => {
    if (e.key === "Enter") {
      list.name = e.target.value;
      list.name.length > 0
        ? handleUpdate(list) ||
          (toast.success("Le nom de la liste a bien été mis à jour") &&
            setEditState(false))
        : toast.error("Le champs ne doit pas être vide");
    }
    if (e.key === "Escape") {
      setEditState(false);
    }
  };

  const [position, setPosition] = useState(undefined);

  return (
    <div className="relative z-10">
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
              <Draggable
                list={list}
                tasks={tasks}
                handleCurrentPosition={setPosition}
              />
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

        <tbody className="h-full w-full">
          <tr className="h-full w-full">
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
