import React from "react";
import { Spinner, makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
});

const CustomSpinner: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Spinner />
    </div>
  );
};

export default CustomSpinner;
