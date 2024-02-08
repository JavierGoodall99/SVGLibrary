"use client";

import {
  Body2,
  makeStyles,
  shorthands,
  Text,
  tokens,
} from "@fluentui/react-components";

export const APP_HEADER_HEIGHT = 48;

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "1fr",
    columnGap: tokens.spacingHorizontalM,
    alignItems: "center",
    height: `${APP_HEADER_HEIGHT}px`,
    backgroundColor: "#0f6cbd",
    width: "100%",
    backgroundSize: "100%",
    boxShadow: tokens.shadow4,
    zIndex: 100,
  },
  title: {
    display: "flex",
    alignItems: "center",
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: "white",
    paddingLeft: "15px",
  },
  divider: {
    display: "inline-block",
    height: "24px",
    width: "1px",
    backgroundColor: "white",
    opacity: ".4",
    marginLeft: `calc(${tokens.spacingHorizontalS} + 1px)`,
    marginRight: "1px",
    ...shorthands.margin("8px"),
  },
  tenantLabel: {
    marginLeft: tokens.spacingHorizontalS,
  },
  alignCenter: {
    display: "flex",
    justifyContent: "center",
  },
  alignEnd: {
    display: "flex",
    justifyContent: "end",
  },
  heading: {
    display: "inline-block",
    backgroundColor: "rgba(0, 0, 0, .35)",
    ...shorthands.borderRadius("3px"),
    ...shorthands.padding(
      tokens.spacingHorizontalXS,
      tokens.spacingHorizontalM
    ),
    boxShadow: tokens.shadow4Brand,
  },
  label: {
    color: "white",
    opacity: "0.9",
    textTransform: "uppercase",
    ...shorthands.padding("15px"),
  },
});

const AppHeader = () => {
  const styles = useStyles();

  return (
    <header className={styles.root}>
      <div>
        <div className={styles.title}>
          <Text size={400}>Icon Library</Text>
          <div className={styles.divider}></div>
          <Body2 className={styles.tenantLabel}>By Javier Goodall</Body2>
        </div>
      </div>

      <div className={styles.alignCenter}></div>

      <div className={styles.alignEnd}>
      
      </div>
    </header>
  );
};

export default AppHeader;