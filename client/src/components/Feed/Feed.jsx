import FeedCard from "../FeedCard/FeedCard";
import style from "./Feed.module.css";
import filterIcon from "../../assets/TestIcons/filter.png";
import { useEffect } from "react";
import {students, professionals} from "../../utils/users";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMatchedUsers, selectAllUsers, selectTotalPages } from "../../Redux/UsersSlice";
import NavBarBase from "../NavBarBase/NavBarBase";

//import { matcher } from "../../utils/matchingAlgorithm/matcher";


const Feed = () => {
    const users = useSelector(selectAllUsers);
    const dispatch = useDispatch();
    const totalPages = useSelector(selectTotalPages) 
    const [currentPage, setCurrentPage] = useState(1);
    const handleOnpage = () => {
        if(currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
            dispatch(getMatchedUsers(currentPage))     
        }
    }

    useEffect(() => {
        dispatch(getMatchedUsers());
        console.log(users)
    }, []);    
    
    return (
        <section className={style.BGContainer}>
            {/* Resto del contenido */}
            <div>
                <header>
                    <h1>Trends</h1>
                </header>

                <div className={style.FeedContainer}>
                    <div className={style.Feed}>
                        {users && users.length > 0 ? (
                            users.map((user, userIndex) => (
                                <div key={userIndex}>
                                    <FeedCard user={user} />
                                    {userIndex < users.length - 1 && <hr />}
                                    {userIndex >= users.length - 1 && (
                                        <div>
                                            <button onClick={handleOnpage}>
                                                More?
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>Cargando usuarios...</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}


export default Feed;
