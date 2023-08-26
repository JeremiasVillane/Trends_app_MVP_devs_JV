import { LineChart, TabPanel, Text } from "@tremor/react";

export const CompaniesCharts = ({ companyData }) => {
  return (
    <TabPanel>
      <Text className="text-2xl mt-10">
        Grafico sobre cantidad de compañias registradas en el tiempo
      </Text>
      <LineChart
        className="w-full h-96"
        data={companyData}
        index={companyData?.length > 0 ? Object.keys(companyData[0])[1] : ""}
        categories={[
          companyData?.length > 0 ? Object.keys(companyData[0])[0] : "",
        ]}
        colors={["red"]}
        allowDecimals={false}
      />
    </TabPanel>
  );
};
