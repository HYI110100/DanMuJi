// web.ts
import type { Express } from 'express';
import path from 'path';
import express from 'express';
import fs from 'fs';

const pageExtensions = ['.html', '.htm', '.xml', ''];  // 扩展支持的页面格式

export default (app: Express) => {
  let webDir = globalThis.config?.webDir || './public';
  if (globalThis.env === 'development') {
    webDir = '../.././dist/public';  // 开发环境下的路径
  }

  const staticPath = path.isAbsolute(webDir) ? webDir : path.resolve(process.cwd(), webDir);

  // 静态资源文件夹
  app.use(express.static(staticPath, { maxAge: '1d' }));

  // 所有非 API 请求都交给这个路由来处理
  app.get('*', (req, res) => {
    const isPageRequest = pageExtensions.includes(path.extname(req.path));
    const requestedFile = path.join(staticPath, req.path);
    
    // 检查文件是否存在
    fs.access(requestedFile, fs.constants.F_OK, (err) => {
      if (isPageRequest) {
          // 读取并修改 index.html 来插入自定义脚本
          fs.readFile(path.join(staticPath, 'index.html'), 'utf-8', (err, html) => {
            if (err) {
              res.status(500).send('An error occurred while serving the application.');
              return;
            }
  
            // 在 HTML 文件中插入自定义脚本（可以根据需求修改脚本路径）
            const customScript = `<script>window.SEVER_PATH = '${globalThis.SEVER_PATH}';window.SEVER_PORT = '${globalThis.SEVER_PORT}';</script>`;
            const modifiedHtml = html.replace('</head>', `${customScript}</head>`);
          
            res.send(modifiedHtml);
          });
      } else {
        if (err && err.code === 'ENOENT') {
          // 文件不存在
          res.status(404).send('404 File not found');
        } else {
          // 服务器错误
          res.status(500).send('Server Error');
        }
      }
    });
  });
};
