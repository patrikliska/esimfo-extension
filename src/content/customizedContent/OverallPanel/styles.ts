import { CSSProperties } from "react";

export const panelContainerStyle: CSSProperties = {
  backgroundColor: "#1a1a1a",
  width: "20vw",
  height: "25vh",
  minWidth: 400,
  borderRadius: "10px",
  boxShadow: "rgba(45, 35, 66, 0.4) 0px 4px 8px, rgba(45, 35, 66, 0.3) 0px 7px 13px -3px",
  zIndex: 9999,
  position: "fixed",
  right: "5rem",
  padding: "40px 20px 20px 20px",
  color: "rgba(255,255,255,0.8)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: 10,
  overflow: "hidden",
  border: "4px double #0f0f0f",
};

export const panelHeaderContainerStyle: CSSProperties = {
  background: "rgba(255, 255, 255, 0.2)",
  height: 30,
  left: 0,
  position: "absolute",
  top: 0,
  width: "100%",
  borderBottom: "2px solid #8a8a8a",
};

export const actionContainerStyle: CSSProperties = {
  display: "flex",
  position: "relative",
  justifyContent: "end",
  justifySelf: "end",
  alignItems: "center",
  alignSelf: "end",
  width: "100%",
};

export const buttonContainerStyle: CSSProperties = {
  flex: 1,
  justifyContent: "end",
  display: "flex",
};
