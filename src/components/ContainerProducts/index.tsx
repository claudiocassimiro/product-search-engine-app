import Image from "next/image";
import styles from "./styles.module.css";
import { Products } from "@/utils/types";

interface ContainerProductsProps {
  products: Products[];
}

const ContainerProducts = ({ products }: ContainerProductsProps) => {
  return (
    <div className={styles.containerProducts}>
      {products.map((item, index) =>
        item.productImage?.startsWith("https") ? (
          <div
            className={styles.productWrapper}
            key={`${item.productName}-${index}`}
          >
            <div className={styles.containerImage}>
              <Image
                src={item.productImage || ""}
                alt={`Imagem do producto ${item.productName}`}
                width={200}
                height={200}
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
  );
};

export default ContainerProducts;
