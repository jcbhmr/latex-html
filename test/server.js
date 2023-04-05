#!/usr/bin/env node
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";

const server = createServer(async (req, res) => {
  console.log(req.method, req.url);
  if (req.url === "/") {
    let html = await readFile("test/index.demo.tex.html", "utf-8");
    html = html.replace(
      '<script src="https://unpkg.com/@jcbhmr/tex-html"></script>',
      '<script src="/https://unpkg.com/@jcbhmr/tex-html"></script>'
    );
    res.setHeader("Content-Type", "text/html;charset=utf-8");
    res.end(html);
    return;
  }
  if (req.url === "/https://unpkg.com/@jcbhmr/tex-html") {
    const js = await readFile("dist/index.iife.js");
    res.setHeader("Content-Type", "text/javascript;charset=utf-8");
    res.end(js);
    return;
  }
  res.statusCode = 404;
  res.end("Not found");
});

const port = process.env.PORT || 3000;
await new Promise((r) => server.listen(port, r));
console.info(`Listening on http://localhost:${port}`);
