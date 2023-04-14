import Image from "next/image";
import styles from "./styles.module.css";

const NotFoundProduct = () => {
  return (
    <div
      data-aos="flip-left"
      data-aos-duration="500"
      className={styles.container}
    >
      <p className={styles.containerMessage}>
        Ops! Parece que não existe resultados para essa pesquisa, tente buscar
        por outro produto!
      </p>
      <Image
        src="/notfound-image.webp"
        alt="Notfound image"
        width={250}
        height={250}
      />
    </div>
  );
};

export default NotFoundProduct;
