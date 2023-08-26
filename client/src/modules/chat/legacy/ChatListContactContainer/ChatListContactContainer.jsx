import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectListChats, setListChats } from "../../../../redux/chatSlice";
import { selectUserProfile } from "../../../../redux/UsersSlice";
import { ChatListContact } from "../index";

export const ChatListContactContainer = () => {
  const listChats = useSelector(selectListChats);
  const user = useSelector(selectUserProfile);

  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      dispatch(setListChats({ user_id: user?.id, query_name: "" }));
    }
  }, [user]);

  return (
    <div className="flex flex-col w-full h-auto">
      {listChats?.length > 0 && typeof listChats !== "string" ? (
        listChats?.map((conversation, index) => {
          return (
            <ChatListContact
              key={index}
              id={conversation.id}
              isGroup={conversation.isGroup}
              name={conversation.name}
              image={conversation.image}
              last_message={conversation.last_message}
              last_message_date={conversation.last_message_date}
              no_read_counter={conversation.no_read_counter}
              bio={"bio placeholder"}
              show_last_message={true}
            />
          );
        })
      ) : (
        <p className="text-xs m-3">
          No tienes ningun chat. Inicia una conversación!
        </p>
      )}
    </div>
  );
};
