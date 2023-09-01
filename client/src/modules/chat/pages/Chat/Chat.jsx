// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { io } from "socket.io-client";
// import {
//   selectIsMinimized,
//   selectSelectedUser,
// } from "../../../../redux/chatSlice";
// import {
//   getMatchedUsers,
//   getUserInfo,
//   selectUserProfile,
// } from "../../../../redux/UsersSlice";
// import styles from "./Chat.module.css";
// const { VITE_URL_BASE } = import.meta.env;

// import { ChatList, ChatMessage, ChatUnselected } from "../../components";

// const Chat = () => {
//   const [socket, setSocket] = useState(null);

//   const isMinimized = useSelector(selectIsMinimized);
//   const selectedUser = useSelector(selectSelectedUser);
//   const user = useSelector(selectUserProfile);
//   const dispatch = useDispatch();

//   //Conexión de Socket al servidor
//   useEffect(() => {
//     const newSocket = io(VITE_URL_BASE);
//     newSocket.on("connect", () => {
//       setSocket(newSocket);
//     });
//     return () => {
//       socket && newSocket.disconnect();
//     };
//   }, []);

//   // Envia username para agregar usuario conectados al servidor
//   useEffect(() => {
//     socket?.emit("newUser", user.username);
//   }, [socket, user]);

//   useEffect(() => {
//     dispatch(getUserInfo());
//     dispatch(getMatchedUsers());
//   }, []);

//   return (
//     <div className={isMinimized ? styles.hidden : styles.mainContainer}>
//       <ChatList />
//       {!selectedUser.id ? (
//         <ChatUnselected />
//       ) : (
//         <div className={styles.mainContainer}>
//           <ChatList />
//           {!selectedUser ? <ChatUnselected /> : <ChatMessage socket={socket} />}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chat;
