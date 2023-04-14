import { useDroppable } from "@dnd-kit/core";
import { useCallback, useEffect, useState } from "react";

const Droppable = ({ list, isDragging, tasks, setTasks, lists, setLists }) => {
  const { setNodeRef, isOver, over, active } = useDroppable({
    id: `DroppableList${list.id + 1}`,
    data: { list: list, tasks: tasks, acceptedType: "list" },
  });

  const [canUpdate, setUpdateState] = useState(true);

  // invert the current list position with the draggable list over this droppable box
  const invertListPosition = useCallback(
    (list1, list2) => {
      const list1Pos = list1.position;
      const list2Pos = list2.position;
      const reorderedList = lists.map((actualList) =>
        list1.id === actualList.id && list1Pos !== list2Pos
          ? { ...actualList, position: list2Pos }
          : list2.id === actualList.id && list1Pos !== list2Pos
          ? { ...actualList, position: list1Pos }
          : actualList
      );
      setLists(reorderedList);
      setUpdateState(false); // block update state to avoid infinite re-render on same droppable box
    },
    [setLists, lists]
  );

  useEffect(() => {
    if (isOver && canUpdate) {
      console.log("over");
      const activeData = active?.data.current ?? null;
      const overData = over?.data.current ?? null;
      over && activeData.type === overData.acceptedType
        ? invertListPosition(activeData.list, overData.list) // invert position of lists
        : console.log("type incorrect"); // updateLists
    }
    if (!isOver) setUpdateState(true); // allow to re-render when over event is gone
  }, [active, over, isOver, invertListPosition, canUpdate]);

  return (
    <div
      className={`h-10 bg-orange-200 animate-pulse ${
        isDragging ? "visible" : "invisible"
      }`}
      ref={setNodeRef}
    >
      <img
        className="object-contain w-full h-full p-2"
        src="dropbox.svg"
        alt="dropbox"
      />
    </div>
  );
};

export default Droppable;
