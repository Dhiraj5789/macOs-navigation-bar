import * as React from "react";

import styles from "./styles.module.scss";

interface CardProps {
  src: string;
}

export const Card = ({ src }: CardProps) => (
  <span className={styles.card}>
    <div className={styles.card__blur}>{src}</div>
    <div className={styles.card__img}>{src}</div>
    {/* <img className={styles.card__img} src={src} alt="" /> */}
  </span>
);
