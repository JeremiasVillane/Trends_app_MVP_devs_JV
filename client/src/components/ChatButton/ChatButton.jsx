import { useDispatch } from "react-redux"
import style from "./ChatButton.module.css"
import {BsFillChatLeftTextFill} from "react-icons/bs"
import { setIsMinimized } from "../../Redux/chatSlice";

const ChatButton = () => {
    const dispatch = useDispatch();

    const handleMinimize = () =>{
        dispatch(setIsMinimized(false))
    }

    return (
        <button className={style.button} onClick={handleMinimize}>
            <BsFillChatLeftTextFill className={style.icon}/>
            <p className={style.buttonText}>Chat</p>
        </button>
    )
  }
  
  export default ChatButton;



