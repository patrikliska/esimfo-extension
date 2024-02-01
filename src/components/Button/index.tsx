import { ButtonHTMLAttributes } from "react";
import styled from "@emotion/styled";

type ColorScheme = "default" | "primary" | "secondary" | "error";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  colorScheme?: ColorScheme;
  size?: ButtonSize;
}

const getSizeProperties = (size: ButtonSize) => {
  switch (size) {
    case "large":
      return "16px";
    case "medium":
      return "13px";
    default:
    case "small":
      return "11px";
  }
};

export const Button = styled.button<ButtonProps>`
  --bezier: cubic-bezier(0.22, 0.61, 0.36, 1);
  --edge-light: hsla(0, 0%, 50%, 0.8);
  --text-light: rgba(255, 255, 255, 0.4);
  --back-color: 240, 40%;

  cursor: pointer;
  padding: 0.7em 1em;
  border-radius: 0.5em;
  display: flex;
  align-items: center;
  gap: 0.5em;
  text-wrap: nowrap;
  text-overflow: ellipsis;

  font-size: ${({ size = "medium" }) => getSizeProperties(size)};
  letter-spacing: 0.05em;
  line-height: 1;
  font-weight: bold;

  background: linear-gradient(
    140deg,
    hsla(var(--back-color), 50%, 1) min(2em, 20%),
    hsla(var(--back-color), 50%, 0.6) min(8em, 100%)
  );
  color: hsla(0, 0%, 90%);
  border: 0;
  box-shadow: inset 0.4px 1px 4px var(--edge-light);

  transition: all 0.1s var(--bezier);

  &:hover {
    --edge-light: hsla(0, 0%, 50%, 1);
    text-shadow: 0px 0px 10px var(--text-light);
    box-shadow: inset 0.4px 1px 4px var(--edge-light), 2px 4px 8px hsla(0, 0%, 0%, 0.295);
    transform: scale(1.1);
  }

  &:active {
    --text-light: rgba(255, 255, 255, 1);

    background: linear-gradient(
      140deg,
      hsla(var(--back-color), 50%, 1) min(2em, 20%),
      hsla(var(--back-color), 50%, 0.6) min(8em, 100%)
    );
    box-shadow: inset 0.4px 1px 8px var(--edge-light), 0px 0px 8px hsla(var(--back-color), 50%, 0.6);
    text-shadow: 0px 0px 20px var(--text-light);
    color: hsla(0, 0%, 100%, 1);
    letter-spacing: 0.1em;
    transform: scale(1);
  }
`;
