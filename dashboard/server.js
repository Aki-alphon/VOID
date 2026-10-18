/**
 * PROJECT VOID OS // DASHBOARD SERVER
 * Zero-dependency local Node.js server.
 * Serves the Sci-Fi Operator HUD to localhost & your local network (for Android phones/tablets).
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = process.env.PORT || 5000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.otf': 'font/otf',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.apk': 'application/vnd.android.package-archive'
};

const server = http.createServer((req, res) => {
  // CORS Headers to allow cross-origin requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  const filePath = path.join(PUBLIC_DIR, reqPath);

  // Security: prevent directory traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Cache-Control': 'no-cache'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('====================================================');
  console.log('       PROJECT VOID OS // NEURAL OPERATOR HUD       ');
  console.log('====================================================');
  console.log(`Local Access:   http://localhost:${PORT}`);

  // Display LAN IPs so user can open it on their Android phone
  const networkInterfaces = os.networkInterfaces();
  for (const iface in networkInterfaces) {
    for (const details of networkInterfaces[iface]) {
      if (details.family === 'IPv4' && !details.internal) {
        console.log(`Network Access: http://${details.address}:${PORT}`);
      }
    }
  }
  console.log('Target ESP32-S3: http://192.168.0.106/ (Cam) & :81 (WS)');
  console.log('====================================================');
});
