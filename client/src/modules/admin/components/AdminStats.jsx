import {
  Card,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@tremor/react";
import { useStats } from "../hooks/useStats";
import {
  AllUsersCharts,
  CompaniesCharts,
  Donut,
  ProfessionalsCharts,
  StudentsCharts,
} from "./index";

const STUDENT = "student";
const PROFESSIONAL = "professional";
// const ALL_USERS = "all";
// const COMPANY = "company";

export const AdminStats = () => {
  const { donutData, getData, totalChats, totalMsg, totalUsers, users } =
    useStats();

  return (
    <TabPanel>
      <h2 className="text-gray-400 pt-5 pb-5 text-xl">
        Estadisticas de los usuarios a traves del tiempo
      </h2>
      <Card className="flex gap-10">
        <TabGroup className="w-2/3">
          <TabList>
            <Tab>Todos los usuarios</Tab>
            <Tab onClick={() => getData(STUDENT)}>Estudiantes</Tab>
            <Tab onClick={() => getData(PROFESSIONAL)}>Profesionales</Tab>
            <Tab>Compañias</Tab>
          </TabList>
          <TabPanels>
            <AllUsersCharts data={totalUsers} />
            <StudentsCharts
              studentData={users.students}
              chatsData={totalChats}
              msgData={totalMsg}
            />
            <ProfessionalsCharts
              professionalData={users.professionals}
              chatsData={totalChats}
              msgData={totalMsg}
            />
            <CompaniesCharts companyData={users.companies} />
          </TabPanels>
        </TabGroup>
        <Donut donutData={donutData} />
      </Card>
    </TabPanel>
  );
};
