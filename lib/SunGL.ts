import { Vector4 } from "./math/Vector4"

export default class SunGL{
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D
  private imageData: ImageData
  // private buffer: Uint8ClampedArray
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.imageData = this.context.getImageData(0, 0, 800, 800);
  }
  clear() {
    const data = this.imageData.data
    for (var i=0;i< data.length; i++) {
        data[0+4*i]=Math.floor(255)
        data[1+4*i]=Math.floor(255)
        data[2+4*i]=Math.floor(255)
        data[3+4*i]=Math.floor(255)
    }
    this.context.putImageData(this.imageData,0,0)
  }
  setPixel(x: number, y: number, color:Vector4) {
    x = parseInt((x).toFixed())
    y = parseInt((y).toFixed())
    const xs = this.imageData.width//800
    const ys = this.imageData.height//400

    this.imageData.data[y*ys*4 + 4*x + 0 ] = color.x
    this.imageData.data[y*ys*4 + 4*x + 1 ] = color.y
    this.imageData.data[y*ys*4 + 4*x + 2 ] = color.z
    this.imageData.data[y*ys*4 + 4*x + 3 ] = color.w
  }
  
  // setAll() {
  //   for (let y = 0; y < 400; y++) {
  //     for (let x = 0; x < 400; x++) {
  //       this.setPixel(x, y)
  //     }
  //   }
  // }
  draw() {
    this.context.putImageData(this.imageData,0,0)
  }
}