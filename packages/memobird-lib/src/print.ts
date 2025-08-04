import { Bitmap, Bits, CanvasLike } from "binary-bmp";
import axios from "axios";
const PRINTER_IP = "192.168.124.170";

export async function memoBirdPrint(content: CanvasLike) {
  const bitmap = Bitmap.fromCanvas(content).flip().bits(Bits.BINARY);
  const payloadBase64 = Buffer.from(bitmap.uint8Array()).toString("base64");
  const payload = {
    command: 3,
    content: {
      paperLogoState: 0,
      textList: [
        {
          basetext: payloadBase64,
          bold: 0,
          encodeType: 0,
          fontSize: 1,
          iconID: 0,
          isHead: false,
          isLongPicture: true,
          isSignature: false,
          originalImgPath: "/homeless-shelter",
          printType: 5,
          underline: 0,
        },
      ],
    },
    isNotePrint: 0,
    lableHeight: 0,
    msgType: 1,
    pkgCount: 1,
    pkgNo: 1,
    printCount: 0,
    printID: Date.now(),
    printSpeed: 0,
    priority: 0,
  };
  // send payload to printer: post to /sys/printer
  await axios.post(`http://${PRINTER_IP}/sys/printer`, payload);
}
