import Head from "next/head";
import styles from "@/styles/Home.module.css";
import FiltersAndSearchResults from "@/components/FiltersAndSearchResults";
// import Image from "next/image";

export default function Home() {
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
        <FiltersAndSearchResults />
      </main>
    </>
  );
}
