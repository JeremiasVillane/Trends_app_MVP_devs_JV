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
    console.error("Error cargando conversaciones:", error);
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
      console.error("Error filtrando conversaciones:", error);
    }
  };

// Thunk para enviar el mensaje y obtener la respuesta del backend
export const sendAndStoreMessage =
  (userId, conversationId, message) => async (dispatch) => {
    let conversationType;

    conversationId.includes("group")
      ? (conversationType = "groups")
      : (conversationType = "chat");
    try {
      await axios.post(
        `${VITE_URL}/chatroom/${conversationType}/${conversationId}/messages`,
        { content: message },
        { withCredentials: "include" }
      );

      dispatch(loadConversations(userId));
    } catch (error) {
      console.error("Error al guardar el mensaje:", error.message);
    }
  };

// Thunk para editar el mensaje
export const editMessage =
  (userId, conversationId, messageId, content) => async (dispatch) => {
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
      console.error("Error al editar el mensaje:", error);
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

// Thunk para editar la información de un grupo de chat
export const editChatGroup =
  (userId, groupId, groupName, groupImage) => async (dispatch) => {
    try {
      await axios.put(
        `${VITE_URL}/chatroom/groups/${groupId}`,
        { name: groupName, image: groupImage },
        { withCredentials: "include" }
      );

      dispatch(loadConversations(userId));
    } catch (error) {
      console.error("Error al editar el grupo:", error);
    }
  };

// Thunk para eliminar un grupo de chat
export const deleteChatGroup = (userId, groupId) => async (dispatch) => {
  try {
    await axios.delete(`${VITE_URL}/chatroom/groups/${groupId}`, {
      withCredentials: "include",
    });

    dispatch(loadConversations(userId));
    dispatch(setActiveConversation(null));
  } catch (error) {
    console.error("Error al eliminar el grupo:", error);
  }
};

// Thunk para agregar integrantes a un grupo de chat
export const addGroupMember = (data) => async (dispatch) => {
  try {
    const { ownerId, groupId, users } = data;

    for (const user of users) {
      await axios.post(
        `${VITE_URL}/chatroom/groups/${groupId}/users`,
        { userId: user, role: "Integrante" },
        { withCredentials: "include" }
      );
    }

    dispatch(loadConversations(ownerId));
  } catch (error) {
    console.error("Error agregando integrante/s al grupo:", error);
  }
};

// Thunk para quitar usuario de un grupo de chat
export const removeGroupMember =
  (groupId, userId, ownerId) => async (dispatch) => {
    try {
      await axios.delete(
        `${VITE_URL}/chatroom/groups/${groupId}/users/${userId}`,
        { withCredentials: "include" }
      );

      dispatch(loadConversations(ownerId));
    } catch (error) {
      console.error("Error quitando usuario del grupo:", error);
    }
  };

// Thunk para editar el rol de un usuario en un grupo de chat
export const editGroupMemberRole =
  (groupId, userId, ownerId, data) => async (dispatch) => {
    try {
      await axios.patch(
        `${VITE_URL}/chatroom/groups/${groupId}/users/${userId}`,
        data,
        { withCredentials: "include" }
      );

      dispatch(loadConversations(ownerId));
    } catch (error) {
      console.error("Error editando rol de usuario en el grupo:", error);
    }
  };

// Thunk para obtener los grupos en los que el usuario es creador o moderador
export const getUserChatGroups = () => async () => {
  try {
    const { data } = await axios.get(`${VITE_URL}/chatroom/groups?list=true`, {
      withCredentials: "include",
    });
    return data;
  } catch (error) {
    console.error("Error obteniendo grupos:", error);
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

// Thunk para crear un nuevo chat privado
export const createNewPrivateChat = (userId, contactId) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${VITE_URL}/chatroom/chat`,
      { contactId },
      { withCredentials: "include" }
    );

    dispatch(loadConversations(userId));
    dispatch(setActiveConversation(`chat${data.chat_id}`));
  } catch (error) {
    console.error("Error al iniciar chat privado:", error);
  }
};

// Thunk para eliminar un chat privado
export const deletePrivateChat = (userId, chatId) => async (dispatch) => {
  try {
    await axios.delete(`${VITE_URL}/chatroom/chat/${chatId}`, {
      withCredentials: "include",
    });

    dispatch(loadConversations(userId));
    dispatch(setActiveConversation(null));
  } catch (error) {
    console.error("Error al eliminar chat privado:", error);
  }
};

export const selectActiveConversation = (state) => state.chat.activeConversation;
export const selectConversations = (state) => state.chat.conversations;

export default chatSlice.reducer;
