export default class SunGL{
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D
  private imageData: ImageData
  // private buffer: Uint8ClampedArray
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.imageData = this.context.getImageData(0, 0, 800, 800);
    // this.buffer = this.imageData.data
  }
  clear() {
    const data = this.imageData.data
    // console.log(obj.data.length);//2560000= 800*800*4
    for (var i=0;i< data.length; i++) {
        data[0+4*i]=Math.floor(255)
        data[1+4*i]=Math.floor(255)
        data[2+4*i]=Math.floor(255)
        data[3+4*i]=Math.floor(255)
    }
    this.context.putImageData(this.imageData,0,0)
  }
  setPixel(x:number,y:number) {
    // console.log(x,y)
    const xs = this.imageData.width//800
    const ys = this.imageData.height//400

    this.imageData.data[y*ys*4 + 4*x + 0 ] = Math.floor( 255)
    this.imageData.data[y*ys*4 + 4*x + 1 ] = Math.floor(0)
    this.imageData.data[y*ys*4 + 4*x + 2 ] = Math.floor(0)
    this.imageData.data[y*ys*4 + 4*x + 3 ] = Math.floor(255)
  }
  setAll() {
    for (let y = 0; y < 400; y++) {
      for (let x = 0; x < 400; x++) {
        this.setPixel(x, y)
      }
    }
  }
  draw() {
    this.context.putImageData(this.imageData,0,0)
  }
}