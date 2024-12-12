// src/severs/api.ts
import { Router } from "express";
import rateLimit from 'express-rate-limit';
import { proxyHandler } from "~/modules/api/proxyHandler";

// 速率限制中
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 分钟
  max: 60, // 每分钟最多请求
  message: "Too many requests, please try again later."
});

const router = Router();

router.all("/proxy/*", limiter, proxyHandler);

export default router;