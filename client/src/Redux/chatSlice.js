import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const { VITE_URL } = import.meta.env;

const initialState = {
  activeConversation: null,
  conversations: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    addNewMessage: (state, action) => {
      const { conversationId, newMessage } = action.payload;
      const conversation = state.conversations.find(
        (conv) => conv.id === conversationId
      );

      if (conversation) {
        conversation.messages.push(newMessage);
      }
    },
    chatLogout: () => {
      return initialState;
    },
  },
});

export const {
  setActiveConversation,
  setConversations,
  setMessages,
  addNewMessage,
  chatLogout,
} = chatSlice.actions;

// Thunk para obtener las conversaciones del backend
// y cargarlas al estado global
export const loadConversations = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${VITE_URL}/chatroom/conversations/${userId}`,
      {
        withCredentials: "include",
      }
    );

    dispatch(setConversations(data));
  } catch (error) {
    console.error("Error fetching conversations:", error);
  }
};

// Thunk para filtrar las conversaciones del backend
// y cargarlas al estado global
export const searchConversations =
  (userId, searchQuery) => async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${VITE_URL}/chatroom/conversations/${userId}?query_name=${searchQuery}`,
        {
          withCredentials: "include",
        }
      );

      dispatch(setConversations(data));
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

// Thunk para enviar el mensaje y obtener la respuesta del backend
export const sendAndStoreMessage =
  (conversationId, messageData) => async (dispatch) => {
    let conversationType;

    conversationId.includes("group")
      ? (conversationType = "groups")
      : (conversationType = "chat");

    try {
      const { data } = await axios.post(
        `${VITE_URL}/chatroom/${conversationType}/${conversationId}/messages`,
        messageData,
        { withCredentials: "include" }
      );

      dispatch(addNewMessage({ conversationId, newMessage: data }));
    } catch (error) {
      console.error("Error al guardar el mensaje:", error);
    }
  };

// Thunk para editar el mensaje
export const editMessage =
  (conversationId, messageId, content) => async (dispatch) => {
    let conversationType;

    conversationId.includes("group")
      ? (conversationType = "groups")
      : (conversationType = "chat");

    try {
      await axios.put(
        `${VITE_URL}/chatroom/${conversationType}/${conversationId}/messages/${messageId}`,
        { content },
        { withCredentials: "include" }
      );

      dispatch(loadConversations(userId));
    } catch (error) {
      console.error("Error al eliminar el mensaje:", error);
    }
  };

// Thunk para eliminar el mensaje
export const deleteMessage = (conversationId, messageId) => async () => {
  let conversationType;

  conversationId.includes("group")
    ? (conversationType = "groups")
    : (conversationType = "chat");

  try {
    const { data } = await axios.put(
      `${VITE_URL}/chatroom/${conversationType}/${conversationId}/messages/${messageId}`,
      { messageStatus: "deleted" },
      { withCredentials: "include" }
    );

    return data;
  } catch (error) {
    console.error("Error al eliminar el mensaje:", error);
  }
};

// Thunk para crear un nuevo grupo de chat
export const createNewChatGroup =
  (userId, groupName, groupImage) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${VITE_URL}/chatroom/groups`,
        { name: groupName, image: groupImage },
        { withCredentials: "include" }
      );

      dispatch(loadConversations(userId));
      dispatch(setActiveConversation(`group${data.id}`));
    } catch (error) {
      console.error("Error al crear el grupo:", error);
    }
  };

export const editChatGroup = (userId, groupId, groupName, groupImage) => async (dispatch) => {
  try {
    await axios.put(
      `${VITE_URL}/chatroom/groups/${groupId}`,
      { name: groupName, image: groupImage },
      { withCredentials: "include" }
    );

    dispatch(loadConversations(userId));
    // dispatch(setActiveConversation(`group${data.id}`));
  } catch (error) {
    console.error("Error al editar el grupo:", error);
  }
}

// Thunk para agregar integrantes a un grupo de chat
export const addGroupMember = (data) => async (dispatch) => {
  try {
    const { ownerId, groupId, users } = data;

    for (const user of users) {
      await axios.post(
        `${VITE_URL}/chatroom/groups/${groupId}/users`,
        { userId: user, role: "member" },
        { withCredentials: "include" }
      );
    }

    dispatch(loadConversations(ownerId));
  } catch (error) {
    console.error("Error agregando integrante/s al grupo:", error);
  }
};

// Thunk para subir una imagen
export const addGroupImage = (formData) => async () => {
  try {
    const { data } = await axios.post(`${VITE_URL}/images/upload`, formData, {
      withCredentials: "include",
    });
    const urlImage = data.imageUrl;
    return urlImage;
  } catch (error) {
    console.error("Error subiendo imagen:", error);
  }
};

// Thunk para crear un nuevo grupo de chat
export const createNewPrivateChat = (userId, contactId) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${VITE_URL}/chatroom/chat`, { contactId },
      { withCredentials: "include" }
    );

    dispatch(loadConversations(userId));
    dispatch(setActiveConversation(`chat${data.chat_id}`));
  } catch (error) {
    console.error("Error al iniciar chat privado:", error);
  }
};

export default chatSlice.reducer;

// const initialState = {
//   isMinimized: false,
//   error: "",
//   message: "",
//   selectedUser: {},
//   listGroups: [],
//   listChats: [],
//   listMessages: [],
//   newChat: false,
// };

// export const postMessage = createAsyncThunk(
//   "chat/postMessage",
//   async ({ content, receiver_id, sender_id }) => {
//     try {
//       const { data } = await axios.post(
//         `${VITE_URL}/chatroom/message`,
//         { content, receiver_id, sender_id },
//         { withCredentials: "include" }
//       );
//       return data;
//     } catch (error) {
//       return error.response.data.error;
//     }
//   }
// );

