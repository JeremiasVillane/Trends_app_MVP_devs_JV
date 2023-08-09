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
    const [showMore, setShowMore] = useState(false);

    const handleOnpage = () => {
        if(currentPage <= totalPages) {
            setCurrentPage(currentPage + 1)
        }
    };
    const handleScroll = () => {
        console.log("Height:", document.documentElement.scrollHeight);
        console.log("Top:", document.documentElement.scrollTop);
        console.log("Window:", window.innerHeight);

        if(window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight ) {
                setCurrentPage(currentPage + 1);
        };
    };

    useEffect(() => {
        dispatch(getMatchedUsers(currentPage))
    }, [currentPage])


    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [currentPage])

    
    return (
        <section className={style.BGContainer}>
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
