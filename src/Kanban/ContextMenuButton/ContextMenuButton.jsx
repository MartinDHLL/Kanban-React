import { useEffect, useState } from "react";
import Add from "./Buttons/Add";
import Remove from "./Buttons/Remove";

export default function ContextMenuButton({
  type,
  handleRemove,
  handleAddTask,
}) {
  const [menuState, setMenuState] = useState(false);
  const [hideStateClass, setHideStateClass] = useState("invisible");

  const handleClick = (e) => {
    setMenuState(!menuState);
  };

  useEffect(() => {
    !menuState ? setHideStateClass("invisible") : setHideStateClass("visible");
  }, [menuState]);

  if (type === "list") {
    return (
      <div>
        <button
          onClick={handleClick}
          className="btn btn-circle btn-sm bg-white text-black border-0"
        >
          •
        </button>
        <ul className={`menu absolute ${hideStateClass}`}>
          <li>
            <Add handleAdd={() => handleAddTask() || handleClick()} />
          </li>
          <li>
            <Remove
              type={type}
              handleRemove={() => handleRemove() || handleClick()}
            />
          </li>
        </ul>
      </div>
    );
  }
  if (type === "task") {
    return (
      <div>
        <button
          onClick={handleClick}
          className="btn btn-circle btn-sm bg-white text-black border-0"
        >
          •
        </button>
        <ul className={`menu absolute z-20 ${hideStateClass}`}>
          <li>
            <Remove
              type={type}
              handleRemove={() => handleRemove() || handleClick()}
            />
          </li>
        </ul>
      </div>
    );
  }
}
