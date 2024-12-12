import defaultConfig from "~/config/defaultConfig";
import { availablePortFind, getLocalIPAddress } from "~/utils";
import express from "express";
import http from "http";
import api from "./severs/api";
import web from "./severs/web";
import ws from "./severs/ws";

// 挂载配置
let config = defaultConfig;
// const configPath = path.join(process.cwd(), 'config.json')
// if (fs.existsSync(configPath)) {
//   const customConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'))
//   config = { ...config, ...customConfig }
// }
globalThis.config = config;

globalThis.env = (process.env.NODE_ENV || "production") as
  | "development"
  | "production";

const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use((req, res, next) => {
  const origin = req.headers.origin; // 获取请求的来源
  // 动态设置 Access-Control-Allow-Origin
  res.header("Access-Control-Allow-Origin", origin); // 根据请求的来源动态设置
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // 允许的 HTTP 方法
  res.header("Access-Control-Allow-Credentials", "true"); // 允许携带凭证
  const allowedHeaders:string[]  = ['Content-Type','Cache-Control'];
  if (req.headers['access-control-request-headers']) {
    const requestHeaders = req.headers['access-control-request-headers'].split(',').map(h => h.trim());
    for (const header of requestHeaders) {
      if (header.endsWith('-proxy')) {
        allowedHeaders.push(header);
      }
    }
  }
  res.header("Access-Control-Allow-Headers", allowedHeaders.join(', ')); // 允许的请求头
  
  // 处理 OPTIONS 请求（预检请求）
  if (req.method === "OPTIONS") {
     res.status(200).end();
  }else{
    next();
  }
});

availablePortFind({ initialPort: globalThis.config.severPort }).then((port) => {
  // api: Router
  app.use("/api", api);
  // web(app: express.Express): void
  web(app);
  // ws(server: http.Server): void
  ws(server);
  server.listen(port, () => {
    globalThis.SEVER_PATH = getLocalIPAddress();
    globalThis.SEVER_PORT = port;
    console.log(
      `Sever running at http://${globalThis.SEVER_PATH}:${globalThis.SEVER_PORT}`
    );
  });
});
