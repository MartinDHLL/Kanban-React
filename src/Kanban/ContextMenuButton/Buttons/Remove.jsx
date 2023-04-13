const Remove = ({ type, handleRemove }) => (
  <button
    onClick={handleRemove}
    className="btn btn-sm bg-zinc-600 hover:bg-red-600 text-white"
  >
    {type === "list"
      ? "Supprimer cette liste"
      : type === "task"
      ? "Supprimer cette tâche"
      : "erreur"}
  </button>
);
export default Remove;
