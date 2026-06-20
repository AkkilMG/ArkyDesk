import { useState, useEffect, useRef } from "react";
import type { UserDetails, Message } from "@/types/settings";
import Shimmer from "../ui/Shimmer";

interface AdminChatProps {
  settings: boolean;
  setSettings: (value: boolean) => void;
  isMobile: boolean;
  currentUser: UserDetails | null;
}

interface ChatMessage {
  _id: string;
  message: string;
  sender: {
    _id: string;
    name: string;
  };
  timestamp: Date;
  type: 'message' | 'system';
}

interface AdminStatus {
  _id: string;
  name: string;
  isOnline: boolean;
  lastSeen: Date;
}

export default function AdminChat({ settings, setSettings, isMobile, currentUser }: AdminChatProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [onlineAdmins, setOnlineAdmins] = useState<AdminStatus[]>([]);
    const [typingUsers, setTypingUsers] = useState<string[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [messageCount, setMessageCount] = useState(0);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Common emojis for quick access
    const quickEmojis = ['👍', '👎', '😊', '😂', '❤️', '🔥', '✅', '❌', '🤔', '👋', '🎉', '💯'];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Enhanced message fetching
    useEffect(() => {
        if (!currentUser?._id) return;

        const fetchData = async () => {
            try {
                if (messages.length === 0) setLoading(true);
                
                const chatResponse = await fetch(`/api/admin/chat?userId=${currentUser._id}&connectionId=${Date.now()}`);
                
                if (chatResponse.ok) {
                    const chatData = await chatResponse.json();
                    setMessages(chatData.messages);
                    setMessageCount(chatData.messages.length);
                    setIsConnected(true);
                } else {
                    console.error('Failed to fetch messages');
                    setIsConnected(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsConnected(false);
            } finally {
                setLoading(false);
            }
        };

        // Initial fetch
        fetchData();

        // Set up polling every 2 seconds
        pollIntervalRef.current = setInterval(fetchData, 2000);

        return () => {
            if (pollIntervalRef.current) {
                clearInterval(pollIntervalRef.current);
            }
        };
    }, [currentUser?._id, messages.length]);

    // Handle typing indicators
    const handleTyping = () => {
        if (!isTyping) {
            setIsTyping(true);
            // Send typing status to server (would need API endpoint)
        }

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
            // Send stop typing status to server
        }, 3000);
    };

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!newMessage.trim() || !currentUser?._id || sending) {
            return;
        }

        setSending(true);
        setIsTyping(false);

        try {
            const response = await fetch('/api/admin/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: currentUser._id,
                    message: newMessage.trim()
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Add the message locally for immediate feedback
                setMessages(prev => [...prev, data.message]);
                setNewMessage('');
                setShowEmojiPicker(false);
            } else {
                console.error('Failed to send message:', data.error);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setSending(false);
        }
    };

    const insertEmoji = (emoji: string) => {
        setNewMessage(prev => prev + emoji);
        setShowEmojiPicker(false);
    };

    const formatTime = (timestamp: Date) => {
        const date = new Date(timestamp);
        const now = new Date();
        const isToday = date.toDateString() === now.toDateString();
        
        if (isToday) {
            return date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            });
        } else {
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    };

    const getMessageGroups = (messages: ChatMessage[]) => {
        const groups: ChatMessage[][] = [];
        let currentGroup: ChatMessage[] = [];
        
        messages.forEach((message, index) => {
            if (message.type === 'system') {
                if (currentGroup.length > 0) {
                    groups.push(currentGroup);
                    currentGroup = [];
                }
                groups.push([message]);
                return;
            }

            const prevMessage = messages[index - 1];
            const shouldGroup = prevMessage && 
                prevMessage.sender._id === message.sender._id &&
                prevMessage.type !== 'system' &&
                (new Date(message.timestamp).getTime() - new Date(prevMessage.timestamp).getTime()) < 300000; // 5 minutes

            if (shouldGroup && currentGroup.length > 0) {
                currentGroup.push(message);
            } else {
                if (currentGroup.length > 0) {
                    groups.push(currentGroup);
                }
                currentGroup = [message];
            }
        });

        if (currentGroup.length > 0) {
            groups.push(currentGroup);
        }

        return groups;
    };

    return (
        <div className="flex-1 px-4 py-4 pt-5 md:px-8 md:py-4 flex flex-col h-full max-h-screen">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold">Admin Chat</h2>
                    <div className="flex items-center gap-2">
                        <Shimmer className={`w-3 h-3 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} shape="circle" />
                        <span className={`text-sm ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
                            {isConnected ? 'Connected' : 'Reconnecting...'}
                        </span>
                    </div>
                </div>
                
                {/* Admin Chat Room indicator */}
                <div className="text-sm text-gray-600">
                    Admin Chat Room
                </div>
            </div>

            {/* Chat Messages */}
            <div 
                ref={messagesContainerRef}
                className="flex-1 bg-gradient-to-b from-gray-50 to-white rounded-lg p-4 overflow-y-auto mb-4 min-h-0 border shadow-inner"
            >
                {loading ? (
                    <div className="space-y-3 mt-2">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className={`flex ${item % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                                <div className="max-w-xs lg:max-w-md space-y-2">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Shimmer className="h-6 w-6 rounded-full" shape="circle" />
                                        <Shimmer className="h-3 w-24 rounded" />
                                    </div>
                                    <div className={`p-4 rounded-2xl ${item % 2 === 0 ? 'ml-auto' : ''}`}>
                                        <Shimmer className="h-3 w-56 rounded mb-2" />
                                        <Shimmer className="h-3 w-44 rounded" />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="text-center text-gray-500 text-sm">Loading messages...</div>
                    </div>
                ) : messages.length === 0 ? (
                    <div className="text-center text-gray-500 mt-8">
                        <div className="text-6xl mb-4">💬</div>
                        <div className="text-lg font-medium mb-2">Welcome to Admin Chat!</div>
                        <div className="text-sm mb-2">This is a private chat room for administrators only.</div>
                        <div className="text-sm">Start a conversation with your fellow admins.</div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {getMessageGroups(messages).map((group, groupIndex) => (
                            <div key={groupIndex}>
                                {group[0].type === 'system' ? (
                                    <div className="text-center text-sm text-gray-500 italic py-2">
                                        {group[0].message}
                                    </div>
                                ) : (
                                    <div className={`flex ${group[0].sender._id === currentUser?._id ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-xs lg:max-w-md space-y-1`}>
                                            {/* Sender info for grouped messages */}
                                            {group[0].sender._id !== currentUser?._id && (
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white text-xs font-semibold">
                                                        {group[0].sender.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="text-xs text-gray-600">{group[0].sender.name}</span>
                                                    <span className="text-xs text-gray-400">{formatTime(group[0].timestamp)}</span>
                                                </div>
                                            )}
                                            
                                            {/* Messages in group */}
                                            {group.map((message, messageIndex) => (
                                                <div
                                                    key={message._id}
                                                    className={`px-4 py-2 rounded-2xl break-words ${
                                                        message.sender._id === currentUser?._id 
                                                            ? 'bg-blue-600 text-white ml-auto' 
                                                            : 'bg-white border shadow-sm'
                                                    } ${
                                                        // Rounded corners for message grouping
                                                        group.length > 1 && messageIndex === 0 ? (
                                                            message.sender._id === currentUser?._id 
                                                                ? 'rounded-br-md' 
                                                                : 'rounded-bl-md'
                                                        ) : group.length > 1 && messageIndex === group.length - 1 ? (
                                                            message.sender._id === currentUser?._id 
                                                                ? 'rounded-tr-md' 
                                                                : 'rounded-tl-md'
                                                        ) : group.length > 1 && messageIndex > 0 && messageIndex < group.length - 1 ? (
                                                            message.sender._id === currentUser?._id 
                                                                ? 'rounded-r-md' 
                                                                : 'rounded-l-md'
                                                        ) : ''
                                                    }`}
                                                >
                                                    <div className="text-sm whitespace-pre-wrap">
                                                        {message.message}
                                                    </div>
                                                    {/* Show timestamp for own messages or last message in group */}
                                                    {(message.sender._id === currentUser?._id || messageIndex === group.length - 1) && (
                                                        <div className={`text-xs mt-1 ${
                                                            message.sender._id === currentUser?._id 
                                                                ? 'text-blue-200' 
                                                                : 'text-gray-400'
                                                        }`}>
                                                            {formatTime(message.timestamp)}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        
                        {/* Typing indicator */}
                        {typingUsers.length > 0 && (
                            <div className="flex justify-start">
                                <div className="bg-gray-200 rounded-2xl px-4 py-2 max-w-xs">
                                    <div className="flex items-center space-x-1">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                        </div>
                                        <span className="text-xs text-gray-500 ml-2">
                                            {typingUsers.join(', ')} typing...
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {/* Message Input */}
            <div className="relative">
                {/* Emoji Picker */}
                {showEmojiPicker && (
                    <div className="absolute bottom-full left-0 mb-2 bg-white border rounded-lg shadow-lg p-3 grid grid-cols-6 gap-2 z-10">
                        {quickEmojis.map((emoji) => (
                            <button
                                key={emoji}
                                onClick={() => insertEmoji(emoji)}
                                className="text-xl hover:bg-gray-100 rounded p-1 transition-colors"
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                )}

                <form onSubmit={sendMessage} className="flex gap-2 items-end">
                    <div className="flex-1 relative">
                        <textarea
                            value={newMessage}
                            onChange={(e) => {
                                setNewMessage(e.target.value);
                                handleTyping();
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    sendMessage(e);
                                }
                            }}
                            placeholder={isConnected ? "Type your message... (Enter to send, Shift+Enter for new line)" : "Connecting..."}
                            disabled={!isConnected || sending}
                            className="w-full px-4 py-3 pr-12 border rounded-lg focus:border-blue-500 focus:outline-none disabled:bg-gray-100 disabled:text-gray-500 resize-none text-sm"
                            style={{ minHeight: '48px', maxHeight: '120px' }}
                            rows={1}
                            maxLength={1000}
                        />
                        
                        {/* Emoji button */}
                        <button
                            type="button"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg"
                        >
                            😊
                        </button>
                        
                        {/* Character count */}
                        <div className="absolute -bottom-5 right-0 text-xs text-gray-400">
                            {newMessage.length}/1000
                        </div>
                    </div>
                    
                    <button
                        type="submit"
                        disabled={!isConnected || !newMessage.trim() || sending}
                        className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2 text-sm"
                    >
                        {sending ? (
                            <Shimmer className="w-4 h-4 rounded-full" shape="circle" variant="button" />
                        ) : (
                            <>
                                <span className="hidden sm:inline">Send</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* Connection status */}
            {!isConnected && (
                <div className="mt-2 text-sm text-red-600 text-center">
                    <span className="inline-flex items-center justify-center">
                        <Shimmer className="inline-block h-3 w-3 bg-red-600 rounded-full mr-2" shape="circle" />
                        Connection lost. Attempting to reconnect...
                    </span>
                </div>
            )}

            {/* Message count indicator */}
            {messageCount > 0 && (
                <div className="mt-1 text-xs text-gray-400 text-center">
                    {messageCount} message{messageCount !== 1 ? 's' : ''} in chat
                </div>
            )}
        </div>
    );
}
