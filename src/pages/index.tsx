import Head from "next/head";
import styles from "@/styles/Home.module.css";
import FiltersAndSearchResults from "@/components/FiltersAndSearchResults";
import { useState } from "react";
import { Products } from "@/utils/types";
import ContainerProducts from "@/components/ContainerProducts";
import Loading from "@/components/Loading";
import Image from "next/image";
import { products as productsmock } from "@/utils/mocks";

export default function Home() {
  const [products, setProducts] = useState<Products[]>(productsmock);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Head>
        <title>EasyBuy</title>
        <meta
          name="description"
          content="On EasyBuy you can find the best prices on products stores"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" /> {/* Trocar esse favicon */}
      </Head>
      <main className={styles.main}>
        <header
          data-aos="zoom-out-right"
          data-aos-duration="500"
          className={styles.header}
        >
          <Image
            src="/easybuy-logo.webp"
            alt="imagem da logo da easybuy"
            width={120}
            height={120}
          />
        </header>
        <FiltersAndSearchResults
          setProducts={setProducts}
          setLoading={setLoading}
        />
        {loading ? <Loading /> : <ContainerProducts products={products} />}
      </main>
    </>
  );
}
