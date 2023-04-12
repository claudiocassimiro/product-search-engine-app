import styles from "./styles.module.css";
import { useState } from "react";
import Dropdown from "../Dropdown";
import { Products } from "@/utils/types";

type Results = Products;

const FiltersAndSearchResults = () => {
  const [inputValue, setInputValue] = useState("");
  const [isOpenDropDownWeb, setIsOpenDropDownWeb] = useState(false);
  const [isOpenDropDownCategory, setIsOpenDropDownCategory] = useState(false);
  const [selectedWebOption, setSelectedWebOption] = useState("Todos");
  const [selectedCategoryOption, setSelectedCategoryOption] = useState("");
  const [alertText, setAlertText] = useState(
    "Você pode selecionar alguns filtros:"
  );
  const [results, setResults] = useState<Results[]>([]);

  const getResults = async () => {
    const meliProducts = [];
    const buscapeProducts = [];
    if (selectedCategoryOption.length === 0 && inputValue.length === 0) {
      return setAlertText(
        "Escolha um filtro ou utilize o input de busca para procurar por um produto."
      );
    } else {
      setAlertText("Você pode selecionar alguns filtros:");
    }

    try {
      if (
        selectedWebOption === "MercadoLivre" ||
        selectedWebOption === "Todos"
      ) {
        const response = await fetch(
          `${process.env.API_URL}/api/getMLProducts?web=${selectedWebOption}&category=${selectedCategoryOption}&inputValue=${inputValue}`
        );

        const result = await response.json();
        meliProducts.push(...result.products);
      }

      if (selectedWebOption === "Buscapé" || selectedWebOption === "Todos") {
        const response = await fetch(
          `${process.env.API_URL}/api/getBuscapeProducts?web=${selectedWebOption}&category=${selectedCategoryOption}&inputValue=${inputValue}`
        );

        const result = await response.json();
        buscapeProducts.push(...result.products);
      }

      setResults([...meliProducts, ...buscapeProducts]);
    } catch (error) {
      console.log(error);
      setAlertText(
        "Ops, parece que aconteceu algum problema, tente recarregar a pagina e fazer sua busca novamente!"
      );
    } finally {
      setInputValue("");
      setSelectedCategoryOption("");
    }
  };

  console.log(results);

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
            onClick={() => setIsOpenDropDownCategory(!isOpenDropDownCategory)}
            type="button"
            className={styles.dropdownButton}
          >
            {selectedCategoryOption.length > 0
              ? `Categorias: ${selectedCategoryOption}`
              : "Categorias"}
          </button>
          {isOpenDropDownCategory ? (
            <Dropdown
              handleSelectedOption={setSelectedCategoryOption}
              handleDropdown={setIsOpenDropDownCategory}
              dropdownOptions={["Geladeira", "TV", "Celular"]}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FiltersAndSearchResults;
