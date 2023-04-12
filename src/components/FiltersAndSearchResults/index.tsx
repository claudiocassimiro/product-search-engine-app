import styles from "./styles.module.css";
import { useState } from "react";
import Dropdown from "../Dropdown";

const FiltersAndSearchResults = () => {
  const [inputValue, setInputValue] = useState("");
  const [isOpenDropDownWeb, setIsOpenDropDownWeb] = useState(false);
  const [isOpenDropDownCategorie, setIsOpenDropDownCategorie] = useState(false);
  const [selectedWebOption, setSelectedWebOption] = useState("");
  const [selectedCategoreOption, setSelectedCategoreOption] = useState("");
  const [alertText, setAlertText] = useState(
    "Você pode selecionar alguns filtros:"
  );

  const getResults = async () => {
    if (
      selectedCategoreOption.length === 0 &&
      selectedWebOption.length === 0 &&
      inputValue.length === 0
    ) {
      return setAlertText(
        "Escolha um filtro ou utilize o input de busca para procurar por um produto."
      );
    } else {
      setAlertText("Você pode selecionar alguns filtros:");
    }

    console.log("inputValue", inputValue);
    console.log("selectedWebOption", selectedWebOption);
    console.log("selectedCategoreOption", selectedCategoreOption);
  };

  return (
    <div className={styles.containerFiltersAndSearchBar}>
      <div className={styles.searchBarContainer}>
        <input
          className={styles.searchInput}
          type="text"
          name="inputValue"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Digite o nome do Produto"
        />
        <button
          onClick={getResults}
          type="button"
          className={styles.searchButton}
        >
          Search
        </button>
      </div>
      <p className={styles.alertText}>{alertText}</p>
      <div className={styles.containerDropDown}>
        <div className={styles.wrapper}>
          <button
            onClick={() => setIsOpenDropDownWeb(!isOpenDropDownWeb)}
            type="button"
            className={styles.dropdownButton}
          >
            {selectedWebOption.length > 0 ? `Web: ${selectedWebOption}` : "Web"}
          </button>
          {isOpenDropDownWeb ? (
            <Dropdown
              handleSelectedOption={setSelectedWebOption}
              handleDropdown={setIsOpenDropDownWeb}
              dropdownOptions={["Todos", "MercadoLivre", "Buscapé"]}
            />
          ) : null}
        </div>

        <div className={styles.wrapper}>
          <button
            onClick={() => setIsOpenDropDownCategorie(!isOpenDropDownCategorie)}
            type="button"
            className={styles.dropdownButton}
          >
            {selectedCategoreOption.length > 0
              ? `Categorias: ${selectedCategoreOption}`
              : "Categorias"}
          </button>
          {isOpenDropDownCategorie ? (
            <Dropdown
              handleSelectedOption={setSelectedCategoreOption}
              handleDropdown={setIsOpenDropDownCategorie}
              dropdownOptions={["Geladeira", "TV", "Celular"]}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FiltersAndSearchResults;
