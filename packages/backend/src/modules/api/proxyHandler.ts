// src/severs/proxyHandler.ts
import axios, { AxiosRequestConfig } from "axios";
import axiosRetry from "axios-retry";
import { OutgoingHttpHeaders } from "http";
import {
  determineCacheDuration,
  getProxyHeaders,
  processCookies,
} from "~/utils";
import { Request, Response } from "express"; // 引入 Express 的类型

// 配置 axios 重试策略
axiosRetry(axios, {
  retries: 3, // 最大重试次数
  retryDelay: axiosRetry.exponentialDelay, // 使用指数退避策略
  retryCondition: (error) => {
    // 仅在网络错误或 5xx 错误时重试
    return (
      axiosRetry.isNetworkError(error) || axiosRetry.isRetryableError(error)
    );
  },
});

// const allowedDomains = ["example.com", "api.example.com"];
// const isAllowedUrl = (url: string): boolean => {
//   try {
//     const parsedUrl = new URL(url);
//     return allowedDomains.includes(parsedUrl.hostname);
//   } catch {
//     return false;
//   }
// };
function isValidValue(value: any): boolean {
  if (value === null || value === undefined) {
    return false;
  }
  if (typeof value === 'object') {
    return Object.keys(value).length > 0;
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  if (typeof value === 'string') {
    return value.trim() !== '';
  }
  return true; // 对于其他类型的值，认为是有效的
}
export const proxyHandler = async (req: Request, res: Response) => {
  try {
    const headers = getProxyHeaders(req);
    if (!headers["url"]) {
      res.status(400).json({ error: "url is not allowed" });
      return;
    }

    const targetUrl = headers["url"];
    delete headers["url"];
    delete req.query["url"];
    // if (!isAllowedUrl(targetUrl)) {
    //   res.status(403).json({ error: "URL not allowed" });
    //   return;
    // }
    
    // const response = await axios.get(targetUrl, { responseType: "stream" })
    // const h = response.headers as any
    // res.writeHead(response.status, { ...h });
    // response.data.pipe(res);


    const axiosConfig: AxiosRequestConfig = {
      method: req.method,
      url: targetUrl,
      headers: headers,
      responseType: "stream",
      timeout: 10000, // 设置请求超时为 10 秒
    };
    // 检查 req.body 是否包含有效值
    if (isValidValue(req.body)) {
      axiosConfig.data = req.body;
    }
    // 检查 req.query 是否包含有效值
    if (isValidValue(req.query)) {
      axiosConfig.params = req.query;
    }

    const response = await axios.request(axiosConfig);
    const cacheControl = req.headers["cache-control"];
    if (cacheControl !== "no-cache") {
      // 动态设置缓存策略
      const contentType = response.headers["content-type"];
      const cacheDuration = determineCacheDuration(contentType);
      const lastModified = new Date(
        response.headers["last-modified"] || Date.now()
      ).toUTCString();
      const eTag = `"${Buffer.from(targetUrl).toString("base64")}"`;
      // 设置缓存头
      if(response.headers["cache-control"])
        response.headers["cache-control"] = `public, max-age=${cacheDuration}`
      if(response.headers["last-modified"])
        response.headers["last-modified"] = lastModified
      if(response.headers["eTag"])
        response.headers["eTag"] = eTag
      // 条件请求处理
      if (
        req.headers["if-modified-since"] === lastModified ||
        req.headers["if-none-match"] === eTag
      ) {
        res.status(304).end(); // 资源未修改
        return;
      }
    }
    // 处理 Set-Cookie
    if (response.headers["set-cookie"]) {
      response.headers["set-cookie"] = processCookies(
        response.headers["set-cookie"],
        req.headers.origin,
        process.env.SERVER_PATH || "localhost"
      );
    }

    // 将 AxiosResponseHeaders 转换为 OutgoingHttpHeaders
    const outgoingHeaders: OutgoingHttpHeaders = {};
    for (const [key, value] of Object.entries(response.headers)) {
      outgoingHeaders[key] = value;
    }

    res.writeHead(response.status, outgoingHeaders);
    response.data.pipe(res);
  } catch (error: any) {
    const statusCode = error.response?.status || 500;
    const message = error.response?.statusText || "Internal Server Error";
    res.status(statusCode).json({ error: message });
  }
};
