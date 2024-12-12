import net from "net";
import os from "os";
import { Request } from "express"; // 引入 Express 的类型

/**
 * 查找可用端口
 *
 * @param options - 可选配置对象
 * @param options.initialPort - 开始查找的初始端口，默认为 3000
 * @param options.maxPort - 最大端口号，默认为 65535
 * @param options.minPort - 最小端口号，默认为 1024
 * @param options.maxAttempts - 最大尝试次数，默认为 0（表示无限制）
 * @param options.callback - 找到可用端口后的回调函数，接收找到的端口号作为参数
 */
export function availablePortFind(
  options?: {
    initialPort?: number;
    maxPort?: number;
    minPort?: number;
    maxAttempts?: number;
  },
) {
  const opt = options || {};
  const {
    initialPort = 3000,
    maxPort = 65535,
    minPort = 1024,
    maxAttempts = 0,
  } = opt;

  const maxA = Math.min(65535, maxAttempts);
  const maxP = Math.min(65535, maxPort);
  const minP = Math.max(0, minPort);
  const initP = Math.max(minP, Math.min(maxP, initialPort));

  let tryPortCount = 0;

  function checkPort(port: number) {
    return new Promise<number>((resolve, reject) => {
      if (tryPortCount >= maxA && maxA !== 0) {
        return reject(new Error("Max attempts reached."));
      }

      if (port > maxP) {
        return reject(new Error("No ports available."));
      }

      tryPortCount++;
      const server = net.createServer();

      server.listen(port, () => {
        server.close(); // 端口可用，立即关闭
        resolve(port);
      });

      server.on("error", (err) => {
        if ((err as any).code === "EADDRINUSE") {
          // 端口被占用，继续查找下一个端口
          checkPort(port + 1)
            .then(resolve)
            .catch(reject);
        } else {
          reject(err); // 其他错误
        }
      });
    });
  }

  return new Promise<number>((resolve, reject) => {
    checkPort(initP).then((port) => {
      resolve(port)
    })
    .catch((err) => {
      console.error("Error finding available port:", err);
      reject(err)
    });
  })

}

export function getLocalIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const iface of Object.values(interfaces).filter(x => x !== undefined)) {
    for (const details of iface) {
      if (details.family === 'IPv4' && !details.internal) {
        return details.address;
      }
    }
  }
  return '127.0.0.1';
}

export function getProxyHeaders(req: Request) {
  const { headers } = req;
  const myh: { [key: string]: any } = {};

  ['content-type', 'user-agent', 'cookie'].forEach((key) => {
    if (headers[key]) {
      myh[key] = headers[key];
    }
  });

  Object.entries(headers).forEach(([key, value]) => {
    if (key.endsWith('-proxy')) {
      myh[key.replace(/-proxy$/, '')] = value;
    }
  });
  if(!myh['url'] || req.query['url']){
    myh['url'] = decodeURIComponent(`${req.query['url'] || ''}`);
  }
  return myh;
}
export function processCookies(cookies: string[], origin: string | undefined, defaultDomain: string): string[] {
  return cookies.map((cookie) => {
    if (!/domain=/i.test(cookie)) return cookie;
    const domain = origin ? new URL(origin).hostname : defaultDomain;
    return cookie.replace(/domain=([^;]*)?/gi, `domain=${domain}`);
  });
}
export function determineCacheDuration(contentType: string | undefined): number {
  const DEFAULT_CACHE_DURATION = 60 * 60;

  if (!contentType) {
    return DEFAULT_CACHE_DURATION;
  }

  if (contentType.includes("image/")) {
    return 12 * 60 * 60;
  }

  if (contentType.includes("text/css")) {
    return 12 * 60 * 60;
  }

  if (contentType.includes("application/javascript") || contentType.includes("text/javascript")) {
    return 12 * 60 * 60;
  }

  if (contentType.includes("application/json")) {
    return 5 * 60;
  }

  if (contentType.includes("text/html")) {
    return 10 * 60; 
  }

  return DEFAULT_CACHE_DURATION;
}
