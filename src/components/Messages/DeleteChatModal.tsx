"use client"

interface DeleteChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteChatModal: React.FC<DeleteChatModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#BABBBB]/40 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">Delete Chat</h3>
        <p className="text-gray-600 mb-6">Are you sure you want to delete all messages in this chat</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 cursor-pointer"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-[#11401C] text-white rounded-full hover:bg-[#0d2f14] cursor-pointer"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteChatModal;

