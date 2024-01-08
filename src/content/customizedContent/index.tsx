import ReactDOM from "react-dom";

import { MidBot } from "./MidBot";
import { OverallPanel } from "./OverallPanel";

const midBotDiv = document.querySelector(".midBot");

if (midBotDiv) {
  const newElement = document.createElement("div");

  ReactDOM.render(<MidBot />, newElement);

  midBotDiv.insertBefore(newElement, midBotDiv.firstChild);
} else {
  console.log("Target div - 'midBotDiv' not found.");
}

const containerDiv = document.getElementById("container");

if (containerDiv) {
  const newElement = document.createElement("div");

  ReactDOM.render(<OverallPanel />, newElement);

  // Append the newElement to the midBotDiv
  containerDiv.appendChild(newElement);
} else {
  console.log("Target div - 'containerDiv' not found.");
}

export {};
