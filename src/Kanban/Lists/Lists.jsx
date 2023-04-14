import { useState } from "react";
import List from "./List";
import ButtonsBar from "./ButtonsBar/ButtonsBar";
import { DndContext } from "@dnd-kit/core";

export default function Lists() {
  const [lists, setLists] = useState([
    { id: 0, name: "To do", position: 2 },
    { id: 1, name: "Test", position: 1 },
  ]);

  const addList = () => {
    setLists((lists) => [
      ...lists,
      {
        id: (lists.sort((a, b) => a.id - b.id)[lists.length - 1]?.id ?? -1) + 1,
        name: "Nouvelle liste",
        position:
          (lists.sort((a, b) => a.position - b.position)[lists.length - 1]
            ?.position ?? -1) + 1,
      },
    ]);
    console.log(lists);
  };

  const updateList = (list) => {
    setLists(
      lists.map((actualList) =>
        actualList.id === list.id ? { ...actualList, ...list } : actualList
      )
    );
    console.log(lists);
  };

  const removeList = (id) =>
    setLists(lists.filter((list) => (list.id !== id ? list : null)));

  const [isDragging, setDraggingState] = useState(false);

  return (
    <DndContext
      onDragStart={() => setDraggingState(true)}
      onDragEnd={() => setDraggingState(false)}
      onDragCancel={() => setDraggingState(false)}
    >
      <div className="h-full flex flex-col gap-y-5">
        <ButtonsBar handleAdd={addList} />

        <div className="flex gap-x-[80px] h-full overflow-y-auto">
          {lists.length > 0 ? (
            lists
              .sort((a, b) => a.position - b.position)
              .map((list, i) => (
                <List
                  key={i}
                  list={list}
                  handleRemove={removeList}
                  handleUpdate={updateList}
                  isDragging={isDragging}
                  lists={lists}
                  setLists={setLists}
                />
              ))
          ) : (
            <p>Aucunes listes</p>
          )}
        </div>
      </div>
    </DndContext>
  );
}
