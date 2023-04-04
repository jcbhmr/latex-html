#!/usr/bin/env node
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";

const server = http.createServer(async (req, res) => {
  if (req.path === "/") {
    let html = await readFile("test/index.demo.tex.html");
    html = html.replace(
      '<script src="https://unpkg.com/@jcbhmr/tex-html"></script>',
      '<script src="/https://unpkg.com/@jcbhmr/tex-html"></script>'
    );
    res.setHeader("Content-Type", "text/html;charset=utf-8");
    res.end(html);
    return;
  }
  if (req.path === "/https://unpkg.com/@jcbhmr/tex-html") {
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
