import { useEffect, useState } from "react";
import styles from "./styles.module.css";

const loadingText = [
  "Colocando gasolina no Robô...",
  "Passando Parâmetros...",
  "Chutando para funcionar...",
  "Buscando...",
];

const Loading = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setStep(step + 1);
    }, 1500);
    return () => {
      clearInterval(intervalId);
    };
  }, [step]);

  return (
    <div
      data-aos="flip-up"
      data-aos-duration="800"
      className={styles.containerLoading}
    >
      <p className={styles.loadingText}>{loadingText[step]}</p>
    </div>
  );
};

export default Loading;
