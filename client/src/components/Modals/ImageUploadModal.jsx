import Swal from "sweetalert2";
import axios from "axios";
const { VITE_URL } = import.meta.env;
const URLImage = `${VITE_URL}/images/profile`;

export const ImageUploadModal = (darkMode, updater) => {
  Swal.fire({
    title: "Subir Imagen",
    html: `
      <div>
        <p>Arrastra y suelta una imagen aquí</p>
        <p>O busca en tu dispositivo</p>
        <br /><br />
        <input type="file" accept="image/*">
      </div>
    `,
    showCancelButton: true,
    showConfirmButton: false,
    allowOutsideClick: true,
    showCloseButton: true,
    willOpen: (modal) => {
      const input = modal.querySelector("input");

      input.addEventListener("change", async (event) => {
        const file = event.target.files[0];
        if (file) {
          const formData = new FormData();
          formData.append("image", file);
          const reader = new FileReader();

          reader.onload = async (e) => {
            const response = await Swal.fire({
              title: "Vista Previa de la Imagen",
              imageUrl: e.target.result,
              showCancelButton: true,
              confirmButtonText: "Aceptar",
              showLoaderOnConfirm: true,
              allowOutsideClick: false,
              preConfirm: async () => {
                try {
                  await axios.post(URLImage, formData, {
                    withCredentials: "include",
                  });
                  return true;
                } catch (error) {
                  Swal.showValidationMessage(`Error: ${error.message}`);
                  return false;
                }
              },
            });

            if (response.isConfirmed) {
              updater();
              Swal.fire({
                icon: "success",
                position: "top-end",
                toast: true,
                title: "Operación Exitosa",
                text: "La imagen se ha subido correctamente.",
                showConfirmButton: false,
                timer: 2500,
                timerProgressBar: true,
                background: darkMode ? "#383636" : "#FFF",
                color: darkMode ? "#FFF" : "#545454",
              });
            }
          };
          reader.readAsDataURL(file);
        }
      });
    },
  });
};
