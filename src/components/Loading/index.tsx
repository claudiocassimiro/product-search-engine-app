import { useEffect, useState } from "react";
import styles from "./styles.module.css";

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
    <div className={styles.containerLoading}>
      {step === 0 ? (
        <p className={styles.loadingText}>Colocando gasolina no Robô...</p>
      ) : null}
      {step === 1 ? (
        <p className={styles.loadingText}>Passando Parâmetros...</p>
      ) : null}
      {step === 2 ? (
        <p className={styles.loadingText}>Chutando para funcionar...</p>
      ) : null}
      {step >= 3 ? <p className={styles.loadingText}>Buscando...</p> : null}
    </div>
  );
};

export default Loading;
