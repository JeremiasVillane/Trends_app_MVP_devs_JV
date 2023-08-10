import FeedCard from "../FeedCard/FeedCard";
import style from "./Feed.module.css";
import filterIcon from "../../assets/TestIcons/filter.png";
import { useEffect } from "react";
import {students, professionals} from "../../utils/users";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfessionals, getStudents, getUserInfo, matchUsers, selectAllUsers, selectProfessionals, selectStatus, selectStudents, selectTotalPages, selectUserProfile, setStatus } from "../../Redux/UsersSlice";
import NavBarBase from "../NavBarBase/NavBarBase";
//import { matcher } from "../../utils/matchingAlgorithm/matcher";

const Feed = () => {
  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const totalPages = useSelector(selectTotalPages); 
  const profile = useSelector(selectUserProfile);
  const students = useSelector(selectStudents);
  const professionals = useSelector(selectProfessionals);
  const [page, setPage] = useState(1);

  const fetchMoreUsers = () => {
    if (profile.id) {
      dispatch(getStudents({id: profile.id, page}));
      dispatch(getProfessionals({id: profile.id, page}));
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
      setPage(page + 1);
    }
  };

  //validate if profile exists
  useEffect(() => {
    if (!profile || Object.keys(profile).length === 0) {
      dispatch(getUserInfo());
    }
  }, []);

  // fetch users if profile exists 
  useEffect(() => {
    if (profile.id) {
      fetchMoreUsers();
    }
  }, [profile.id, page]);

  useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (students && professionals) {
      dispatch(matchUsers());
    }
  }, [students, professionals]);

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
