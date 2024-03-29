import { Vector4 } from "./math/Vector4";

export default class SunGL {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private colorbuffer: ImageData;
  // private depthbuffer: ImageData;
  private depthbufferData: Int16Array;
  public depthTest: boolean;
  public depthMask: boolean;
  // private buffer: Uint8ClampedArray
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.colorbuffer = this.context.getImageData(0, 0, 800, 800);
    // this.depthbuffer = this.context.getImageData(0, 0, 800, 800);
    this.depthbufferData = new Int16Array(800 * 800)
    this.depthTest = true;
    this.depthMask = true;
    this.clearDepth();
  }
  clear() {
    const data = this.colorbuffer.data;
    for (var i = 0; i < data.length; i++) {
      data[0 + 4 * i] = Math.floor(0);
      data[1 + 4 * i] = Math.floor(0);
      data[2 + 4 * i] = Math.floor(0);
      data[3 + 4 * i] = Math.floor(0);
    }
    this.context.putImageData(this.colorbuffer, 0, 0);
  }
  clearDepth() {
    const data = this.depthbufferData;
    for (var i = 0; i < data.length; i++) {
      data[i] = -Infinity;
    }
  }
  setPixel(x: number, y: number, z: number, color: Vector4) {
    x = parseInt(x.toFixed());
    y = parseInt(y.toFixed());
    const xs = this.colorbuffer.width; //800
    const ys = this.colorbuffer.height; //400

    // //深度缓冲
    if (this.depthTest) {
      //开启深度测试
      if (z < this.depthbufferData[y * ys + x]) {
        //深度小于已经写入深度 测试不通过
        return;
      }

      //开启深度写入
      if (this.depthMask) {
        this.depthbufferData[y * ys + x] = z;
      }
    }

    //颜色缓冲
    this.colorbuffer.data[y * ys * 4 + 4 * x + 0] = color.x;
    this.colorbuffer.data[y * ys * 4 + 4 * x + 1] = color.y;
    this.colorbuffer.data[y * ys * 4 + 4 * x + 2] = color.z;
    this.colorbuffer.data[y * ys * 4 + 4 * x + 3] = color.w;
  }

  // setAll() {
  //   for (let y = 0; y < 400; y++) {
  //     for (let x = 0; x < 400; x++) {
  //       this.setPixel(x, y)
  //     }
  //   }
  // }
  draw() {
    this.context.putImageData(this.colorbuffer, 0, 0);
  }
}
