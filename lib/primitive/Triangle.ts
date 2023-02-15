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
    
    function computeBottomFlatTrangle(p1:Vector2, p2:Vector2, p3:Vector2):Array<Vector2> {
      const pixels: Array<Vector2> = []
      //        1
      //       /\
      //      /  \
      //     /    \
      //2(3)--------3(2)
      // debugger
      for (let y = p2.y; y < p1.y; y++) {
        
        const alpha = (y - p2.y) * 1.0 / (p1.y - p2.y)
        const tmp1 = new Vector2(0, 0)
        tmp1.lerpVectors(p2, p1, alpha)
        const tmp2 = new Vector2(0, 0)
        tmp2.lerpVectors(p3, p1, alpha)
        const thepixels = computeLinePixels(tmp1, tmp2)
        pixels.push(...thepixels)
        // console.log('y', y);
        // console.log('pixels', thepixels)
      }
      return pixels
    }
    function computeTopFlatTrangle(p1:Vector2, p2:Vector2, p3:Vector2) {
      //2(3)--------3(2)
      //    \    /
      //     \  /
      //      \/
      //      1
    }
    //扫描线法
    //1.计算三点中y坐标为中间的点, 做一条水平线 分割为上三角和下三角
    const array: Array<Vector2> = [ this.p2, this.p3, this.p1]
    array.sort((a, b) => a.y - b.y)
    if (array[1].y ===array[0].y ) {
      //上三角
      const tmp = computeBottomFlatTrangle(array[2], array[0], array[1])
      this._pixels.push(...tmp)
    } else if (array[1].y ===array[2].y) {
      //倒三角

    }else {
      // array[1]就是中点
      //2. 确定中点后,做一条水平的线,确定线在对边上交点
      const b = array[0] //低点
      const m = array[1] //中点
      const t = array[2] //高点
      //array[0] array[2]  直线方程 带入s1y坐标 求得交点
      
      const y0 = m.y
      let alpha = (y0 - b.y)*1.0 / (t.y - b.y)
      const m0 = new Vector2(0, 0)
      m0.lerpVectors(b, t, alpha)

      // computeBottomFlatTrangle()
      // computeTopFlatTrangle()
      // console.log(m0)
    }
  }

  private computePixelsByFill2() {
  }
  draw(gl:SunGL) {
    this.pixels.forEach(item => {
      // console.log(item)
      gl.setPixel(item.x,item.y)
    })
  }
}