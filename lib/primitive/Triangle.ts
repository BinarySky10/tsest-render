import { Vector2 } from '../math/Vector2'
import { computeLinePixels } from '../tools/computeLinePixels'
import SunGL from '../SunGL'
export enum TRIANGLE_MODE{
  LINE= 1,
  FILL1 = 2,
  FILL2 = 3
}
export default class Triangle{
  private p1: Vector2
  private p2:Vector2
  private p3: Vector2
  private _pixels: Array<Vector2>

  public mode:TRIANGLE_MODE
  constructor(p1:Vector2, p2:Vector2,p3:Vector2) {
    this.p1 = p1
    this.p2 = p2
    this.p3 = p3
    this._pixels = []
    this.mode = TRIANGLE_MODE.FILL1
    this.computePixels()
  }
  public get pixels(): Array<Vector2> {
    return this._pixels;
  }
  
  private computePixels() {
    switch (this.mode) {
      case TRIANGLE_MODE.LINE:
          this.computePixelsByLine()
        break;
      case TRIANGLE_MODE.FILL1:
        this.computePixelsByFill1()
        break;
      case TRIANGLE_MODE.FILL2:
        this.computePixelsByFill2()
        break;
      default:
        break;
    }
    
  }
  private computePixelsByLine() {
    let tmp = computeLinePixels(this.p1, this.p2)
    this._pixels.push(...tmp)
    tmp = computeLinePixels(this.p2, this.p3)
    this._pixels.push(...tmp)
    tmp = computeLinePixels(this.p3, this.p1)
    this._pixels.push(...tmp)
  }
  private computePixelsByFill1() {
    //扫描线法
    // this.p1 = p1
    // this.p2 = p2
    // this.p3 = p3
    //1.计算三点中y坐标为中间的点, 做一条水平线
    const array: Array<Vector2> = [ this.p2, this.p3, this.p1]
    array.sort((a, b) => a.y - b.y)
    if (array[1].y ===array[0].y || array[1].y ===array[2].y) {
      //无中点
    } else {
      // array[1]就是中点
      //2. 确定中点后,做一条水平的线,确定线在对边上交点
      const s1 = array[1] 
      //array[0] array[2]  直线方程 带入s1y坐标 求得交点
      
    }

  }
  private computePixelsByFill2() {
  }
  draw(gl:SunGL) {
    this.pixels.forEach(item => {
      gl.setPixel(item.x,item.y)
    })
  }
}