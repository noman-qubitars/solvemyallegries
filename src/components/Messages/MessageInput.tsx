"use client"

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { IoMdAttach } from "react-icons/io";
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

interface MessageInputProps {
  input: string;
  setInput: (value: string) => void;
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  setFilePreview: (preview: string | null) => void;
  isRecording: boolean;
  audioBlob: Blob | null;
  selectedUserId: string | null;
  sending: boolean;
  onSend: () => void;
  onThumbClick: () => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  startRecording: () => void;
  stopRecording: () => void;
  onVoiceSend: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  input,
  setInput,
  selectedFile,
  setSelectedFile,
  setFilePreview,
  isRecording,
  audioBlob,
  selectedUserId,
  sending,
  onSend,
  onThumbClick,
  onFileSelect,
  startRecording,
  stopRecording,
  onVoiceSend,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setInput(input + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="px-[48px] py-[23px] flex items-center gap-3 relative">
      <div className="relative" ref={emojiPickerRef}>
        <button 
          className='cursor-pointer'
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <Image src="/images/Messages/emoji.svg" alt="Emoji" width={19} height={19} />
        </button>
        {showEmojiPicker && (
          <div className="absolute bottom-full mb-2 left-0 z-50">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
      <div className="flex items-center px-3 gap-2 border border-[#D5D5D5] rounded-full w-full h-[38px] focus-within:ring-1 focus-within:ring-[#11401C] focus-within:border-[#11401C] transition-all">
        <label className='cursor-pointer'>
          <input
            type="file"
            onChange={onFileSelect}
            className="hidden"
            accept="image/*,application/pdf,.doc,.docx,.txt"
            key={selectedFile ? selectedFile.name : 'file-input'}
          />
          <IoMdAttach size={20} />
        </label>
        {selectedFile && (
          <div className="flex items-center gap-2 px-2 py-1 bg-gray-100 rounded text-[10px] text-[#11401C]">
            <span className="truncate max-w-[100px]">{selectedFile.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                        setFilePreview(null);
                        // Reset file input
                        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
                        if (fileInput) {
                          fileInput.value = '';
                        }
                      }}
                      className="text-red-600 hover:text-red-700 cursor-pointer"
                    >
                      ×
                    </button>
          </div>
        )}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && onSend()}
          placeholder={selectedFile ? "Add a caption (optional)..." : "Type your message here ..."}
          className="w-full text-black outline-none bg-transparent placeholder:text-[#8F9091]"
          disabled={!selectedUserId || sending}
        />
        <div className="relative flex items-center gap-2">
          {isRecording ? (
            <div className="flex items-center gap-2">
              <div 
                className="flex items-center gap-1 cursor-pointer"
                onClick={stopRecording}
              >
                <div className="w-1 h-4 bg-[#11401C] rounded-full animate-wave" style={{ animationDelay: '0s' }}></div>
                <div className="w-1 h-6 bg-[#11401C] rounded-full animate-wave" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1 h-5 bg-[#11401C] rounded-full animate-wave" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1 h-7 bg-[#11401C] rounded-full animate-wave" style={{ animationDelay: '0.3s' }}></div>
                <div className="w-1 h-4 bg-[#11401C] rounded-full animate-wave" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <button
                onClick={stopRecording}
                className="text-red-600"
              >
                <Image src="/images/Messages/mic.svg" alt="Stop" width={16} height={20} className='cursor-pointer' />
              </button>
            </div>
          ) : (
            <button
              onClick={startRecording}
            >
              <Image src="/images/Messages/mic.svg" alt="Mic" width={16} height={20} className='cursor-pointer' />
            </button>
          )}
          {audioBlob && !isRecording && (
            <button
              onClick={onVoiceSend}
              className="text-xs text-[#11401C] font-semibold cursor-pointer"
            >
              Send
            </button>
          )}
        </div>
      </div>
      <div className='flex items-center gap-3'>
        <div 
          className={`px-[8px] py-[8px] rounded-full flex items-center justify-center ${(input.trim() || selectedFile || audioBlob) ? 'bg-[#11401C] cursor-pointer' : 'bg-gray-300 cursor-not-allowed'}`}
          onClick={() => {
            if (input.trim() || selectedFile || audioBlob) {
              onSend();
            }
          }}
        >
          <Image src="/images/Messages/vector.svg" alt="Send" width={15} height={15} />
        </div>
        <button 
          className="cursor-pointer" 
          onClick={onThumbClick}
          disabled={!selectedUserId || sending}
        >
          <Image src="/images/Messages/thumb.svg" alt="Thumb" width={21} height={19} />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;

