import { useDispatch, useSelector } from "react-redux";
import { selectListMessages, setListMessages } from "../../Redux/chatSlice";
import ChatMessage from "../ChatMessage/ChatMessage";
import { useEffect } from "react";

const ChatMessageContainer = ({isGroup = false, socket}) => {

  const listMessages = useSelector(selectListMessages)
  const dispatch = useDispatch()

  useEffect(() => {
    socket?.on("mensaje-recibido", listMessages => {
      console.log("listmessges-socketon", listMessages)
      dispatch(setListMessages(listMessages));
    })
    return () => {socket?.off("mensaje-recibido", listMessages)}
  },[socket])

  return (
    <div className="flex flex-col w-full h-full gap-2 my-1 overflow-x-hidden p-2">
      {
        listMessages.messages?.map((message, index) => {
          return(
            <ChatMessage
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