import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { renderApplication } from '@angular/platform-server';
import { APP_BASE_HREF } from '@angular/common';
import { readFileSync } from 'node:fs';

const server = express();

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtmlPath = join(serverDistFolder, 'index.server.html');
const indexHtml = readFileSync(indexHtmlPath, 'utf-8');

server.set('view engine', 'html');
server.set('views', browserDistFolder);

// Serve static files from browser build
server.get('*.*', express.static(browserDistFolder, {
  maxAge: '1y',
  index: false,
}));

// SSR for all other routes
server.get('*', async (req, res, next) => {
  try {
    const { bootstrapApp } = await import('./src/main.server');

    const html = await renderApplication(bootstrapApp, {
      document: indexHtml,
      url: req.originalUrl,
      platformProviders: [
        { provide: APP_BASE_HREF, useValue: req.baseUrl || '/' }
      ],
    });

    res.send(html);
  } catch (error) {
    next(error);
  }
});

function run() {
  const port = process.env['PORT'] || 4000;
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
