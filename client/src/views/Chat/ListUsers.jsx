/*
import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllUsersChat, setAllUsersChat } from '../../Redux/usersChatSlice';
import { setError } from '../../Redux/chatSlice';
const viteUrl = import.meta.env.VITE_URL;

const ListUsers = ({ onUserSelect }) => {

  // Estados Globales
  // -------------------
  const allUsers = useSelector(selectAllUsersChat);
  const user = useSelector(state => state.users.user);
  const dispatch = useDispatch();

  console.log(allUsers)


  return (
    <div className='flex flex-col w-[100%] h-[auto] mt-[50px] '>
      {
        allUsers?.map((user) => (
          <div
            key={user.user_id}
            onClick={() => onUserSelect(user) }
            className='flex h-[50px] items-center gap-[5px] cursor-pointer'
          >
            <div className='flex w-7 h-7 ml-[5px] rounded-full bg-gray-500'>
              <img className='w-full h-full object-cover rounded-full' src={`${user.profile_image}`} alt='imagen de perfil' />
            </div>
            <h2
              className=" text-black"
              key={user.user_id}>{user.username}
            </h2>
          </div>
        ))
      }
    </div>
  )
}
*/


import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllUsersChat, setAllUsersChat } from '../../Redux/usersChatSlice';
import { setError } from '../../Redux/chatSlice';
const viteUrl = import.meta.env.VITE_URL;

const ListUsers = ({ onUserSelect }) => {

  // Estados Globales
  // -------------------
  const allUsers = useSelector(selectAllUsersChat);
  const user = useSelector(state => state.users.user);
  const dispatch = useDispatch();

  console.log(allUsers)


  return (
    <div className='flex flex-col w-[100%] h-[auto] mt-[50px] '>
      {
        allUsers?.map((user) => (
          <div
            key={user.user_id}
            onClick={() => onUserSelect(user) }
            className='flex h-[50px] items-center gap-[5px] cursor-pointer'
          >
            <div className='flex w-7 h-7 ml-[5px] rounded-full bg-gray-500'>
              <img className='w-full h-full object-cover rounded-full' src={`${user.profile_image}`} alt='imagen de perfil' />
            </div>
            <h2
              className=" text-black"
              key={user.user_id}>{user.username}
            </h2>
          </div>
        ))
      }
    </div>
  )
}



export default ListUsers