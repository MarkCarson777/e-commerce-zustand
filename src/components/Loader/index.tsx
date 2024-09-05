"use client";

import styles from "./index.module.css";

interface LoaderProps {
  size?: string;
  className?: string;
}

export const Loader = (props: LoaderProps) => {
  const { size, className } = props;

  const style = {
    "--loader-size": size || "2em",
  } as React.CSSProperties;

  return (
    <div className={className} style={style}>
      <span className={styles.loader} />
    </div>
  );
};
