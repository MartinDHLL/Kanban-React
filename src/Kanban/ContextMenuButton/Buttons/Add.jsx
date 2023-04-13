const Add = ({ handleAdd }) => (
  <button
    onClick={handleAdd}
    className="btn btn-sm bg-zinc-600 hover:bg-green-600 hover:text-white"
  >
    Créer une tâche
  </button>
);
export default Add;
