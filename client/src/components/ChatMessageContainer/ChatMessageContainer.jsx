import { useDispatch, useSelector } from "react-redux";
import { selectListMessages, setListMessages } from "../../Redux/chatSlice";
import ChatMessage from "../ChatMessage/ChatMessage";
import { useEffect, useRef } from "react";
//import scrollbart from './scrollbar.css';

const ChatMessageContainer = ({isGroup, socket}) => {

  const listMessages = useSelector(selectListMessages)
  const messagesRef = useRef(null);
  const dispatch = useDispatch()

  const receivedMessage = data => {
    const sortedMessages = [...data?.messages].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    const newData = {...data, messages: sortedMessages}
    console.log("listmessges-socketon", newData)
    dispatch(setListMessages(newData));
  }

  useEffect(() => {
    socket?.on("mensaje-recibido", receivedMessage)
    return () => {socket?.off("mensaje-recibido", receivedMessage)}
  },[socket])

  useEffect(() => {
    const messageContainer = messagesRef.current;
    messageContainer && (messageContainer.scrollTop = messageContainer.scrollHeight);
  },[listMessages])

  return (
    <div ref={messagesRef} className="custom-scrollbar flex flex-col w-full h-full gap-2 my-1 overflow-x-hidden p-2">
      {
        listMessages?.messages?.length > 0  && listMessages?.messages?.map((message, index) => {
          return(
            <ChatMessage
              socket={socket}
              key={index}
              userId={message.userId}
              username={message.username}
              profile_image={message.profile_image}
              messageId={message.messageId}
              createdAt={message.createdAt}
              content={message.content}
              status={message.status}
              isGroup={isGroup}
            />
          )
        })
      }
    </div>
  )
}

export default ChatMessageContainer;