import { tabs } from "webextension-polyfill";

export async function getCurrentTab() {
  console.log("tabs", tabs);

  const list = await tabs.query({ active: true, currentWindow: true });

  return list[0];
}
