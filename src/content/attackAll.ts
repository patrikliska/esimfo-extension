import { sendCustomFightRequest } from "./utils/fight";

export const attackAll = () => {
  const originalFightButton = document.querySelector(".fightButton") as HTMLButtonElement;

  console.log("originalFightButton", originalFightButton);

  originalFightButton.click();

  const side = originalFightButton.dataset["side"];
  const attack = originalFightButton.dataset["hitType"];

  if (!side || !attack) return console.error("Missing side or attack");

  sendCustomFightRequest(side, attack);
};