// export const getMessages = createAsyncThunk(
//   "chat/getMessages",
//   async (chatId) => {
//     try {
//       const { data } = await axios.get(
//         `${VITE_URL}/chatroom/chat/${chatId}/messages`,
//         { withCredentials: "include" }
//       );
//       return data;
//     } catch (error) {
//       return error.response.data.error;
//     }
//   }
// );

// export const getMessagesByChat = createAsyncThunk(
//   "chat/getMessagesByChat",
//   async (id) => {
//     try {
//       const promise = (
//         await axios.get(
//           `${VITE_URL}/chatroom/conversations/${user_id}?query_name=${query_name}`,
//           { withCredentials: "include" }
//         )
//       ).data;
//       return promise;
//     } catch (error) {
//       return error.response.data.error;
//     }
//   }
// );

// const deleteMessage = createAsyncThunk(
//   "chat/deleteMessage",
//   async ({ message_id, isGroup, conversation_id }) => {
//     try {
//       const response = isGroup
//         ? await axios.put(
//             `${VITE_URL}/chatroom/groups/${conversation_id}/message/${message_id}`,
//             { messageStatus: "deleted" },
//             { withCredentials: "include" }
//           ).data
//         : await axios.put(
//             `${VITE_URL}/chatroom/chat/${conversation_id}/message/${message_id}`,
//             { messageStatus: "deleted" },
//             { withCredentials: "include" }
//           ).data;
//       return response;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

// const setListChats = createAsyncThunk(
//   "chat/setListChats",
//   async ({ user_id, query_name }) => {
//     try {
//       const promise = (
//         await axios.get(
//           `${VITE_URL}/chatroom/conversations/${user_id}?query_name=${query_name}`,
//           { withCredentials: "include" }
//         )
//       ).data;
//       return promise;
//     } catch (error) {
//       return error.response.data.error;
//     }
//   }
// );

// const createNewGroup = createAsyncThunk(
//   "chat/createNewGroup",
//   async ({ name }) => {
//     try {
//       const response = (
//         await axios.post(
//           `${VITE_URL}/chatroom/groups`,
//           { name },
//           { withCredentials: "include" }
//         )
//       ).data;
//       return response;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

// const getGroupList = createAsyncThunk("chat/getGroupList", async () => {
//   try {
//     const response = (
//       await axios.get(`${VITE_URL}/chatroom/groups?list=true`, {
//         withCredentials: "include",
//       })
//     ).data;
//     return response;
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// const createGroupMember = createAsyncThunk(
//   "chat/createGroupMember",
//   async ({ user_id, group_id }) => {
//     try {
//       const response = (
//         await axios.post(
//           `${VITE_URL}/chatroom/groups/${group_id}/users`,
//           { userId: user_id, role: "member" },
//           { withCredentials: "include" }
//         )
//       ).data;
//       return response;
//     } catch (error) {
//       throw new Error(error);
//     }
//   }
// );

// // const setListMessages = createAsyncThunk("chat/setListMessages", async(id) =>{
// //   try {
// //     const {data} = await axios.get(`${VITE_URL}/chatroom/chat/${id}/messages`, { withCredentials:"include"})
// //     data.messages.reverse();
// //     console.log("DATA: ", data)
// //     return data;
// //   } catch (error) {
// //     return error;
// //   }
// // })

// const chatSlice = createSlice({
//   name: "chat",
//   initialState,
//   reducers: {
//     setIsMinimized: (state, action) => {
//       state.isMinimized = action.payload;
//     },
//     setError: (state, action) => {
//       state.error = action.payload;
//     },
//     setMessage: (state, action) => {
//       state.message = action.payload;
//     },
//     setNewChat: (state, action) => {
//       state.newChat = action.payload;
//     },
//     setSelectedUser: (state, action) => {
//       const { id, isGroup, allUsers } = action.payload;
//       if (typeof id === "number") {
//         state.selectedUser = state.listChats.find(
//           (chat) => chat.id === id && chat.isGroup === isGroup
//         );
//       } else {
//         state.selectedUser = allUsers?.data.find((user) => user.id === id);
//       }
//     },
//     setListMessages: (state, action) => {
//       state.listMessages = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(setListChats.pending, (state) => {
//         state.listChats = [];
//       })
//       .addCase(setListChats.fulfilled, (state, action) => {
//         state.listChats = action.payload;
//       })
//       .addCase(setListChats.rejected, (state, action) => {
//         state.listChats = [];
//       })
//       .addCase(getGroupList.pending, (state) => {
//         state.listGroups = [];
//       })
//       .addCase(getGroupList.fulfilled, (state, action) => {
//         state.listGroups = action.payload;
//       });
//   },
// });

// export default chatSlice.reducer;

// export {
//   setListChats,
//   deleteMessage,
//   createNewGroup,
//   getGroupList,
//   createGroupMember,
// };
// export const {
//   setIsMinimized,
//   setError,
//   setMessage,
//   setSelectedUser,
//   setListMessages,
//   setNewChat,
// } = chatSlice.actions;

// export const selectSelectedUser = (state) => state.chat.selectedUser;
// export const selectListChats = (state) => state.chat.listChats;
// export const selectListMessages = (state) => state.chat.listMessages;
// export const selectIsMinimized = (state) => state.chat.isMinimized;
// export const selectError = (state) => state.chat.error;
// export const selectMessage = (state) => state.chat.message;
// export const selectNewChat = (state) => state.chat.newChat;
// export const selectListGroups = (state) => state.chat.listGroups;
