import Image from "next/image";
import styles from "./styles.module.css";
import { Products } from "@/utils/types";
import NotFoundProduct from "../NotFoundProduct";

interface ContainerProductsProps {
  products: Products[];
}

const ContainerProducts = ({ products }: ContainerProductsProps) => {
  return products.length > 0 ? (
    <div data-testid="container-projects" className={styles.containerProducts}>
      {products.map((item, index) =>
        item.productImage?.startsWith("https") ? (
          <div
            data-testid="productWrapper"
            data-aos="flip-left"
            data-aos-duration="500"
            className={styles.productWrapper}
            key={`${item.productName}-${index}`}
          >
            <div className={styles.containerImage}>
              <Image
                className={styles.image}
                src={item.productImage || ""}
                alt={`Imagem do producto ${item.productName}`}
                fill
              />
            </div>
            <div className={styles.wrapper}>
              <div className={styles.containerNameAndDescription}>
                <h2 className={styles.productName}>{item.productName}</h2>
                <p className={styles.productDescription}>
                  {item.productDescription}
                </p>
              </div>
              <span className={styles.productPrice}>{item.productPrice}</span>
            </div>
            <a
              className={styles.goToSiteButton}
              href={item.productLink || ""}
              title={`linka para ${item.productName}`}
              target="_blank"
            >
              Ir para o anuncio
            </a>
          </div>
        ) : null
      )}
    </div>
  ) : (
    <NotFoundProduct />
  );
};

export default ContainerProducts;
