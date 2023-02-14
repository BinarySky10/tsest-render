import { Vector2 } from '../types'
import { computeLinePixels } from '../tools/computeLinePixels'
import SunGL from '../SunGL'
export default class Triangle{
  private p1: Vector2
  private p2:Vector2
  private p3: Vector2
  private _pixels: Array<Vector2>
  constructor(p1:Vector2, p2:Vector2,p3:Vector2) {
    this.p1 = p1
    this.p2 = p2
    this.p3 = p3
    this._pixels = []
    this.computePixels()
  }
  public get pixels(): Array<Vector2> {
    return this._pixels;
  }

  private computePixels() {
    let tmp = computeLinePixels(this.p1, this.p2)
    this._pixels.push(...tmp)
    tmp = computeLinePixels(this.p2, this.p3)
    this._pixels.push(...tmp)
    tmp = computeLinePixels(this.p3, this.p1)
    // debugger
    this._pixels.push(...tmp)
  }
  draw(gl:SunGL) {
    this.pixels.forEach(item => {
      gl.setPixel(item.x,item.y)
    })
  }
}