import style from "./SearchComponent.module.css"
import { useState } from "react";
import {FaMagnifyingGlass} from "react-icons/fa6"
import { useNavigate } from "react-router-dom";
import { getSearchedUsers } from "../../Redux/UsersSlice";
import {useDispatch} from "react-redux";


const SearchComponent = () =>{

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState({
        name: "",
        formation: "",
        institution: ""
    });
    const [advancedSearchParams, setAdvancedSearchParams] = useState(false);

    const handleSearchInput = (event) => {
        const {name, value} = event.target;
        setSearchTerm({
            ...searchTerm,
            [name]: value
        })
    }

    const handleAdvancedSearchButton = (event) =>{
        setAdvancedSearchParams(!advancedSearchParams);
    }

    const handleSearchButton = () => {
        dispatch(getSearchedUsers({
            name: searchTerm.name, 
            academic_formation: searchTerm.formation,
            academic_institution: searchTerm.institution
        }))
        // navigate("/home")
    }

    return(
        <div className={style.searchComponentContainer}>
            <div className={style.inputSearchContainer}>
                <input 
                    type="text" 
                    placeholder="Ingrese un nombre para buscar"
                    className={style.searchInput} 
                    value={searchTerm.name} 
                    name="name"
                    onChange={handleSearchInput}
                />
                <button className={style.searchButton} onClick={handleSearchButton}>
                    <FaMagnifyingGlass/>
                </button>
            </div>

            <button className={style.advancedSearchButton} onClick={handleAdvancedSearchButton}>
                <p>Búsqueda avanzada</p>
            </button>

            <div className={advancedSearchParams ? style.advancedSearchContainer : style.hidden}>
                <div className={style.advancedSearchInputContainer}>
                    <p className={style.advancedSearchLabel}>
                        Tipo de formación:
                    </p>
                    <input 
                        type="text" 
                        placeholder="Agronomía, administración de empresas, software, etc..."
                        className={style.advancedSearchInput} 
                        value={searchTerm.formation} 
                        name="formation"
                        onChange={handleSearchInput}
                    />
                </div>

                <div className={style.advancedSearchInputContainer}>
                    <p className={style.advancedSearchLabel}>
                        Institución:
                    </p>
                    <input 
                        type="text" 
                        placeholder="Institutos, universidades, academias, etc..."
                        className={style.advancedSearchInput} 
                        value={searchTerm.institution} 
                        name="institution"
                        onChange={handleSearchInput}
                    />
                </div>
            </div>
        </div>
    )
}

export default SearchComponent;
