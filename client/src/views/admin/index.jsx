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
  TextInput,
  Button,
} from "@tremor/react";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
const { VITE_URL } = import.meta.env;
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
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [createAdmin, setCreateAdmin] = useState(null);

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
  //<=========================================================================================>

  const handleInputs = (event) => {
    const { value, name } = event.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (value) {
      setCreateAdmin(null)
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputs.username && inputs.password) {
      // console.log(inputs)
      try {
        const response = await axios.post(
          `${VITE_URL}/api/v1/admin/create`,
          { type: "admin", ...inputs },
          {
            withCredentials: "include",
          }
        );
        setCreateAdmin(response.data);
        // console.log(response);
      } catch (error) {
        // console.log(error.response.data);
        setCreateAdmin(error.response.data);
      }
    }
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
        <TabGroup>
          <TabList>
            <Tab>Estadisticas</Tab>
            <Tab>Crear nuevo usuario administrador</Tab>
          </TabList>
          <TabPanels>
            {/* Panel para ver las estadisticas */}
            <TabPanel>
              <h2 className="text-gray-400 pt-5 pb-5 text-xl">
                Estadisticas de los usuarios a traves del tiempo
              </h2>
              <Card className="flex gap-10">
                <TabGroup className="w-2/3">
                  <TabList>
                    <Tab>Todos los usuarios</Tab>
                    <Tab onClick={() => getData(STUDENT)}>Estudiantes</Tab>
                    <Tab onClick={() => getData(PROFESSIONAL)}>
                      Profesionales
                    </Tab>
                    <Tab>Compañias</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <Text className="text-2xl mt-10">
                        Graficos sobre todos los usuarios
                      </Text>
                      <LineChart
                        className="w-full h-96"
                        data={totalUsers}
                        index={
                          totalUsers.length > 0
                            ? Object.keys(totalUsers[0])[1]
                            : ""
                        }
                        categories={[
                          totalUsers.length > 0
                            ? Object.keys(totalUsers[0])[0]
                            : "",
                        ]}
                        colors={["amber"]}
                        allowDecimals={false}
                      />
                    </TabPanel>
                    <TabPanel>
                      <Text className="text-2xl mt-10">
                        Grafico sobre cantidad de estudiantes registrados en el
                        tiempo
                      </Text>
                      <LineChart
                        className="w-full h-96"
                        data={users?.students}
                        index={
                          users?.students?.length > 0
                            ? Object.keys(users.students[0])[1]
                            : ""
                        }
                        categories={[
                          users?.students?.length > 0
                            ? Object.keys(users.students[0])[0]
                            : "",
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
                          totalChats.length > 0
                            ? Object.keys(totalChats[0])[1]
                            : ""
                        }
                        categories={[
                          totalChats.length > 0
                            ? Object.keys(totalChats[0])[0]
                            : "",
                        ]}
                        colors={["yellow"]}
                        allowDecimals={false}
                      />
                      <Divider />
                      <Text className="text-2xl mt-10">
                        Grafico de mensajes enviados a profesionales en el
                        tiempo
                      </Text>
                      <LineChart
                        data={totalMsg}
                        index={
                          totalMsg.length > 0 ? Object.keys(totalMsg[0])[1] : ""
                        }
                        categories={[
                          totalMsg.length > 0
                            ? Object.keys(totalMsg[0])[0]
                            : "",
                        ]}
                        colors={["yellow"]}
                        allowDecimals={false}
                      />
                    </TabPanel>
                    <TabPanel>
                      <Text className="text-2xl mt-10">
                        Grafico sobre cantidad de profesionales registrados en
                        el tiempo
                      </Text>
                      <LineChart
                        className="w-full h-96"
                        data={users?.professionals}
                        index={
                          users?.professionals?.length > 0
                            ? Object.keys(users.professionals[0])[1]
                            : ""
                        }
                        categories={[
                          users?.professionals?.length > 0
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
                          totalChats.length > 0
                            ? Object.keys(totalChats[0])[1]
                            : ""
                        }
                        categories={[
                          totalChats.length > 0
                            ? Object.keys(totalChats[0])[0]
                            : "",
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
                        index={
                          totalMsg.length > 0 ? Object.keys(totalMsg[0])[1] : ""
                        }
                        categories={[
                          totalMsg.length > 0
                            ? Object.keys(totalMsg[0])[0]
                            : "",
                        ]}
                        colors={["yellow"]}
                        allowDecimals={false}
                      />
                    </TabPanel>
                    <TabPanel>
                      <Text className="text-2xl mt-10">
                        Grafico sobre cantidad de compañias registradas en el
                        tiempo
                      </Text>
                      <LineChart
                        className="w-full h-96"
                        data={users?.companies}
                        index={
                          users?.companies?.length > 0
                            ? Object.keys(users.companies[0])[1]
                            : ""
                        }
                        categories={[
                          users?.companies?.length > 0
                            ? Object.keys(users.companies[0])[0]
                            : "",
                        ]}
                        colors={["red"]}
                        allowDecimals={false}
                      />
                    </TabPanel>
                  </TabPanels>
                </TabGroup>
                <div className="flex flex-col items-center justify-center w-1/3 gap-20 self-start mt-24 sticky right-0 top-5">
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
              </Card>
            </TabPanel>
            {/* Panel para crear nuevo usuario */}
            <TabPanel>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-gray-400 pt-5 pb-5 text-xl">
                  Formulario para crear un nuevo administrador
                </h2>
                <Card className="w-96">
                  <form className="flex flex-col" onSubmit={handleSubmit}>
                    <label className="text-gray-400" htmlFor="">
                      Username
                    </label>
                    <TextInput
                      name="username"
                      placeholder="Username..."
                      value={inputs.username}
                      onChange={handleInputs}
                      error={createAdmin && createAdmin.hasOwnProperty("error")}
                      errorMessage={
                        createAdmin && createAdmin.hasOwnProperty("error")
                          ? createAdmin.error
                          : ""
                      }
                    />
                    <label className="text-gray-400 mt-4" htmlFor="">
                      Password
                    </label>
                    <TextInput
                      name="password"
                      type="password"
                      placeholder="Password..."
                      value={inputs.password}
                      onChange={handleInputs}
                    />
                    <Button
                      className="mt-4"
                      disabled={!(inputs.username && inputs.password)}
                    >
                      Create
                    </Button>
                    <span className="text-gray-400 mt-5 text-center">
                      {createAdmin &&
                        typeof createAdmin === "string" &&
                        createAdmin}
                    </span>
                  </form>
                </Card>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Card>
    </main>
  );
}
