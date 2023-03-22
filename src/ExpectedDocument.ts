type ExpectedDocument = Document & { "@type": "ExpectedDocument" };

// Remember, our expected DOM tree looks like this:
//
//   <html>                 (auto)
//     <head>               (auto)
//       <script src="..."> (auto moved)
//     <body>               (auto)
//       <plaintext>        (auto moved)
//
// Which is interpreted from HTML source code that looks like this:
//
//   <script src="..."></script><plaintext>
//   ...LaTeX code here...
const ExpectedDocument = {
  [Symbol.hasInstance](o: unknown): o is ExpectedDocument {
    return (
      typeof o === "object" &&
      o != null &&
      o instanceof Document &&
      !o.doctype &&
      !o.documentElement.lang &&
      o.head.childNodes.length === 1 &&
      o.body.childNodes.length === 1 &&
      o.body.firstElementChild!.tagName === "PLAINTEXT"
    );
  },
} as unknown as Function;

if (document instanceof ExpectedDocument) {
}

export default ExpectedDocument;
