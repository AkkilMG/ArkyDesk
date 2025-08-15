"use client";

import { colorTags, fileColor } from "@/types/color";
import { getFileIcon, formatFileSize, truncateFilename } from "@/lib/fileUtils";
import { useState, useEffect } from "react";
import ImagePopup from "./imagePop";

function TicketDetailsAvailable({ fetchComment, data, userInfo, onTicketUpdate, onBack }: any) {
  const [timing, setTiming] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [comment, setComment] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);
  const [isClosingTicket, setIsClosingTicket] = useState(false);

  const handleImageOpen = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowPopup(true);
  };
  
  const handleClose = () => {
    setShowPopup(false);
    setSelectedImage('');
  };

  useEffect(() => {
    function convertTime(createdAt: string) {
      let date = new Date(createdAt);
      let day = date.getDate();
      let month = date.toLocaleString('default', { month: 'long' });
      let year = date.getFullYear();
      let hours = date.getHours();
      var minutes: any = date.getMinutes();
      let ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? String('0' + minutes) : minutes;
      let strTime = hours + ':' + minutes + ' ' + ampm;
      let strDate = `${day}th of ${month} ${year}`;
      setTiming(strDate + ' at ' + strTime);
    }
  }, [data.createdAt, data.files]);

  async function sendComment() {
    if (data.status === 'closed') return;
    if (!comment.trim()) return;
    
    setIsCommenting(true);
    try {
      const res = await fetch("/api/dashboard/comment", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              comment: comment.trim(),
              ticketId: data._id,
          }),
      });
      const datax = await res.json();
      if (datax.success) {
          setComment('');
          // Trigger refresh of comments without page reload
          if (onTicketUpdate) {
            onTicketUpdate();
          }
      } else {
          console.error("Comment failed:", datax.message);
      }
    } catch (error) {
        console.error("Error during comment:", error);
    } finally {
      setIsCommenting(false);
    }
  }

  
  async function closeTicket() {
    setIsClosingTicket(true);
    try {
      const res = await fetch("/api/admin-dashboard/tickets", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              ticketId: data._id,
          }),
      });
      const datax = await res.json();
      if (datax.success) {
          // Update ticket state without page reload
          if (onTicketUpdate) {
            await onTicketUpdate();
          }
          // Don't automatically go back - let user choose
          // if (onBack) {
          //   onBack();
          // }
      } else {
          console.error("Close ticket failed:", datax.message);
      }
    } catch (error) {
        console.error("Error during ticket close:", error);
    } finally {
      setIsClosingTicket(false);
    }
  }

  
  const [admin, setAdmin] = useState(false);
  async function handleAdmin() {
      try {
          const res = await fetch('/api/auth/verify', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          const data = await res.json();
          if (data.success) {
              if (data.admin) {
                  setAdmin(true);
              } else {
                  setAdmin(false);
              }
          } else {
              console.error('Verify failed:', data.message);
          }
      } catch (error) {
          console.error('Error verify out:', error);
      }
  }

  useEffect(() => {
      handleAdmin();
  }, []);

  return (
    <>
      {showPopup && <ImagePopup imageUrl={selectedImage} onClose={handleClose} />}
      
      <div className="space-y-4 p-6 sm:p-4 md:p-5 fade-in">
        <div>
          {/* Mobile-first responsive header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 sm:space-x-2 mb-4">
            <div className="flex items-center space-x-2">
              <button 
                onClick={onBack}
                className="focus:outline-none p-1 mt-1 hover:bg-gray-100 rounded-lg transition-smooth flex-shrink-0"
              >
                <img src="/icons/back.svg" alt="Back" className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 break-words">
                  {data.subject}
                </h2>
                <div className="flex items-center flex-wrap gap-2 mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    data.status === 'open' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {data.status === 'open' ? '● Open' : '● Closed'}
                  </span>
                  {data.status === 'closed' && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      ✓ Resolved
                    </span>
                  )}
                  <span className="text-xs text-gray-500">
                    ID: {data._id.slice(-6).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            {admin && data.status === 'open' && (
              <button 
                onClick={closeTicket} 
                disabled={isClosingTicket}
                className="text-sm sm:text-md text-red-600 px-3 py-2 rounded-lg hover:bg-red-600 hover:text-white border-2 border-red-600 transition-smooth btn-hover disabled:bg-gray-400 disabled:border-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed w-full sm:w-auto"
              >
                {isClosingTicket ? (
                  <span className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                    <span>Closing...</span>
                  </span>
                ) : (
                  'Mark as Solved'
                )}
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {data.tags?.map((tag: string, index: number) => {
              return colorTags(tag, index)
            })}
          </div>
        </div>

        <hr className="bg-gray-200 h-0.5 my-4 w-full" />

        <div>
          <div className="flex items-start space-x-2 sm:space-x-3 mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-400 flex items-center justify-center text-white font-semibold flex-shrink-0 text-sm sm:text-base">
              {userInfo?.name ? userInfo.name?.charAt(0).toUpperCase() : '!'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 break-words">
                <span>{userInfo?.name ? userInfo.name : 'Mr. Customer'}</span>
                <span className="text-gray-500 font-normal ml-1 sm:ml-2 block sm:inline">{timing || 'Someday'}</span>
              </p>
              <div className="mt-3 text-sm text-gray-700 bg-gray-50 p-3 sm:p-4 rounded-lg max-h-32 sm:max-h-40 overflow-y-auto">
                {data.description}
              </div>
            </div>
          </div>
        </div>

        {data.attachment && data.attachment.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Attachments</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {data.attachment.map((file: any, index: number) => {
                const fileExtension = file.name.split('.').pop()?.toUpperCase() || '';
                const fileName = file.name || 'Unknown file';
                const fileSize = file.formattedSize || '';
                const isImage = file.isImage || false;
                return (
                  <div 
                    key={index} 
                    onClick={(e) => {
                      // If it's an image and has an attachment URL, show preview
                      if (isImage && file.url) {
                        handleImageOpen(file.url);
                      }
                    }} 
                    className={`flex items-center space-x-2 sm:space-x-3 bg-gray-50 hover:bg-gray-100 p-2 sm:p-3 rounded-lg border transition-smooth card-hover ${
                      isImage && data.attachment ? 'cursor-pointer' : 'cursor-default'
                    }`}
                  >
                    <span className="text-lg flex-shrink-0">
                      {/* {fileIcon} */}
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded uppercase font-semibold">
                          {fileExtension}
                        </span>
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {truncateFilename(fileName, 20)}
                      </p>
                      <div className="flex items-center flex-wrap gap-1 sm:gap-2 mt-1">
                        {/* <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded uppercase font-semibold">
                          {fileExtension}
                        </span> */}
                        <span className="text-xs text-gray-500">
                          {fileSize}
                        </span>
                        {isImage && data.attachment && (
                          <span className="text-xs text-blue-600 font-medium">
                            Click to preview
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div>
          <p className="font-semibold text-sm text-gray-700 mb-3">Reply to this ticket</p>
          <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-3 mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-blue-200 bg-blue-50 flex items-center justify-center text-blue-600 text-sm font-semibold flex-shrink-0 self-start sm:mt-0">
              {userInfo?.name ? userInfo.name?.charAt(0).toUpperCase() : '!'}
            </div>
            <div className="flex-1 bg-white border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-300 focus-within:border-blue-400 transition-smooth">
              <textarea 
                onChange={e => setComment(e.target.value)} 
                value={comment} 
                rows={3} 
                placeholder={data.status === 'closed' ? 'This ticket is closed' : 'Type your response here...'}
                disabled={data.status === 'closed'}
                className="w-full text-sm text-black bg-transparent border-none p-3 focus:outline-none resize-none disabled:text-gray-400 disabled:bg-gray-50" 
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && data.status !== 'closed') {
                    e.preventDefault();
                    sendComment();
                  }
                }}
              />
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 pt-0 space-y-2 sm:space-y-0">
                <span className="text-xs text-gray-500 order-2 sm:order-1">
                  {data.status === 'closed' ? 'Ticket is closed' : 'Press Ctrl+Enter to send'}
                </span>
                <button 
                  className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-smooth btn-hover disabled:bg-gray-400 disabled:cursor-not-allowed order-1 sm:order-2 ${data.status === 'closed' ? 'cursor-not-allowed' : ''}`}
                  onClick={sendComment} 
                  disabled={!comment.trim() || isCommenting || data.status === 'closed'}
                >
                  {isCommenting ? (
                    <span className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </span>
                  ) : (
                    'Send Reply'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            Comments 
            <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              {fetchComment.length}
            </span>
          </h3>
          <div className="space-y-3 sm:space-y-4 max-h-80 sm:max-h-96 overflow-y-auto">
            {fetchComment.length > 0 ? (
              fetchComment.map((comment: any, index: number) => (
                <div key={index} className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-smooth fade-in" style={{animationDelay: `${index * 100}ms`}}>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs sm:text-sm font-semibold flex-shrink-0">
                    {comment?.user?.name ? comment.user.name?.charAt(0).toUpperCase() : '!'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 space-y-1 sm:space-y-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {comment?.user?.name ? comment.user.name : 'Mr. Customer'}
                      </p>
                      <p className="text-xs text-gray-500 flex-shrink-0">
                        {comment.createdAt}
                      </p>
                    </div>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap break-words">{comment.comment}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 px-4">
                <div className="text-gray-400 mb-3">
                  <svg className="mx-auto h-8 w-8 sm:h-10 sm:w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.13 8.13 0 01-2.939-.542l-3.677-.892.892 3.677A8.13 8.13 0 007.58 21L12 16.5z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-500">No comments yet</p>
                <p className="text-xs text-gray-400 mt-1">Be the first to comment on this ticket</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function TicketDetailsError({error}: any) {
  return (
    <p className="text-gray-600">{error}</p>
  )
}

export default function TicketDetails({ data, fetchComment, ticketId, userInfo, onTicketUpdate, onBack }: any) {
  var component, error, info;
  data?.map((ticket: any) => {if (ticket._id === ticketId) {info = ticket}});
  if (info) {
    component = <TicketDetailsAvailable 
      data={info} 
      userInfo={userInfo} 
      fetchComment={fetchComment} 
      onTicketUpdate={onTicketUpdate}
      onBack={onBack}
    />;
  } else if (error) {
    component = <TicketDetailsError error={error}/>;
  } else {
    component = <TicketDetailsError error="Select a ticket to view details."/>;
  }
  return component;
}
