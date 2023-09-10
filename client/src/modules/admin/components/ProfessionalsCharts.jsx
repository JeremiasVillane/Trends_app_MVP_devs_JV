import { TabPanel, LineChart, Text, Divider } from "@tremor/react";

export const ProfessionalsCharts = ({
  professionalData,
  chatsData,
  msgData,
}) => {
  return (
    <TabPanel>
      <Text className="text-2xl mt-10">
        Grafico sobre cantidad de profesionales registrados en el tiempo
      </Text>
      <LineChart
        className="w-full h-96"
        data={professionalData}
        index={
          professionalData?.length > 0
            ? Object.keys(professionalData[0])[1]
            : ""
        }
        categories={[
          professionalData?.length > 0
            ? Object.keys(professionalData[0])[0]
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
        data={chatsData}
        index={chatsData.length > 0 ? Object.keys(chatsData[0])[1] : ""}
        categories={[chatsData.length > 0 ? Object.keys(chatsData[0])[0] : ""]}
        colors={["yellow"]}
        allowDecimals={false}
      />
      <Divider />
      <Text className="mt-10">
        Grafio de mensajes entre profesionales en el tiempo
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
