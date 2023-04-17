import styles from "./styles.module.css";
import { FormEvent, useState } from "react";
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
    "Você pode selecionar alguns filtros"
  );

  const getResults = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedCategoryOption.length === 0 && inputValue.length === 0) {
      return setAlertText(
        "Escolha um filtro ou utilize o input de busca para procurar por um produto."
      );
    } else {
      setAlertText("Você pode selecionar alguns filtros:");
    }

    setLoading(true);
    setProducts([]);
    const requests = [];

    try {
      if (
        selectedWebOption === "MercadoLivre" ||
        selectedWebOption === "Todos"
      ) {
        requests.push(
          fetch(
            `${process.env.API_URL}/api/getMLProducts?category=${selectedCategoryOption}&inputValue=${inputValue}`
          )
        );
      }

      if (selectedWebOption === "Buscapé" || selectedWebOption === "Todos") {
        requests.push(
          fetch(
            `${process.env.API_URL}/api/getBuscapeProducts?category=${selectedCategoryOption}&inputValue=${inputValue}`
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
      setAlertText("");
    } finally {
      setInputValue("");
      setSelectedCategoryOption("");
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.containerFiltersAndSearchBar}>
        <form
          data-aos="fade-down"
          data-aos-duration="500"
          className={styles.searchBarContainer}
          onSubmit={(e) => getResults(e)}
        >
          <input
            className={styles.searchInput}
            type="text"
            name="inputValue"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Digite o nome do Produto"
          />
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </form>

        <div className={styles.containerDropDown}>
          <div
            data-aos="fade-right"
            data-aos-duration="500"
            className={styles.wrapper}
          >
            <button
              onClick={() => setIsOpenDropDownWeb(!isOpenDropDownWeb)}
              type="button"
              className={styles.dropdownButton}
              data-testid="web-button-filter"
            >
              {`Web: ${selectedWebOption}`}
            </button>
            {isOpenDropDownWeb ? (
              <Dropdown
                handleSelectedOption={setSelectedWebOption}
                handleDropdown={setIsOpenDropDownWeb}
                dropdownOptions={["Todos", "MercadoLivre", "Buscapé"]}
              />
            ) : null}
          </div>

          <div
            data-aos="fade-left"
            data-aos-duration="500"
            className={styles.wrapper}
          >
            <button
              onClick={() => setIsOpenDropDownCategory(!isOpenDropDownCategory)}
              type="button"
              className={styles.dropdownButton}
              data-testid="category-button-filter"
            >
              {selectedCategoryOption.length > 0
                ? `Categoria: ${selectedCategoryOption}`
                : "Categoria"}
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
      <p
        data-aos="zoom-in"
        data-aos-duration="500"
        className={styles.alertText}
      >
        {alertText}
      </p>
    </>
  );
};

export default FiltersAndSearchResults;
