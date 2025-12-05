"use client"

interface ContextMenuProps {
  x: number;
  y: number;
  onDelete: () => void;
  contextMenuRef: React.RefObject<HTMLDivElement | null>;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  onDelete,
  contextMenuRef,
}) => {
  return (
    <div
      ref={contextMenuRef}
      className="fixed bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[120px]"
      style={{ left: `${x}px`, top: `${y}px` }}
    >
      <button
        onClick={onDelete}
        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 rounded-lg"
      >
        Delete
      </button>
    </div>
  );
};

export default ContextMenu;

