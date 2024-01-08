import { CSSProperties } from "react";
import { rowContainerStyle } from "./styles";

interface TableRowProps {
  selectable?: boolean;
}

const defaultRowStyle: CSSProperties = { flex: 1, textAlign: "center" };

export const TableRow = ({ selectable = true }: TableRowProps) => {
  return (
    <div style={rowContainerStyle}>
      <div style={defaultRowStyle}>Name</div>
      <div style={defaultRowStyle}>Q1</div>
      <div style={defaultRowStyle}>Q2</div>
      <div style={defaultRowStyle}>Q3</div>
      <div style={defaultRowStyle}>Q4</div>
      <div style={defaultRowStyle}>Q5</div>
    </div>
  );
};
