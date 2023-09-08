import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { selectDarkMode } from "../../redux/uiSlice";

const ForbiddenModal = () => {
  const MySwal = withReactContent(Swal);
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
        if (result.isConfirmed || result.isDismissed) {
          navigate(-1);
        }
      });
  }, []);

  return null;
};

export default ForbiddenModal;
