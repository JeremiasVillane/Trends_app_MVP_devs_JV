import { createAsyncThunk ,createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const {VITE_URL} = import.meta.env;

const initialState = {
  isMinimized: false,
  error:"",
  message:"",
  selectedUser:{},
  listGroups: [],
  listChats:[],
  listMessages:[],
  newChat:false,
}

export const postMessage = createAsyncThunk("chat/postMessage", async ({content, receiver_id, sender_id}) =>{
  try {
    const { data } = await axios.post(`${VITE_URL}/api/v1/chatroom/message`,
      {content, receiver_id, sender_id}, {withCredentials:"include"})
    return data;
  } catch (error) {
    return error.response.data.error;
  }
});

export const getMessages = createAsyncThunk("chat/getMessages", async (chatId) => {
  try {
    const { data } = await axios.get(`${VITE_URL}/api/v1/chatroom/chat/${chatId}/messages`,
      {withCredentials:"include"})
    return data
  } catch (error) {
    return error.response.data.error;
  }
});

export const getMessagesByChat = createAsyncThunk("chat/getMessagesByChat", async(id) => {
  try {
    const promise = (await axios.get(`${VITE_URL}/chatroom/conversations/${user_id}?query_name=${query_name}`, { withCredentials:"include"})).data
    return promise;
  } catch (error) {
    return error.response.data.error;
  }
});

const deleteMessage = createAsyncThunk("chat/deleteMessage", async({message_id, isGroup, conversation_id}) =>{
  try {
    const response = isGroup ?
      await (axios.put(`${VITE_URL}/chatroom/groups/${conversation_id}/message/${message_id}`, {messageStatus:"deleted"}, { withCredentials:"include"})).data :
      await (axios.put(`${VITE_URL}/chatroom/chat/${conversation_id}/message/${message_id}`, {messageStatus:"deleted"}, { withCredentials:"include"})).data
      return response;
  } catch (error) {
    console.log(error)
  }
})

const setListChats = createAsyncThunk("chat/setListChats", async ({ user_id, query_name }) => {
  try {
    const promise = (await axios.get(`${VITE_URL}/api/v1/chatroom/conversations/${user_id}?query_name=${query_name}`, { withCredentials:"include"})).data
    return promise;
  } catch (error) {
    return error.response.data.error;
  }
});

const createNewGroup = createAsyncThunk("chat/createNewGroup", async({name}) => {
  try {
    const response = (await axios.post(`${VITE_URL}/api/v1/chatroom/groups` , {name}, { withCredentials:"include"})).data
    return response;
  } catch (error) {
    console.log(error)
  }
})

const getGroupList = createAsyncThunk("chat/getGroupList", async() => {
  try {
    const response = (await axios.get(`${VITE_URL}/api/v1/chatroom/groups?list=true`, { withCredentials:"include"})).data
    return response;
  } catch (error) {
    throw new Error(error);
  }
})

const createGroupMember = createAsyncThunk("chat/createGroupMember", async({user_id, group_id}) => {
  try {
    const response = (await axios.post(`${VITE_URL}/api/v1/chatroom/groups/${group_id}/users`, {userId: user_id, role: "member"}, {withCredentials: "include"})).data
    return response;
  } catch (error) {
    throw new Error(error);
  }
})

// const setListMessages = createAsyncThunk("chat/setListMessages", async(id) =>{
//   try {
//     const {data} = await axios.get(`${VITE_URL}/chatroom/chat/${id}/messages`, { withCredentials:"include"})
//     data.messages.reverse();
//     console.log("DATA: ", data)
//     return data;
//   } catch (error) {
//     return error;
//   }
// })

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setIsMinimized: (state, action) => {
      state.isMinimized = action.payload;;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setNewChat: (state, action) => {
      state.newChat = action.payload;
    },
    setSelectedUser: (state, action) => {
      const {id, isGroup, allUsers} = action.payload;
      if(typeof id === "number"){
        state.selectedUser = state.listChats.find(chat => (chat.id === id && chat.isGroup === isGroup));
      } else {
        state.selectedUser = allUsers?.data.find(user => (user.id === id));
      }
    },
    setListMessages: (state, action) => {
      state.listMessages = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(setListChats.pending, (state) => {
      state.listChats = [];
    })
    .addCase(setListChats.fulfilled, (state, action) => {
      state.listChats = action.payload;
    })
    .addCase(setListChats.rejected, (state, action) => {
      state.listChats = [];
    })
    .addCase(getGroupList.pending, (state) => {
      state.listGroups = [];
    })
    .addCase(getGroupList.fulfilled, (state, action) => {
      state.listGroups = action.payload;
    })
  }
})

export {setListChats, deleteMessage, createNewGroup, getGroupList, createGroupMember};
export const { setIsMinimized, setError, setMessage, setSelectedUser, setListMessages, setNewChat } = chatSlice.actions;
export default chatSlice.reducer;
export const selectSelectedUser = (state) => state.chat.selectedUser;
export const selectListChats = (state) => state.chat.listChats;
export const selectListMessages = (state) => state.chat.listMessages;
export const selectIsMinimized = (state) => state.chat.isMinimized;
export const selectError = (state) => state.chat.error;
export const selectMessage = (state) => state.chat.message;
export const selectNewChat = (state) => state.chat.newChat;
export const selectListGroups = (state) => state.chat.listGroups;
