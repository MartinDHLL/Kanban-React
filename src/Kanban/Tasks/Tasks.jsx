import Task from "./Task";

export default function Tasks({ tasks, handleRemove, handleUpdate }) {
  return tasks.length > 0 ? (
    <td className="h-full w-full overflow-y-auto flex flex-col gap-y-5">
      {tasks.map((task, i) => (
        <Task
          key={i}
          task={task}
          handleRemove={handleRemove}
          handleUpdate={handleUpdate}
        />
      ))}
    </td>
  ) : (
    <td
      colSpan={2}
      className="text-center flex justify-between gap-x-5 items-center"
    >
      <p className="w-full">Aucunes tâches</p>
    </td>
  );
}
