import { TabPanel, Text, LineChart, Divider } from "@tremor/react";

export const StudentsCharts = ({ studentData, chatsData, msgData }) => {
  return (
    <TabPanel>
      <Text className="text-2xl mt-10">
        Grafico sobre cantidad de estudiantes registrados en el tiempo
      </Text>
      <LineChart
        className="w-full h-96"
        data={studentData}
        index={studentData?.length > 0 ? Object.keys(studentData[0])[1] : ""}
        categories={[
          studentData?.length > 0 ? Object.keys(studentData[0])[0] : "",
        ]}
        colors={["sky"]}
        allowDecimals={false}
      />
      <Divider />
      <Text className="text-2xl mt-10">
        Grafico de chats entre estudiantes y profesionales en el tiempo
      </Text>
      <LineChart
        data={chatsData}
        index={chatsData.length > 0 ? Object.keys(chatsData[0])[1] : ""}
        categories={[chatsData.length > 0 ? Object.keys(chatsData[0])[0] : ""]}
        colors={["yellow"]}
        allowDecimals={false}
      />
      <Divider />
      <Text className="text-2xl mt-10">
        Grafico de mensajes enviados a profesionales en el tiempo
      </Text>
      <LineChart
        data={msgData}
        index={msgData.length > 0 ? Object.keys(msgData[0])[1] : ""}
        categories={[msgData.length > 0 ? Object.keys(msgData[0])[0] : ""]}
        colors={["yellow"]}
        allowDecimals={false}
      />
    </TabPanel>
  );
};
