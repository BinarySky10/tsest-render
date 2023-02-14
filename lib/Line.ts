import {Vector2} from './types'
export default class Line{
  private start: Vector2
  private end: Vector2
  private _pixels: Array<Vector2>
  constructor(start: Vector2, end: Vector2) {
    this.start = start
    this.end = end
    this._pixels = []
    this.computePixels()
  }
  public get pixels(): Array<Vector2> {
    return this._pixels;
  }

  computePixels() {
    let xd = this.end.x - this.start.x;
    let yd = this.end.y - this.start.y;
    if (xd == 0) {
      for (let i = 0; i <= xd; i++) {
        this._pixels.push(
          {
            x:this.start.x,
            y: parseInt((this.start.y + i).toFixed())
          }
        )
        
      }
    } else {
      
      //斜率  小数
      let k = (yd * 1.0) / (xd * 1.0)
      
      for (let i = 0; i <= xd; i++) {
        this._pixels.push(
          {
            x:this.start.x + i,
            y: parseInt((this.start.y + k*i).toFixed())
          }
        )
        
      }
    }
  }
  
}