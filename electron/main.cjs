const { app, BrowserWindow, shell } = require('electron');
const http = require('http');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'out');
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.mp4': 'video/mp4',
  '.mp3': 'audio/mpeg',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
};

// 简单的静态文件服务器
function createServer() {
  return http.createServer((req, res) => {
    try {
      let urlPath = decodeURIComponent(req.url.split('?')[0]);
      let filePath = path.join(OUT_DIR, urlPath);

      // 目录请求或无扩展名 → index.html
      if (urlPath.endsWith('/') || !path.extname(urlPath)) {
        const tryPath = path.join(filePath, 'index.html');
        if (fs.existsSync(tryPath)) {
          filePath = tryPath;
        } else {
          // SPA 回退到根 index.html
          filePath = path.join(OUT_DIR, 'index.html');
        }
      }

      if (!fs.existsSync(filePath)) {
        res.writeHead(404);
        res.end('Not Found');
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    } catch (e) {
      res.writeHead(500);
      res.end('Server Error');
    }
  });
}

// 查找可用端口
function findPort(start) {
  return new Promise((resolve) => {
    const server = createServer();
    server.listen(start, '127.0.0.1', () => {
      const port = server.address().port;
      server.close(() => resolve(port));
    });
    server.on('error', () => resolve(findPort(start + 1)));
  });
}

let httpServer;
let tipWindow;

async function start() {
  const port = await findPort(3000);
  httpServer = createServer();
  httpServer.listen(port, '127.0.0.1', () => {
    // 打开系统默认浏览器
    shell.openExternal(`http://127.0.0.1:${port}/`);
    // 显示提示窗口
    createTipWindow();
  });
}

function createTipWindow() {
  tipWindow = new BrowserWindow({
    width: 420,
    height: 180,
    resizable: false,
    minimizable: true,
    maximizable: false,
    title: '张攀岳个人网站',
    webPreferences: { nodeIntegration: false, contextIsolation: true },
  });

  tipWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(`
    <!DOCTYPE html>
    <html><head><meta charset="utf-8"><style>
      body{font-family:-apple-system,"Microsoft YaHei",sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;margin:0;background:#faf7f4;color:#1a1a1a;text-align:center;padding:20px;box-sizing:border-box}
      h2{margin:0 0 12px;font-size:18px}
      p{margin:0 0 6px;font-size:13px;color:rgba(26,26,26,0.7);line-height:1.6}
      .hint{font-size:12px;color:#f97316;margin-top:8px}
    </style></head><body>
      <h2>张攀岳个人网站</h2>
      <p>网站已在浏览器中打开</p>
      <p>关闭此窗口将退出程序</p>
      <p class="hint">如未自动打开，请手动访问浏览器</p>
    </body></html>
  `));

  tipWindow.on('closed', () => {
    tipWindow = null;
    if (httpServer) httpServer.close();
    app.quit();
  });
}

app.whenReady().then(start);

app.on('window-all-closed', () => {
  if (httpServer) httpServer.close();
  app.quit();
});
