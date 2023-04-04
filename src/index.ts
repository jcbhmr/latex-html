import { pEvent } from "p-event";
import { parse as parseLatex, HtmlGenerator } from "latex.js";
// import "./index.scss";
import "console.style";
// @ts-ignore
import consoleMessage from "./consoleMessage.txt?raw";

declare var consoleMessage: string;

declare global {
  interface Console {
    style(xmlLike: string): void;
  }
}

const script = document.currentScript!;

async function main(): Promise<any> {
  document.documentElement.hidden = true;
  try {
    if (document.readyState === "loading") {
      await pEvent(document, "DOMContentLoaded");
    }

    const plaintext = document.querySelector("plaintext");
    if (!plaintext) {
      throw new Error("No <plaintext> element found.");
    }

    const generator = new HtmlGenerator({ hyphenate: false });
    const generated = parseLatex(plaintext.textContent!, { generator });
    const fragment = generated.domFragment();

    plaintext.replaceWith(fragment);
    script.remove();

    const headHTML = `
      <meta charset="UTF-8" />
      <title>${document.querySelector("h1")?.textContent ?? "Document"}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    `;
    document.head.insertAdjacentHTML("afterbegin", headHTML);

    console.style(consoleMessage);
  } finally {
    document.documentElement.hidden = false;
  }
}

main();
