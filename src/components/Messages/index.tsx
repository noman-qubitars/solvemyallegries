"use client"

import { useState, useEffect, useMemo, useRef } from 'react';
import BreadCrum from "./BreadCrum";
import UserList from "./UserList";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import DeleteChatModal from "./DeleteChatModal";
import ContextMenu from "./ContextMenu";
import { useGetAllMessagesQuery, useGetUserMessagesQuery, useSendMessageMutation, useMarkAsReadMutation, useDeleteMessageMutation, useDeleteAllMessagesMutation } from '@/lib/api/messageApi';
import { useGetUsersQuery } from '@/lib/api/userApi';
import { useToaster } from '@/components/Toaster';
import { Message } from '@/lib/api/messageApi';
import { getSocket, disconnectSocket } from '@/lib/socket';
import { Socket } from 'socket.io-client';
import { formatTime, formatDate } from './utils';

const Messages: React.FC = () => {
  const { showToast } = useToaster();
  const [activeTab, setActiveTab] = useState<'All' | 'Unread'>('All');
  const [search, setSearch] = useState('');
  const [input, setInput] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [showMessageBody, setShowMessageBody] = useState(false);
  const [realTimeMessages, setRealTimeMessages] = useState<Message[]>([]);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; messageId: string } | null>(null);
  const [showDeleteChatMenu, setShowDeleteChatMenu] = useState(false);
  const [showDeleteChatModal, setShowDeleteChatModal] = useState(false);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const deleteMenuRef = useRef<HTMLDivElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const { data: allMessagesData, isLoading: messagesLoading, refetch: refetchAllMessages } = useGetAllMessagesQuery({
    isRead: activeTab === 'Unread' ? false : undefined,
  });

  const { data: userMessagesData, isLoading: userMessagesLoading, refetch: refetchUserMessages } = useGetUserMessagesQuery(
    selectedUserId || '',
    { skip: !selectedUserId }
  );

  const { data: usersData, refetch: refetchUsers } = useGetUsersQuery();
  const [sendMessage, { isLoading: sending }] = useSendMessageMutation();
  const [markAsRead] = useMarkAsReadMutation();
  const [deleteMessage] = useDeleteMessageMutation();
  const [deleteAllMessages] = useDeleteAllMessagesMutation();

  const allMessagesWithRealTime = useMemo(() => {
    const baseMessages = allMessagesData?.data || [];
    const realTimeMap = new Map(realTimeMessages.map(m => [m._id, m]));
    const baseMap = new Map(baseMessages.map(m => [m._id, m]));
    
    realTimeMap.forEach((msg, id) => {
      baseMap.set(id, msg);
    });
    
    return Array.from(baseMap.values());
  }, [allMessagesData?.data, realTimeMessages]);

  const messages = allMessagesWithRealTime;
  
  const chatMessages = useMemo(() => {
    if (!selectedUserId) return [];
    const baseMessages = userMessagesData?.data || [];
    const realTimeForUser = realTimeMessages.filter(m => m.userId === selectedUserId);
    const combined = [...baseMessages, ...realTimeForUser];
    const unique = Array.from(new Map(combined.map(m => [m._id, m])).values());
    return unique.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }, [userMessagesData?.data, realTimeMessages, selectedUserId]);

  const uniqueUsers = useMemo(() => {
    const userMap = new Map();
    const sortedMessages = [...messages].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    sortedMessages.forEach((msg) => {
      if (!userMap.has(msg.userId)) {
        const user = usersData?.data?.find(u => (u.mongoId || u.id) === msg.userId);
        const unreadMsgs = messages.filter(m => m.userId === msg.userId && m.sentBy === "user" && m.isRead === false);
        const displayName = user?.name?.trim() || `User ${msg.userId.slice(-6)}`;
        userMap.set(msg.userId, {
          userId: msg.userId,
          name: displayName,
          email: user?.email || '',
          lastMessage: msg.content || msg.fileName || 'File',
          lastMessageTime: msg.createdAt,
          isRead: msg.sentBy === "user" ? (msg.isRead ?? false) : true,
          unreadCount: unreadMsgs.length,
        });
      } else {
        const existing = userMap.get(msg.userId);
        const user = usersData?.data?.find(u => (u.mongoId || u.id) === msg.userId);
        if (user?.name?.trim()) {
          existing.name = user.name.trim();
        }
        const msgTime = new Date(msg.createdAt).getTime();
        const existingTime = new Date(existing.lastMessageTime).getTime();
        
        if (msgTime >= existingTime) {
          existing.lastMessage = msg.content || msg.fileName || 'File';
          existing.lastMessageTime = msg.createdAt;
          if (msg.sentBy === "user") {
            existing.isRead = msg.isRead ?? false;
          }
        }
      }
    });
    
    const usersArray = Array.from(userMap.values());
    usersArray.forEach(user => {
      const userData = usersData?.data?.find(u => (u.mongoId || u.id) === user.userId);
      if (userData?.name?.trim()) {
        user.name = userData.name.trim();
      }
      const unreadMsgs = messages.filter(m => m.userId === user.userId && m.sentBy === "user" && m.isRead === false);
      user.unreadCount = unreadMsgs.length;
      user.isRead = unreadMsgs.length === 0;
    });
    
    return usersArray.sort((a, b) => {
      if (a.unreadCount > 0 && b.unreadCount === 0) return -1;
      if (a.unreadCount === 0 && b.unreadCount > 0) return 1;
      const timeA = new Date(a.lastMessageTime).getTime();
      const timeB = new Date(b.lastMessageTime).getTime();
      return timeB - timeA;
    });
  }, [messages, usersData]);

  const filteredUsers = useMemo(() => {
    let users = uniqueUsers;
    
    if (activeTab === 'Unread') {
      users = users.filter(user => user.unreadCount > 0);
    }
    
    if (search.trim()) {
      users = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    return users;
  }, [uniqueUsers, search, activeTab]);

  const unreadCount = useMemo(() => {
    return messages.filter(m => m.sentBy === "user" && m.isRead === false).length;
  }, [messages]);

  useEffect(() => {
    const socket = getSocket();
    if (socket) {
      socketRef.current = socket;

      const handleNewMessage = (message: Message) => {
        setRealTimeMessages(prev => {
          const exists = prev.find(m => m._id === message._id);
          if (exists) {
            return prev.map(m => m._id === message._id ? { ...m, ...message } : m);
          }
          return [...prev, message];
        });
        
        const userExists = usersData?.data?.find(u => (u.mongoId || u.id) === message.userId);
        if (!userExists) {
          setTimeout(() => {
            refetchUsers();
          }, 100);
        }
        
        if (message.userId === selectedUserId) {
          refetchUserMessages();
        }
        
        setTimeout(() => {
          refetchAllMessages();
        }, 200);
      };

      socket.on('new_message', handleNewMessage);

      socket.on('message_sent', (response: { success: boolean; data: Message }) => {
        if (response.success && response.data) {
          handleNewMessage(response.data);
        }
      });

      socket.on('message_error', (error: { success: boolean; message: string }) => {
        showToast(error.message || "Failed to send message", "error");
      });

      socket.on('chat_deleted', () => {
        refetchAllMessages();
        refetchUserMessages();
        setRealTimeMessages([]);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off('new_message');
        socketRef.current.off('message_sent');
        socketRef.current.off('message_error');
        socketRef.current.off('chat_deleted');
      }
    };
  }, [selectedUserId, refetchAllMessages, refetchUserMessages, refetchUsers, usersData, showToast]);

  useEffect(() => {
    if (socketRef.current && selectedUserId) {
      const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
      if (token) {
        socketRef.current.emit('join_user_room', selectedUserId);
      }
    }
  }, [selectedUserId]);

  useEffect(() => {
    return () => {
      disconnectSocket();
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [isRecording]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node)) {
        setContextMenu(null);
      }
      if (deleteMenuRef.current && !deleteMenuRef.current.contains(event.target as Node)) {
        setShowDeleteChatMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      showToast("Failed to start recording. Please allow microphone access.", "error");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSend = async (contentOverride?: string) => {
    const messageContent = contentOverride || input.trim();
    if (!selectedUserId) {
      showToast("Please select a user to send message", "error");
      return;
    }

    if (!messageContent && !selectedFile && !audioBlob) {
      return;
    }

    const socket = socketRef.current;

    try {
      if (audioBlob) {
        const audioFile = new File([audioBlob], 'voice-message.webm', { type: 'audio/webm' });
        await sendMessage({
          messageType: 'voice',
          file: audioFile,
          userId: selectedUserId,
        }).unwrap();
        
        setAudioBlob(null);
        showToast("Voice message sent successfully", "success");
        refetchAllMessages();
        refetchUserMessages();
      } else if (selectedFile) {
        await sendMessage({
          messageType: selectedFile.type.startsWith('image/') ? 'image' : selectedFile.type === 'application/pdf' ? 'pdf' : selectedFile.type.startsWith('audio/') ? 'voice' : 'document',
          content: messageContent || undefined,
          file: selectedFile,
          userId: selectedUserId,
        }).unwrap();
        
        setInput("");
        setSelectedFile(null);
        setFilePreview(null);
        showToast("Message sent successfully", "success");
        refetchAllMessages();
        refetchUserMessages();
      } else if (messageContent && socket) {
        setInput("");
        setReplyingTo(null);
        
        socket.emit('send_message', {
          messageType: 'text',
          content: messageContent,
          userId: selectedUserId,
        });
      }
    } catch (error: any) {
      showToast(error?.data?.message || "Failed to send message", "error");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
    }
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  };

  const handleThumbClick = () => {
    if (!selectedUserId) {
      showToast("Please select a user to send message", "error");
      return;
    }
    handleSend('👍');
  };

  const handleContextMenu = (e: React.MouseEvent, message: Message) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      messageId: message._id,
    });
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      await deleteMessage(messageId).unwrap();
      setRealTimeMessages(prev => prev.filter(m => m._id !== messageId));
      refetchAllMessages();
      refetchUserMessages();
      showToast("Message deleted successfully", "success");
      setContextMenu(null);
    } catch (error: any) {
      showToast(error?.data?.message || "Failed to delete message", "error");
    }
  };

  const handleReply = (message: Message) => {
    setReplyingTo(message);
    setContextMenu(null);
  };

  const handleDeleteChat = () => {
    setShowDeleteChatMenu(false);
    setShowDeleteChatModal(true);
  };

  const confirmDeleteChat = async () => {
    if (!selectedUserId) return;
    
    try {
      await deleteAllMessages({ userId: selectedUserId }).unwrap();
      setRealTimeMessages([]);
      refetchAllMessages();
      refetchUserMessages();
      showToast("Chat deleted successfully", "success");
      setShowDeleteChatModal(false);
      setShowMessageBody(false);
      setSelectedUserId(null);
    } catch (error: any) {
      showToast(error?.data?.message || "Failed to delete chat", "error");
    }
  };

  const handleUserClick = async (userId: string) => {
    setSelectedUserId(userId);
    setShowMessageBody(true);
    
    const unreadMessageIds = messages
      .filter(m => m.userId === userId && m.sentBy === "user" && m.isRead === false)
      .map(m => m._id);
    
    if (unreadMessageIds.length > 0) {
      try {
        await markAsRead({ messageIds: unreadMessageIds }).unwrap();
        setRealTimeMessages(prev => 
          prev.map(msg => 
            unreadMessageIds.includes(msg._id) && msg.sentBy === "user"
              ? { ...msg, isRead: true }
              : msg
          )
        );
        refetchAllMessages();
        refetchUserMessages();
      } catch (error: any) {
        console.error('Failed to mark messages as read:', error);
      }
    }
  };

  const selectedUser = useMemo(() => {
    if (!selectedUserId) return null;
    return usersData?.data?.find(u => (u.mongoId || u.id) === selectedUserId);
  }, [selectedUserId, usersData]);

  const handleVoiceSend = () => {
    handleSend();
    setAudioBlob(null);
  };

  return (
    <div className="">
      <BreadCrum />
      <div className="flex flex-col sm:flex-row gap-4 mt-2">
        <UserList
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          search={search}
          setSearch={setSearch}
          filteredUsers={filteredUsers}
          selectedUserId={selectedUserId}
          messagesLoading={messagesLoading}
          messagesCount={messages.length}
          unreadCount={unreadCount}
          onUserClick={handleUserClick}
          formatDate={formatDate}
          formatTime={formatTime}
        />
        {showMessageBody && selectedUserId ? (
          <div className="w-full sm:w-[66%] lg:w-[67%] xl:w-[67%] 2xl:w-[72%] border border-[#B1A9A9] bg-white rounded-[8px] flex flex-col justify-between min-h-[500px]">
            <ChatHeader
              selectedUser={selectedUser}
              showDeleteChatMenu={showDeleteChatMenu}
              setShowDeleteChatMenu={setShowDeleteChatMenu}
              onDeleteChat={handleDeleteChat}
              deleteMenuRef={deleteMenuRef}
            />
            <MessageList
              chatMessages={chatMessages}
              selectedUser={selectedUser}
              userMessagesLoading={userMessagesLoading}
              formatTime={formatTime}
              onContextMenu={handleContextMenu}
            />
            {contextMenu && (
              <ContextMenu
                x={contextMenu.x}
                y={contextMenu.y}
                onDelete={() => handleDeleteMessage(contextMenu.messageId)}
                contextMenuRef={contextMenuRef}
              />
            )}
            {replyingTo && (
              <div className="flex justify-end items-end px-6 pb-2">
                <div className="max-w-[60%] px-4 py-2 rounded-lg bg-gray-200 rounded-br-none text-sm">
                  <p className="text-xs text-gray-600">Replying to:</p>
                  <p className="text-xs">{replyingTo.content || 'File'}</p>
                  <button
                    onClick={() => setReplyingTo(null)}
                    className="text-xs text-red-600 mt-1 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            <MessageInput
              input={input}
              setInput={setInput}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              setFilePreview={setFilePreview}
              isRecording={isRecording}
              audioBlob={audioBlob}
              selectedUserId={selectedUserId}
              sending={sending}
              onSend={handleSend}
              onThumbClick={handleThumbClick}
              onFileSelect={handleFileSelect}
              startRecording={startRecording}
              stopRecording={stopRecording}
              onVoiceSend={handleVoiceSend}
            />
          </div>
        ) : (
          <div>
          {/* <div className="w-full sm:w-[66%] lg:w-[67%] xl:w-[67%] 2xl:w-[72%] border border-[#B1A9A9] bg-white rounded-[8px] flex items-center justify-center min-h-[500px]"> */}
            {/* <p className="text-[#717171]">Select a user from the list to view messages</p> */}
          </div>
        )}
      </div>
      <DeleteChatModal
        isOpen={showDeleteChatModal}
        onClose={() => setShowDeleteChatModal(false)}
        onConfirm={confirmDeleteChat}
      />
    </div>
  );
};

export default Messages;
