import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const toneColors = {
  public: "#C86B85",
  admin: "#252525",
  inherit: "currentColor",
};

const Loader = ({
  tone = "public",
  label = "Loading…",
  size = 44,
  minHeight = 160,
  inline = false,
}) => {
  const classes = useStyles();
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const color = toneColors[tone] || toneColors.public;

  const progress = (
    <CircularProgress
      aria-hidden="true"
      color="inherit"
      size={size}
      thickness={4.5}
      value={reduceMotion ? 75 : undefined}
      variant={reduceMotion ? "determinate" : "indeterminate"}
      style={{ color }}
    />
  );

  if (inline) {
    return (
      <Box
        component="span"
        className={classes.inline}
        role="status"
        aria-label={label}
      >
        {progress}
      </Box>
    );
  }

  return (
    <Box
      className={classes.container}
      role="status"
      aria-live="polite"
      style={{ minHeight }}
    >
      {progress}
      {label ? <span className={classes.label}>{label}</span> : null}
    </Box>
  );
};

export const LoadingButtonContent = ({ label }) => (
  <span className={buttonStyles.content} role="status" aria-live="polite">
    <Loader tone="inherit" label={label} size={18} inline />
    <span>{label}</span>
  </span>
);

const buttonStyles = {
  content: "loader-button-content",
};

const useStyles = makeStyles(() => ({
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    justifyContent: "center",
    width: "100%",
  },
  inline: {
    alignItems: "center",
    display: "inline-flex",
    justifyContent: "center",
    lineHeight: 0,
  },
  label: {
    color: "#5D5551",
    fontFamily: "Open Sans",
    fontSize: 16,
    lineHeight: "20px",
  },
  "@global": {
    ".loader-button-content": {
      alignItems: "center",
      display: "inline-flex",
      gap: 10,
      justifyContent: "center",
    },
  },
}));

export default Loader;
