import {
  Card,
  DonutChart,
  Legend,
  LineChart,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  Divider,
} from "@tremor/react";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
// const ALL_USERS = "all";
const STUDENT = "student";
const PROFESSIONAL = "professional";
// const COMPANY = "company";

export default function AdminPage() {
  const [users, setUsers] = useState({});
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

  const getUsers = async () => {
    const res = await axios.get("http://localhost:3001/api/v1/admin/users", {
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
    const allChats = await axios.get(
      `http://localhost:3001/api/v1/admin/users/chats/${userType}`,
      { withCredentials: "include" }
    );
    const allMsg = await axios.get(
      `http://localhost:3001/api/v1/admin/users/messages/${userType}`,
      { withCredentials: "include" }
    );
    setTotalChats(allChats.data);
    setTotalMsg(allMsg.data);
  };

  return (
    <main
      className="p-8 bg-slate-900 w-screen h-screen overflow-x-hidden flex flex-col items-center
     gap-8"
    >
      <Card>
        <header>
          <h1 className="uppercase">Panel de Administrador</h1>
        </header>
        <div className="flex gap-10">
          <TabGroup className="w-2/3">
            <TabList>
              <Tab>Todos los usuarios</Tab>
              <Tab onClick={() => getData(STUDENT)}>Estudiantes</Tab>
              <Tab onClick={() => getData(PROFESSIONAL)}>Profesionales</Tab>
              <Tab>Compañias</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Text className="text-2xl mt-6">
                  Graficos sobre todos los usuarios
                </Text>
                <Card>
                  <LineChart
                    className="w-full h-96"
                    data={totalUsers}
                    index={
                      totalUsers.length > 0 ? Object.keys(totalUsers[0])[1] : ""
                    }
                    categories={[
                      totalUsers.length > 0
                        ? Object.keys(totalUsers[0])[0]
                        : "",
                    ]}
                    colors={["amber"]}
                    allowDecimals={false}
                  />
                </Card>
              </TabPanel>
              <TabPanel>
                <Text className="text-2xl mt-10">
                  Grafico sobre cantidad de estudiantes registrados en el tiempo
                </Text>
                <LineChart
                  className="w-full h-96"
                  data={users?.students}
                  index={
                    users?.students ? Object.keys(users.students[0])[1] : ""
                  }
                  categories={[
                    users?.students ? Object.keys(users.students[0])[0] : "",
                  ]}
                  colors={["sky"]}
                  allowDecimals={false}
                />
                <Divider />
                <Text className="text-2xl mt-10">
                  Grafico de chats entre estudiantes y profesionales en el
                  tiempo
                </Text>
                <LineChart
                  data={totalChats}
                  index={
                    totalChats.length > 0 ? Object.keys(totalChats[0])[1] : ""
                  }
                  categories={[
                    totalChats.length > 0 ? Object.keys(totalChats[0])[0] : "",
                  ]}
                  colors={["yellow"]}
                  allowDecimals={false}
                />
                <Divider />
                <Text className="text-2xl mt-10">
                  Grafico de mensajes enviados a profesionales en el tiempo
                </Text>
                <LineChart
                  data={totalMsg}
                  index={totalMsg.length > 0 ? Object.keys(totalMsg[0])[1] : ""}
                  categories={[
                    totalMsg.length > 0 ? Object.keys(totalMsg[0])[0] : "",
                  ]}
                  colors={["yellow"]}
                  allowDecimals={false}
                />
              </TabPanel>
              <TabPanel>
                <Text className="text-2xl mt-10">
                  Grafico sobre cantidad de profesionales registrados en el
                  tiempo
                </Text>
                <LineChart
                  className="w-full h-96"
                  data={users?.professionals}
                  index={
                    users?.professionals
                      ? Object.keys(users.professionals[0])[1]
                      : ""
                  }
                  categories={[
                    users?.professionals
                      ? Object.keys(users.professionals[0])[0]
                      : "",
                  ]}
                  colors={["lime"]}
                  allowDecimals={false}
                />
                <Divider />
                <Text className="mt-10">
                  Grafico de chats entre profesionales en el tiempo
                </Text>
                <LineChart
                  data={totalChats}
                  index={
                    totalChats.length > 0 ? Object.keys(totalChats[0])[1] : ""
                  }
                  categories={[
                    totalChats.length > 0 ? Object.keys(totalChats[0])[0] : "",
                  ]}
                  colors={["yellow"]}
                  allowDecimals={false}
                />
                <Divider />
                <Text className="mt-10">
                  Grafio de mensajes entre profesionales en el tiempo
                </Text>
                <LineChart
                  data={totalMsg}
                  index={totalMsg.length > 0 ? Object.keys(totalMsg[0])[1] : ""}
                  categories={[
                    totalMsg.length > 0 ? Object.keys(totalMsg[0])[0] : "",
                  ]}
                  colors={["yellow"]}
                  allowDecimals={false}
                />
              </TabPanel>
              <TabPanel>
                <Text className="text-2xl mt-6">
                  Grafico sobre cantidad de compañias registradas en el tiempo
                </Text>
                <LineChart
                  className="w-full h-96"
                  data={users?.companies}
                  index={
                    users?.companies ? Object.keys(users.companies[0])[1] : ""
                  }
                  categories={[
                    users?.companies ? Object.keys(users.companies[0])[0] : "",
                  ]}
                  colors={["red"]}
                  allowDecimals={false}
                />
              </TabPanel>
            </TabPanels>
          </TabGroup>
          <div className="flex flex-col items-center justify-center w-1/3 gap-20 self-start mt-24 fixed right-0 top-10">
            <div className="flex flex-col items-center">
              <DonutChart
                variant="pie"
                data={donutData}
                category="total"
                index="name"
                colors={["sky", "lime", "red"]}
              />
              <Legend
                categories={["Estudiantes", "Profesionales", "Compañias"]}
                colors={["sky", "lime", "red"]}
                className="mt-4"
              />
            </div>
            <Text className="text-2xl flex flex-col items-center">
              Total de usuarios registrados en la plataforma
              <strong className="text-4xl text-green-400">
                {donutData.reduce(
                  (tot, curr) => Number(tot) + Number(curr.total),
                  [0]
                )}
              </strong>
            </Text>
          </div>
        </div>
      </Card>
    </main>
  );
}
