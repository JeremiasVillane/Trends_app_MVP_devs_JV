import { LineChart, TabPanel, Text } from "@tremor/react";

export const AllUsersCharts = ({ data }) => {
  return (
    <TabPanel>
      <Text className="text-2xl mt-10">Graficos sobre todos los usuarios</Text>
      <LineChart
        className="w-full h-96"
        data={data}
        index={data.length > 0 ? Object.keys(data[0])[1] : ""}
        categories={[data.length > 0 ? Object.keys(data[0])[0] : ""]}
        colors={["amber"]}
        allowDecimals={false}
      />
    </TabPanel>
  );
};
