import { Vector2 } from '../types'
import SunGL from '../SunGL'
import { computeLinePixels } from '../tools/computeLinePixels'
export default class Line{
  private start: Vector2
  private end: Vector2
  private _pixels: Array<Vector2>
  constructor(start: Vector2, end: Vector2) {
    this.start = start
    this.end = end
    this._pixels = computeLinePixels(this.start, this.end)
  }
  public get pixels(): Array<Vector2> {
    return this._pixels;
  }

  // private computePixels() {
  //   let xd = this.end.x - this.start.x;
  //   let yd = this.end.y - this.start.y;
  //   if (xd == 0) {
  //     for (let i = 0; i <= xd; i++) {
  //       this._pixels.push(
  //         {
  //           x:this.start.x,
  //           y: parseInt((this.start.y + i).toFixed())
  //         }
  //       )
        
  //     }
  //   } else {
      
  //     //斜率  小数
  //     let k = (yd * 1.0) / (xd * 1.0)
      
  //     for (let i = 0; i <= xd; i++) {
  //       this._pixels.push(
  //         {
  //           x:this.start.x + i,
  //           y: parseInt((this.start.y + k*i).toFixed())
  //         }
  //       )
        
  //     }
  //   }
  // }
  
  draw(gl:SunGL) {
    this.pixels.forEach(item => {
      gl.setPixel(item.x,item.y)
    })
  }
}