import styles from "./styles.module.css";
import { useState } from "react";
import Dropdown from "../Dropdown";
import { Products } from "@/utils/types";

interface FiltersAndSearchResultsProps {
  setProducts: (products: Products[]) => void;
  setLoading: (value: boolean) => void;
}

const FiltersAndSearchResults = ({
  setProducts,
  setLoading,
}: FiltersAndSearchResultsProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpenDropDownWeb, setIsOpenDropDownWeb] = useState(false);
  const [isOpenDropDownCategory, setIsOpenDropDownCategory] = useState(false);
  const [selectedWebOption, setSelectedWebOption] = useState("Todos");
  const [selectedCategoryOption, setSelectedCategoryOption] = useState("");
  const [alertText, setAlertText] = useState(
    "Você pode selecionar alguns filtros:"
  );

  const getResults = async () => {
    setLoading(true);
    const requests = [];
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
        requests.push(
          fetch(
            `${process.env.API_URL}/api/getMLProducts?web=${selectedWebOption}&category=${selectedCategoryOption}&inputValue=${inputValue}`
          )
        );
      }

      if (selectedWebOption === "Buscapé" || selectedWebOption === "Todos") {
        requests.push(
          fetch(
            `${process.env.API_URL}/api/getBuscapeProducts?web=${selectedWebOption}&category=${selectedCategoryOption}&inputValue=${inputValue}`
          )
        );
      }
      const responses = await Promise.all(requests);
      const result = await Promise.all(
        responses.map((response) => response.json())
      );

      if (result.length === 1 && result[0].inputValue === inputValue) {
        const { products } = result[0];
        return setProducts([...products]);
      }

      if (result.length === 2 && result[0].inputValue === inputValue) {
        const [meliProducts, buscapeProducts] = result;
        return setProducts([
          ...meliProducts.products,
          ...buscapeProducts.products,
        ]);
      }

      if (result.length === 2) {
        return setProducts([...result[0].products, ...result[1].products]);
      }

      return setProducts([...result[0].products]);
    } catch (error) {
      setAlertText(
        "Ops, parece que aconteceu algum problema, tente recarregar a pagina e fazer sua busca novamente!"
      );
    } finally {
      setInputValue("");
      setSelectedCategoryOption("");
      setLoading(false);
    }
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
