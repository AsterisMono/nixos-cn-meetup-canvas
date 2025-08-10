'use client';
import type { Jimp } from 'jimp';
import { Buffer } from 'buffer/';
import { Bitmap, Bits } from 'binary-bmp';

const MEMOBIRD_CORS_PROXY = 'http://localhost:6366';
const MAX_PACKAGE_SIZE = 25600;

export async function memoBirdPrint(image: Awaited<ReturnType<typeof Jimp.read>>) {
  const bitmap = new Bitmap({
    width: image.bitmap.width,
    height: image.bitmap.height,
    data: image.bitmap.data,
    bits: Bits.RGBA,
  }).flip().bits(Bits.BINARY);
  const imageBase64Data = Buffer.from(bitmap.uint8Array()).toString('base64');

  // 检查是否需要分包
  if (imageBase64Data.length <= MAX_PACKAGE_SIZE) {
    // 单包处理
    const payload = {
      command: 3,
      content: {
        paperLogoState: 0,
        textList: [
          {
            basetext: imageBase64Data,
            bold: 0,
            encodeType: 0,
            fontSize: 1,
            iconID: 0,
            isHead: false,
            isLongPicture: true,
            isSignature: false,
            originalImgPath: '/homeless-shelter',
            printType: 5,
            underline: 0,
          },
        ],
      },
      isNotePrint: 0,
      // Not a typo
      lableHeight: 0,
      msgType: 1,
      pkgCount: 1,
      pkgNo: 1,
      printCount: 0,
      printID: Date.now(),
      printSpeed: 0,
      priority: 0,
    };

    await fetch(`${MEMOBIRD_CORS_PROXY}/sys/printer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  }
  else {
    // 多包处理
    const chunks = [];
    for (let i = 0; i < imageBase64Data.length; i += MAX_PACKAGE_SIZE) {
      chunks.push(imageBase64Data.slice(i, i + MAX_PACKAGE_SIZE));
    }

    const pkgCount = chunks.length;
    const printID = Date.now();

    // 发送每个包
    for (let i = 0; i < chunks.length; i++) {
      const isLastPackage = i === chunks.length - 1;
      const pkgNo = i + 1;

      const payload = {
        command: 3,
        content: {
          paperLogoState: 0,
          textList: [
            {
              basetext: chunks[i],
              bold: 0,
              encodeType: 0,
              fontSize: 1,
              iconID: 0,
              isHead: false,
              isLongPicture: isLastPackage,
              isSignature: false,
              ...(isLastPackage ? { originalImgPath: '/homeless-shelter' } : {}),
              printType: 5,
              underline: 0,
            },
          ],
        },
        isNotePrint: 0,
        // Not a typo
        lableHeight: 0,
        msgType: 1,
        pkgCount,
        pkgNo,
        printCount: 0,
        printID,
        printSpeed: 0,
        priority: 0,
      };

      await fetch(`${MEMOBIRD_CORS_PROXY}/sys/printer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    }
  }
}
