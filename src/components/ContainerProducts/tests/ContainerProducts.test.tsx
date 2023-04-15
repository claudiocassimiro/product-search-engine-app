import { cleanup, render, screen } from "@testing-library/react";
import ContainerProducts from "..";
import { Products } from "@/utils/types";

describe("ContainerProducts", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });

  describe("when the component is called and the length of the products array", () => {
    it('is greater than zero, should be rendered a element with testid equal to "container-products"', () => {
      const productsMockArray = [
        {
          productName: "Console Playstation 5",
          productDescription: "Console Playstation 5 God Of War Ragnarok",
          productPrice: "R$4.799",
          productImage:
            "https://http2.mlstatic.com/D_NQ_NP_791833-MLB52220077592_102022-W.webp",
          productLink:
            "https://www.mercadolivre.com.br/console-playstation-5-god-of-war-ragnarok/p/MLB21010665?pdp_filters=category:MLB11172#searchVariation=MLB21010665&position=1&search_layout=grid&type=product&tracking_id=faf36d3e-8b8a-48be-89b1-0aa0f43ba00e",
          productCategory: "Games",
        },
        {
          productName: "Sony PlayStation 5",
          productDescription:
            "Sony PlayStation 5 825GB Standard cor  branco e preto",
          productPrice: "R$4.999",
          productImage:
            "https://http2.mlstatic.com/D_NQ_NP_841787-MLA44484414455_012021-W.webp",
          productLink:
            "https://www.mercadolivre.com.br/sony-playstation-5-825gb-standard-cor-branco-e-preto/p/MLB16171888?pdp_filters=category:MLB11172#searchVariation=MLB16171888&position=2&search_layout=grid&type=product&tracking_id=faf36d3e-8b8a-48be-89b1-0aa0f43ba00e",
          productCategory: "Games",
        },
      ] as Products[];

      render(<ContainerProducts products={productsMockArray} />);

      expect(screen.getByTestId("container-projects")).toBeInTheDocument();
    });
    it('is equal to zero, an element with testid equal to "container-products" should not be rendered', () => {
      const productsMockArray = [] as Products[];

      render(<ContainerProducts products={productsMockArray} />);

      expect(
        screen.queryByTestId("container-projects")
      ).not.toBeInTheDocument();
    });
    it('is equal to zero, an element with testid equal to "NotFoundProduct" should be rendered', () => {
      const productsMockArray = [] as Products[];

      render(<ContainerProducts products={productsMockArray} />);

      expect(screen.queryByTestId("NotFoundProduct")).toBeInTheDocument();
    });
  });

  describe("if an product has a productImage thats", () => {
    it('start with "https", should be rendered', () => {
      const productsMockArray = [
        {
          productName: "Console Playstation 5",
          productDescription: "Console Playstation 5 God Of War Ragnarok",
          productPrice: "R$4.799",
          productImage:
            "https://http2.mlstatic.com/D_NQ_NP_791833-MLB52220077592_102022-W.webp",
          productLink:
            "https://www.mercadolivre.com.br/console-playstation-5-god-of-war-ragnarok/p/MLB21010665?pdp_filters=category:MLB11172#searchVariation=MLB21010665&position=1&search_layout=grid&type=product&tracking_id=faf36d3e-8b8a-48be-89b1-0aa0f43ba00e",
          productCategory: "Games",
        },
        {
          productName: "Sony PlayStation 5",
          productDescription:
            "Sony PlayStation 5 Digital 825GB God of War Ragnarok Bundle cor  branco e preto",
          productPrice: "R$4.299",
          productImage:
            "https://http2.mlstatic.com/D_NQ_NP_650447-MLA53159425310_012023-W.webp",
          productLink:
            "https://www.mercadolivre.com.br/sony-playstation-5-digital-825gb-god-of-war-ragnarok-bundle-cor-branco-e-preto/p/MLB20962350?pdp_filters=category:MLB11172#searchVariation=MLB20962350&position=3&search_layout=grid&type=product&tracking_id=faf36d3e-8b8a-48be-89b1-0aa0f43ba00e",
          productCategory: "Games",
        },
        {
          productName: "Sony PlayStation 5",
          productDescription:
            "Sony PlayStation 5 825GB Standard cor  branco e preto",
          productPrice: "R$4.999",
          productImage:
            "https://http2.mlstatic.com/D_NQ_NP_841787-MLA44484414455_012021-W.webp",
          productLink:
            "https://www.mercadolivre.com.br/sony-playstation-5-825gb-standard-cor-branco-e-preto/p/MLB16171888?pdp_filters=category:MLB11172#searchVariation=MLB16171888&position=2&search_layout=grid&type=product&tracking_id=faf36d3e-8b8a-48be-89b1-0aa0f43ba00e",
          productCategory: "Games",
        },
      ] as Products[];

      render(<ContainerProducts products={productsMockArray} />);

      const products = screen.getAllByTestId("productWrapper");

      expect(products).toHaveLength(3);
    });
    it("not start with 'https', shouldn't be rendered", () => {
      const productsMockArray = [
        {
          productName: "Console Playstation 5",
          productDescription: "Console Playstation 5 God Of War Ragnarok",
          productPrice: "R$4.799",
          productImage:
            "https://http2.mlstatic.com/D_NQ_NP_791833-MLB52220077592_102022-W.webp",
          productLink:
            "https://www.mercadolivre.com.br/console-playstation-5-god-of-war-ragnarok/p/MLB21010665?pdp_filters=category:MLB11172#searchVariation=MLB21010665&position=1&search_layout=grid&type=product&tracking_id=faf36d3e-8b8a-48be-89b1-0aa0f43ba00e",
          productCategory: "Games",
        },
        {
          productName: "Sony PlayStation 5",
          productDescription:
            "Sony PlayStation 5 Digital 825GB God of War Ragnarok Bundle cor  branco e preto",
          productPrice: "R$4.299",
          productImage:
            "https://http2.mlstatic.com/D_NQ_NP_650447-MLA53159425310_012023-W.webp",
          productLink:
            "https://www.mercadolivre.com.br/sony-playstation-5-digital-825gb-god-of-war-ragnarok-bundle-cor-branco-e-preto/p/MLB20962350?pdp_filters=category:MLB11172#searchVariation=MLB20962350&position=3&search_layout=grid&type=product&tracking_id=faf36d3e-8b8a-48be-89b1-0aa0f43ba00e",
          productCategory: "Games",
        },
        {
          productName: "Sony PlayStation 5",
          productDescription:
            "Sony PlayStation 5 825GB Standard cor  branco e preto",
          productPrice: "R$4.999",
          productImage:
            "data://http2.mlstatic.com/D_NQ_NP_841787-MLA44484414455_012021-W.webp",
          productLink:
            "https://www.mercadolivre.com.br/sony-playstation-5-825gb-standard-cor-branco-e-preto/p/MLB16171888?pdp_filters=category:MLB11172#searchVariation=MLB16171888&position=2&search_layout=grid&type=product&tracking_id=faf36d3e-8b8a-48be-89b1-0aa0f43ba00e",
          productCategory: "Games",
        },
      ] as Products[];

      render(<ContainerProducts products={productsMockArray} />);

      const products = screen.getAllByTestId("productWrapper");

      expect(products).toHaveLength(2);
    });
  });
});
