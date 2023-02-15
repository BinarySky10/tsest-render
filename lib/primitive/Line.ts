import { Vector2 } from '../math/Vector2'
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

  
  draw(gl:SunGL) {
    this.pixels.forEach(item => {
      gl.setPixel(item.x,item.y)
    })
  }
}