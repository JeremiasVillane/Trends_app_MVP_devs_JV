import axios from "axios";
const { VITE_URL } = import.meta.env;
import { useState } from "react";

export const useCreateAdmin = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [createAdmin, setCreateAdmin] = useState(null);

  const handleInputs = (event) => {
    const { value, name } = event.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (value) {
      setCreateAdmin(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputs.username && inputs.password) {
      // console.log(inputs)
      try {
        const response = await axios.post(
          `${VITE_URL}/admin/create`,
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

  return {
    createAdmin,
    handleInputs,
    handleSubmit,
    inputs,
  };
};
