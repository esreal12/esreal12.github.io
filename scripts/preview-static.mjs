import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';

const host = process.env.HOST ?? '127.0.0.1';
const port = Number(process.env.PORT ?? '4321');
const outputDirectory = resolve('dist');
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

function fileForPathname(pathname) {
  const requestedPath = decodeURIComponent(pathname).replace(/^\/+/, '');
  const candidate = normalize(join(outputDirectory, requestedPath));

  if (!candidate.startsWith(outputDirectory)) return null;
  if (existsSync(candidate) && statSync(candidate).isDirectory()) return join(candidate, 'index.html');
  return candidate;
}

createServer((request, response) => {
  const pathname = new URL(request.url ?? '/', `http://${host}`).pathname;
  const requestedFile = fileForPathname(pathname);
  const available = requestedFile && existsSync(requestedFile) && statSync(requestedFile).isFile();
  const file = available ? requestedFile : join(outputDirectory, '404.html');
  const status = available ? 200 : 404;

  response.writeHead(status, {
    'content-type': contentTypes[extname(file)] ?? 'application/octet-stream',
  });
  createReadStream(file).pipe(response);
}).listen(port, host, () => {
  console.log(`Static preview ready at http://${host}:${port}`);
});
