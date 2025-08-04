import { createCanvas, CanvasRenderingContext2D, Canvas } from "canvas";

const FIXED_WIDTH = 384;
const DEFAULT_FONT_SIZE = 24;
const DEFAULT_SIGN_FONT_SIZE = 18;

function wrapText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const lines = text.trim().split("\n"); // 按换行符分割文本
  let lineCount = 0;

  lines.forEach((line) => {
    let currentLine = "";
    for (let i = 0; i < line.length; i++) {
      const testLine = currentLine + line[i];
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && i > 0) {
        context.fillText(currentLine, x, y + lineCount * lineHeight);
        currentLine = line[i];
        lineCount++;
      } else {
        currentLine = testLine;
      }
    }
    context.fillText(currentLine, x, y + lineCount * lineHeight);
    lineCount++;
  });

  // 返回最后一行文本的 y 坐标加上行高
  return y + lineCount * lineHeight;
}

type RenderOptions = {
  font?: string;
  fontSize?: number;
  signatureName?: string;
  enableSignature?: boolean;
};

export function renderTextAutoWrap(
  text: string,
  options: RenderOptions = {}
): Canvas {
  const {
    font = "Arial",
    fontSize = DEFAULT_FONT_SIZE,
    enableSignature = true,
    signatureName = "多儿",
  } = options;
  const lineHeight = fontSize * 1.5;
  const baseLinePadding = fontSize;
  const canvas = createCanvas(FIXED_WIDTH, lineHeight);
  const ctx = canvas.getContext("2d");

  ctx.font = `${fontSize}px ${font}`;
  const contentHeight = wrapText(
    ctx,
    text,
    0,
    baseLinePadding,
    FIXED_WIDTH,
    lineHeight
  );

  // 调整 canvas 高度
  canvas.height = contentHeight + DEFAULT_SIGN_FONT_SIZE;

  // 重新绘制，因为调整 canvas 大小会清除内容
  ctx.font = `${fontSize}px ${font}`;
  wrapText(ctx, text, 0, baseLinePadding, FIXED_WIDTH, lineHeight);

  const stampText = `${new Date().toLocaleString()} ${enableSignature ? `by ${signatureName}` : ""}`;
  ctx.font = `${DEFAULT_SIGN_FONT_SIZE}px Arial`;
  ctx.fillText(stampText, 0, contentHeight);
  return canvas;
}
