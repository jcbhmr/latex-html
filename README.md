# Local HTML LaTeX environment

📄 Write LaTeX in a `.html` file without build tools or an HTTP server

<div align="center">

<!-- prettier-ignore -->
[Storybook]()
| [Playground]()

</div>

## Installation

Just add the following to the top of your `.html` file! Oh, and **make sure you
disable any autoformatters** like Prettier! They'll auto-close tags and mess
with your indentation.

<!-- prettier-ignore -->
```html
<script src="https://unpkg.com/@htmlocal/latex"></script><plaintext>
```

💡 You may want to name your HTML file something like `My_Article.tex.html` and
then set your editor to use TeX syntax highlighting for `*.tex.html` files.

You can also inline the entire codebase into that `<script>` tag using [Inliner]
on an existing HTML page.

```sh
inliner My_Article.tex.html | sponge My_Article.tex.html
```

## Usage

### Example

```tex
<script src="https://esb.deno.dev/format=iife/https://esm.sh/@htmlocal/latex"></script><plaintext>
\documentclass{article}
\title{Example \LaTeX\ document}
\begin{document}
  \maketitle
  \begin{abstract}
    This is an example document with very little content.
  \end{abstract}
\end{document}
```

## How it works

The single `<script>` tag is the magic thing that makes the entire system work.
This project is designed to work with local `file:///C:/My_Article.tex.html`
files, so we need to use the non-CORS strategy of using a classic
non-`type="module"` script tag. This has the added benefit of letting us
pre-inject some CSS and/or `document.write()` some HTML tags to change how the
rest of the document is processed.

1. The HTML parser encounters a `<script>` tag.
2. The browser downloads the `<script>` tag _synchronously_ without continuing
   parsing. Then, it executes it.
3. We check to make sure that this document fits the expected form (no other
   elements). If there are extra elements, we do nothing and `console.error()`.
4. We do `document.write("<plaintext>")` to make everything after this
   `<script>` **not** be parsed as HTML.
5. After the document has finished parsing we get the content of the
   `<plaintext>` element and parse it as LaTeX. The `<plaintext>` prefix is
   removed.
6. After getting a valid HTML document from the LaTeX, we hydrate the existing
   HTML DOM tree with them. This includes things like `<title>`, CSS (bundled
   with the JavaScript code), `<meta>` tags, etc.
7. We `console.info()` a helpful guide to use `save()` in the JavaScript console
   to download a copy of the compiled HTML.

In particular, we hide the entire document with
`document.documentElement.style.setProperty("display", "none", "important")` and
do `document.write("<plaintext>")` to make sure that the rest of the document is
preserved entirely as-is with absolutely no HTML parsing that might eat some
critical whitespace. We also make sure to show a loading bar at the top like
GitHub does as we are processing things.

## Development

This project uses Storybook to test the UI elements of the project. We use
TypeScript to write the source code and Vite to bundle it into an ES module for
publishing to npm. We expect consumers to bundle the ESM build to UMD
themselves.

[inliner]: https://github.com/remy/inliner#readme
