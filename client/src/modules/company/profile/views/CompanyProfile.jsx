import axios from "axios";
import { useEffect, useState } from "react";
import { FaFloppyDisk, FaPenToSquare } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCompany } from "../../../../redux/usersSlice";
import styles from "./CompanyProfile.module.css";
const { VITE_URL } = import.meta.env;

const CompanyProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const companyDataSG = useSelector((state) => state.users.companies);
  const [companyData, setCompanyData] = useState(companyDataSG);
  const [isProfileOwner, setIsProfileOwner] = useState(true);
  const [isEditing, setIsEditing] = useState({
    profile: false,
    image: false,
  });

  //! HANDLERS DE LOS BOTONES
  const handleImageChangeButton = () => {
    setIsEditing((prevState) => ({ ...prevState, image: false }));
  };

  const handleProfileEditButton = () => {
    setIsEditing({
      ...isEditing,
      profile: true,
    });
  };

  const formatData = () => {
    const data = {
      type: "company",
      name: companyData.name ? companyData.name : "",
      cuit: companyData.cuit ? companyData.cuit : "",
      website: companyData.website ? companyData.website : "",
      bio: companyData.bio ? companyData.bio : "",
      image: companyData.image ? companyData.image : "",
      username: companyData.username ? companyData.username : "",
      email: companyData.email ? companyData.email : "",
      city: companyData.city ? companyData.city : "",
      country: companyData.country ? companyData.country : "",
    };

    return data;
  };

  //?FUNCION PARA OBTENER UNA CADENA DE CONSULTA UNICA
  //?Y SE ACTUALICEN LOS DATOS (SIMULA CTRL+F5)
  function getUniqueQueryString() {
    return `?_=${Date.now()}`;
  }

  const fetchCompany = async () => {
    const URL = `${VITE_URL}/user/profile`;
    //const ID = userLogin.id;

    try {
      //const {data} = await axios.get(`${URL}/${ID}`);
      const { data } = await axios.get(URL + getUniqueQueryString(), {
        withCredentials: "include",
      });
      dispatch(addCompany(data));
      //setJobs(data.jobs);
    } catch (error) {
      console.log("error al cargar datos a SG <FeedCompany>: ", error.message);
    }
  };

  //?AL PRESIONAR GUARDAR ENVIO DATOS A BACK PARA ACTUALIZAR
  const handleSaveButton = async (buttonName) => {
    //const URL = `${VITE_URL}/search/user`;
    const ID = companyData.id;
    const URL = `${VITE_URL}/user/${ID}`;
    //formateo los datos a enviar
    const data = formatData();
    //envio datos
    try {
      await axios.put(URL, data, { withCredentials: "include" });

      await fetchCompany();
      navigate("/company/feed");

      // console.log("que tiene el SG company:", companyDataSG);
      // console.log("que tiene companyData:", companyData);
    } catch (error) {
      console.log("error en put: ", error.message);
    }

    //cambio a false edicion de perfil
    setIsEditing({
      ...isEditing,
      [buttonName]: false,
    });
  };

  //! CHANGE HANDLER

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCompanyData({
      ...companyData,
      [name]: value,
    });
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setCompanyData({
      ...companyData,
      [name]: value,
    });
  };

  //! -----------------------

  const [countrys, setCountrys] = useState(null);

  const deletePropJobsSL = () => {
    const newState = { ...companyDataSG };
    delete newState.jobs;
    setCompanyData(newState);
  };

  //?AL ACTUALIZAR STORE GLOBAL companyDataSG
  useEffect(() => {
    setCompanyData(companyDataSG);
  }, [companyDataSG]);

  //?AL MONTARSE COMPONENTE
  useEffect(() => {
    const getCountrys = async () => {
      try {
        const response = await fetch("../src/data/country.json");
        const jsonData = await response.json();
        //console.log("que trae json data countrys: ", jsonData);
        setCountrys(jsonData);
      } catch (error) {
        console.log("error al cargar countrys: ", error.message);
      }
    };
    getCountrys();

    deletePropJobsSL();
  }, []);

  //?PARA CARGAR LA IMAGEN AL INICIO
  const [imageLoad, setImageload] = useState();

  const loadImage = async () => {
    const URL_IMAGEN = `${VITE_URL}${companyData.image}`;

    await axios
      .get(URL_IMAGEN, { responseType: "blob", withCredentials: "include" })
      .then((response) => {
        setImageload(response.data);
      })
      .catch((error) => {
        console.log("error al cargar imagen: ", error);
      });
  };

  //?AL MODIFICAR ALGUN INPUT
  useEffect(() => {
    loadImage();
  }, [companyData]);

  //?PARA SUBIR UNA IMAGEN
  const [image, setImage] = useState(null);

  const subirImagen = (e) => {
    setImage(e);
  };

  const postImage = async () => {
    const f = new FormData();
    f.append("image", image);

    try {
      const response = await axios.post(URL_IMG, f, {
        withCredentials: "include",
      });
      await fetchCompany();
    } catch (error) {
      console.log("error al subir imagen: ", error.message);
    }
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.profilePictureBasicInfoContainer}>
        {/* ENCABEZADO */}
        <div className={styles.header}>
          <h1>Company</h1>
        </div>
        {/* IMAGEN */}
        {/* {
                    isEditing.image &&
                    <div className={styles.EditPhoto}>
                        <ImageDropzone type={"photo"} handleCancelButton={handleImageChangeButton}/>
                    </div>
                } */}
        <div
          className={styles.imageContainer}
          onClick={() =>
            setIsEditing((prevState) => ({
              ...prevState,
              image: !prevState.image,
            }))
          }
        >
          {imageLoad && (
            <img
              src={URL.createObjectURL(imageLoad)}
              alt="Imagen"
              className={styles.profilePicture}
            />
          )}

          {isEditing.profile && (
            <div className={styles.buttonsImage}>
              <input
                type="file"
                name="image"
                onChange={(e) => subirImagen(e.target.files[0])}
              />
              <button onClick={() => postImage()}>Guardar Imagen</button>
              {/* <button 
                                className={styles.imageChangeButton} 
                                onClick={() => handleImageChangeButton()}
                            ><FaCameraRotate className={styles.buttonIcon}/></button> */}
            </div>
          )}
        </div>
        {/* PERFIL */}
        <div className={styles.userBasicInfoContainer}>
          {/* MODO EDICION */}
          {isEditing.profile ? (
            <div>
              {/* <label>Contraseña: </label><br/>
                                <TextInput 
                                //className={styles.headerEditionInput} 
                                type="text" name="profile.company_name"  
                                value={companyData.name} 
                            onChange={handleInputChange}/> */}
              <h3>Nombre de empresa: </h3>
              <input
                className={styles.input}
                type="text"
                name="name"
                value={companyData.name}
                onChange={handleInputChange}
              />
              <h3>Nombre de usuario: </h3>
              <input
                className={styles.input}
                type="text"
                name="username"
                value={companyData.username}
                onChange={handleInputChange}
              />
              <h3>Ciudad: </h3>
              <input
                className={styles.input}
                type="text"
                name="city"
                value={companyData.city}
                onChange={handleInputChange}
              />
              <h3>Pais: </h3>
              <select
                className={styles.input}
                name="country"
                value={companyData.country}
                onChange={handleSelectChange}
                placeholder="--seleccione opcion--"
              >
                {countrys?.map((country, index) => (
                  <option key={index} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
              <h3>Sitio Web: </h3>
              <input
                className={styles.input}
                type="text"
                name="website"
                value={companyData.website}
                onChange={handleInputChange}
              />
              <h3>Cuit: </h3>
              <input
                className={styles.input}
                type="text"
                name="cuit"
                value={companyData.cuit}
                onChange={handleInputChange}
              />
              <h3>Email: </h3>
              <input
                className={styles.input}
                type="text"
                name="email"
                value={companyData.email}
                onChange={handleInputChange}
              />
              {/* <h3>Url Imagen: </h3>
                                <input 
                                    className={styles.input}
                                    type="text" name="image" 
                                    value={companyData.image} 
                                    onChange={handleInputChange}/> */}
              <h3>Bio de la empresa: </h3>
              <textarea
                className={styles.headerEditionTextarea}
                name="bio"
                value={companyData.bio}
                onChange={handleInputChange}
              />
            </div>
          ) : (
            //MODO VISUALIZACION DE DATOS
            <div className={styles.infoContainer}>
              <h1>{companyData.name}</h1>
              <h3>
                {companyData.city}, {companyData.country}
              </h3>
              <h3>website: {companyData.website}</h3>
              <h3>cuit: {companyData.cuit}</h3>
              <h3>email : {companyData.email}</h3>
              <hr></hr>
              <h3>{companyData.bio}</h3>
            </div>
          )}

          {isProfileOwner && (
            <div className={styles.headerButtonContainer}>
              {isEditing.profile ? (
                <div>
                  {/* <button className={styles.cancelButton} onClick={() => handleCancelButton("profile")}><FaRectangleXmark className={styles.buttonIcon}/></button> */}
                  <button
                    className={styles.saveButton}
                    onClick={() => handleSaveButton("profile")}
                  >
                    <FaFloppyDisk className={styles.buttonIcon} />
                  </button>
                </div>
              ) : (
                <button
                  className={styles.editionButton}
                  onClick={() => handleProfileEditButton()}
                >
                  <FaPenToSquare className={styles.buttonIcon} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
