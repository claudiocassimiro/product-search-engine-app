import Head from "next/head";
import styles from "@/styles/Home.module.css";
import FiltersAndSearchResults from "@/components/FiltersAndSearchResults";
import { useState } from "react";
import { Products } from "@/utils/types";
// import Image from "next/image";
import ContainerProducts from "@/components/ContainerProducts";
import Loading from "@/components/Loading";

export default function Home() {
  const [products, setProducts] = useState<Products[]>([]);
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
        <header className={styles.header}>
          {/* <Image /> */}
          <h1 className={styles.title}>EasyBuy</h1>
          {/* Burger Button com links para GitHub e LinkedIn */}
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
