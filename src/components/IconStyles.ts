import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
    card: {
      maxWidth: "100%",
      height: "fit-content",
      ...shorthands.borderRadius("4px"),
    },

    iconContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "120px",
      width: "150px",
      ...shorthands.margin("auto"),
    },

    buttonContainer: {
      display: "flex",
      position: "relative",
      ...shorthands.margin("auto"),
    },
  
    button: {
      ...shorthands.borderRadius("4px"),
      ...shorthands.margin("4px"),
      width: "20px",
    },
  
    search: {
      position: "sticky",
      top: 0,
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      ...shorthands.padding("10px"),
      zIndex: 10,
      backgroundColor: "white",
    },

    root: {
      ...shorthands.overflow("hidden"),
      display: "flex",
      height: "calc(100vh - 132px)",
      backgroundColor: "#fff",
    },
    
  
    content: {
      ...shorthands.flex(1),
      ...shorthands.padding("16px"),
      ...shorthands.overflow("auto"),
  
      position: "relative",
    },
  
    flexColumn: {
      flexDirection: "column",
    },
  
    buttons: {
      ...shorthands.flex(1),
      ...shorthands.padding("16px"),
  
      position: "sticky",
      top: "-16px",
      right: "-16px",
      left: "-16px",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      columnGap: tokens.spacingHorizontalXS,
      backgroundColor: "#fff",
      transitionDuration: tokens.durationFast,
    },

  });

  export default useStyles;
  