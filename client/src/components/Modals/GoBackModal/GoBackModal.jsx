import React, { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../../Redux/UsersSlice";

const MySwal = withReactContent(Swal);

export const GoBackModal = () => {
  const navigate = useNavigate();
  const darkMode = useSelector(selectDarkMode);

  useEffect(() => {
    return () =>
      MySwal.fire({
        icon: "error",
        title: <strong>No tienes acceso a esta página</strong>,
        confirmButtonText: "Regresar",
        confirmButtonColor: "#3085d6",
        background: darkMode ? "#383636" : "#FFF",
        color: darkMode ? "#FFF" : "#545454",
        didOpen: () => {
          MySwal.disableLoading();
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(-1);
        }
      });
  }, []);

  return null;
};
