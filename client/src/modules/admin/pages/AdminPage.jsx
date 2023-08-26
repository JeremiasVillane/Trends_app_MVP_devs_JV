import { Card, Tab, TabGroup, TabList, TabPanels } from "@tremor/react";
import { AdminStats, CreateForm } from "../components";

const AdminPage = () => {
  return (
    <main
      className="p-8 bg-slate-900 w-screen h-screen overflow-x-hidden flex flex-col items-center
     gap-8"
    >
      <Card>
        <header>
          <h1 className="uppercase text-5xl text-gray-400 mb-8 mt-4 text-center">
            Panel de Administrador
          </h1>
        </header>
        <TabGroup>
          <TabList>
            <Tab>Estadísticas</Tab>
            <Tab>Crear nuevo usuario administrador</Tab>
          </TabList>
          <TabPanels>
            {/* Panel para ver las estadísticas */}
            <AdminStats />
            {/* Panel para crear nuevo usuario */}
            <CreateForm />
          </TabPanels>
        </TabGroup>
      </Card>
    </main>
  );
};

export default AdminPage;
