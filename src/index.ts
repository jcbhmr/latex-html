import ExpectedDocument from "./ExpectedDocument";

async function handleDocumentReady(): any {

  if (document instanceof ExpectedDocument) {
    const plaintext = document.querySelector("plaintext")!;
    const latexSouce = plaintext.textContent;
    let latexDocument: Document;
    try {
      latexDocument = LaTeXDOM.parse(latexSource);
    } catch (error) {}
    plaintext.hidden = true;
  }
}

if (
  document.readyState === "interactive" ||
  document.readyState === "complete"
) {
  handleDocumentReady();
} else {
  globalThis.addEventListener("DOMContentLoaded", handleDocumentReady, {
    once: true,
  });
}
