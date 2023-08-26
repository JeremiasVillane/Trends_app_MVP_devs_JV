import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
const { VITE_URL } = import.meta.env;
const STUDENT = "student";
const PROFESSIONAL = "professional";
// const ALL_USERS = "all";
// const COMPANY = "company";

export const useStats = () => {
  const [users, setUsers] = useState({
    students: [],
    professionals: [],
    companies: [],
  });
  const [totalUsers, setTotalUsers] = useState([]);
  const [donutData, setDonutData] = useState([]);
  const [totalChats, setTotalChats] = useState([]);
  const [totalMsg, setTotalMsg] = useState([]);

  const formatDate = (date_utc0) => {
    const DATE_BY_MIN = "yyyy-MM-dd HH:mm";
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return format(new Date(date_utc0), DATE_BY_MIN, {
      timeZone,
    });
  };

  const cleanedData = (users) => {
    if (typeof users === "object" && !Array.isArray(users))
      return {
        students: users.students.map((el) => ({
          ["Estudiantes Registrados"]: el.total,
          creation_date: formatDate(el.creation_date_utc),
        })),
        professionals: users.professionals.map((el) => ({
          ["Profesionales Registrados"]: el.total,
          creation_date: formatDate(el.creation_date_utc),
        })),
        companies: users.companies.map((el) => ({
          ["Compañias Registradas"]: el.total,
          creation_date: formatDate(el.creation_date_utc),
        })),
      };

    if (Array.isArray(users))
      return users.map((el) => ({
        ["Usuarios Registrados"]: el.total,
        creation_date: formatDate(el.creation_date_utc),
      }));
  };

  const mergedUsers = (users) => {
    const results = [];
    const totalUsers = [
      ...users.students,
      ...users.professionals,
      ...users.companies,
    ];
    for (const user of totalUsers) {
      const existResult = results.find(
        (el) => el.creation_date_utc === user.creation_date_utc
      );

      if (existResult) existResult.total += parseInt(user.total);
      else {
        results.push({
          total: parseInt(user.total),
          creation_date_utc: user.creation_date_utc,
        });
      }
    }

    results.sort(
      (a, b) => new Date(a.creation_date_utc) - new Date(b.creation_date_utc)
    );

    return cleanedData(results);
  };

  //Recupera todas las estadisticas de la API
  //<=========================================================================================>
  const getUsers = async () => {
    const res = await axios.get(`${VITE_URL}/admin/users`, {
      withCredentials: "include",
    });
    // console.log(res.ok);
    // if (!res.ok) throw res;
    return res.data;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers();
        // console.log(data);
        setUsers(cleanedData(data));
        setTotalUsers(mergedUsers(data));
        setDonutData([
          {
            name: "estudiantes",
            total: data?.students.reduce(
              (tot, curr) => tot + parseInt(curr.total),
              0
            ),
          },
          {
            name: "profesionales",
            total: data?.professionals.reduce(
              (tot, curr) => tot + parseInt(curr.total),
              0
            ),
          },
          {
            name: "compañias",
            total: data?.companies.reduce(
              (tot, curr) => tot + parseInt(curr.total),
              0
            ),
          },
        ]);
      } catch (error) {
        return error;
      }
    };
    fetchData();
    return () => {};
  }, []);

  const getData = async (userType) => {
    if (userType === PROFESSIONAL || userType === STUDENT) {
      try {
        const allChats = await axios.get(
          `${VITE_URL}/admin/users/chats/${userType}`,
          { withCredentials: "include" }
        );
        const allMsg = await axios.get(
          `${VITE_URL}/admin/users/messages/${userType}`,
          { withCredentials: "include" }
        );
        setTotalChats(allChats.data);
        setTotalMsg(allMsg.data);
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert(
        "El tipo de usuario puede ser unicamente 'student' o 'profesional'"
      );
    }
  };
  //<=========================================================================================>

  return {
    getData,
    totalUsers,
    totalChats,
    totalMsg,
    users,
    donutData,
  };
};
