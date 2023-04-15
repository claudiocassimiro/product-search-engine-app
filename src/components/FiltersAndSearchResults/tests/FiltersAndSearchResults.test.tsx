import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FiltersAndSearchResults from "..";
import { Products } from "@/utils/types";

describe("FiltersAndSearchResults", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });

  const mockObject = {
    setProducts: jest.fn(),
    setLoading: jest.fn(),
  };

  describe("when the user clicks on", () => {
    it('"web-button-filter", dropdown component should be rendered', async () => {
      render(<FiltersAndSearchResults {...mockObject} />);

      const webButtonFilter = screen.getByTestId("web-button-filter");

      userEvent.click(webButtonFilter);

      expect(await screen.findByTestId(`dropdown`)).toBeInTheDocument();
    });

    it('"category-button-filter", dropdown component should be rendered', async () => {
      render(<FiltersAndSearchResults {...mockObject} />);

      const categoryButtonFilter = screen.getByTestId("category-button-filter");

      userEvent.click(categoryButtonFilter);

      expect(await screen.findByTestId(`dropdown`)).toBeInTheDocument();
    });
  });

  describe("when the dropdown is open and the user choose an option", () => {
    it("the button to open dropdown, should have the option text", async () => {
      render(<FiltersAndSearchResults {...mockObject} />);

      const categoryButtonFilter = screen.getByTestId("category-button-filter");

      userEvent.click(categoryButtonFilter);

      expect(await screen.findByTestId(`dropdown`)).toBeInTheDocument();

      const firstOption = screen.getByTestId("option-0");

      userEvent.click(firstOption);

      await waitFor(() => {
        expect(screen.getByTestId("category-button-filter")).toHaveTextContent(
          "Categoria: Geladeira"
        );
      });
    });
    it("the button to open dropdown, should have the option text", async () => {
      render(<FiltersAndSearchResults {...mockObject} />);

      const webButtonFilter = screen.getByTestId("web-button-filter");

      userEvent.click(webButtonFilter);

      expect(await screen.findByTestId(`dropdown`)).toBeInTheDocument();

      const firstOption = screen.getByTestId("option-1");

      userEvent.click(firstOption);

      await waitFor(() => {
        expect(screen.getByTestId("web-button-filter")).toHaveTextContent(
          "Web: MercadoLivre"
        );
      });
    });
  });
});
