import { createPortal } from "react-dom";
import Lists from "./Lists/Lists";
import { Toaster } from "react-hot-toast";

export default function Kanban() {
  return (
    <div className="h-full p-5">
      {createPortal(<Toaster />, document.body)}
      <Lists />
    </div>
  );
}
