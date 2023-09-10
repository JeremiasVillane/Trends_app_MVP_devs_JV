import { DonutChart, Legend, Text } from "@tremor/react";

export const Donut = ({ donutData }) => {
  return (
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
  );
};
