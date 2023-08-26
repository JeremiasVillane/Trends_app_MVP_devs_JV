import { Button, Card, TabPanel, TextInput } from "@tremor/react";
import { useCreateAdmin } from "../hooks/useCreateAdmin";

export const CreateForm = () => {
  const { createAdmin, handleInputs, handleSubmit, inputs } = useCreateAdmin();

  return (
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
              {createAdmin && typeof createAdmin === "string" && createAdmin}
            </span>
          </form>
        </Card>
      </div>
    </TabPanel>
  );
};
