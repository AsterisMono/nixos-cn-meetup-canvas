import process from 'node:process';
import { getLogger } from '@asterismono/monologger';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import 'dotenv/config';

const logger = getLogger();

const app = new Hono();

const PRINTER_IP = process.env.MEMOBIRD_PRINTER_IP;

if (!PRINTER_IP) {
  console.error('错误：请设置环境变量 MEMOBIRD_PRINTER_IP');
  process.exit(1);
}

logger.info(`CORS 代理服务器将转发请求到打印机：${PRINTER_IP}`);

// 启用 CORS
app.use('/*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// 健康检查端点
app.get('/', (c) => {
  return c.json({
    status: 'running',
    message: 'Memobird CORS 代理服务器运行中',
    printerIP: PRINTER_IP,
  });
});

// 代理打印请求到真实的打印机
app.post('/sys/printer', async (c) => {
  try {
    const body = await c.req.json();
    logger.info('收到打印请求，转发到打印机...');

    // 构建目标 URL
    const targetUrl = `http://${PRINTER_IP}/sys/printer`;

    // 转发请求到真实的打印机
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const responseData = await response.text();
    logger.info(`打印机响应状态：${response.status}`);

    // 返回打印机的响应
    return new Response(responseData, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json',
      },
    });
  }
  catch (error) {
    console.error('代理请求失败：', error);
    return c.json(
      {
        error: '代理请求失败',
        message: error instanceof Error ? error.message : '未知错误',
      },
      500,
    );
  }
});

// 启动服务器
const port = 6366;
logger.info(`CORS 代理服务器启动在端口 ${port}`);

serve({
  fetch: app.fetch,
  port,
});
