import {
  Circle,
  MousePointer2,
  Redo2,
  Square,
  StickyNote,
  Type,
  Undo2,
} from "lucide-react";

import Tool from "./tool";

const tools = [
  { label: "Select", icon: MousePointer2, onClick: () => {} },
  { label: "Text", icon: Type, onClick: () => {} },
  { label: "Sticky Note", icon: StickyNote, onClick: () => {} },
  { label: "Square", icon: Square, onClick: () => {} },
  { label: "Ellipse", icon: Circle, onClick: () => {} },
];

const historyTools = [
  { label: "Undo", icon: Undo2, onClick: () => {} },
  { label: "Redo", icon: Redo2, onClick: () => {} },
];

export default function Toolbar() {
  return (
    <div className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center flex-col left-2 gap-y-2">
      <div className="flex flex-col gap-y-1 p-2 rounded-md bg-white shadow-md">
        {tools.map(({ label, icon, onClick }) => (
          <Tool key={label} label={label} icon={icon} onClick={onClick} />
        ))}
      </div>

      <div className="flex flex-col gap-y-1 p-2 rounded-md bg-white shadow-md">
        {historyTools.map(({ label, icon, onClick }) => (
          <Tool key={label} label={label} icon={icon} onClick={onClick} />
        ))}
      </div>
    </div>
  );
}
