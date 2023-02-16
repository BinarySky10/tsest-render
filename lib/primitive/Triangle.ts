import { Vector2 } from '../math/Vector2'
import { Vector3 } from '../math/Vector3'
import {getBarycoord} from '../algorithm/getBarycoord'
import { computeLinePixels } from '../tools/computeLinePixels'
import SunGL from '../SunGL'
export enum TRIANGLE_MODE{
  LINE= 1,
  FILL1 = 2,
  FILL2 = 3
}
function getBoundingBox2(arr: Array<Vector2>): Array<Vector2> {
  const minPoint = arr[0].clone()
  const maxPoint = arr[0].clone()
  arr.forEach(item => {
    if (item.x < minPoint.x) {
      minPoint.x = item.x
    }
    if (item.x > maxPoint.x) {
      maxPoint.x = item.x
    }
    if (item.y < minPoint.y) {
      minPoint.y = item.y
    }
    if (item.y > maxPoint.y) {
      maxPoint.y = item.y
    }
  })
  return [minPoint, maxPoint]
  
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
    this.mode = TRIANGLE_MODE.FILL2
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
      for (let y = p2.y; y <= p1.y; y++) {
        
        const alpha = (y - p2.y) * 1.0 / (p1.y - p2.y)
        const tmp1 = new Vector2(0, 0)
        tmp1.lerpVectors(p2, p1, alpha)
        const tmp2 = new Vector2(0, 0)
        tmp2.lerpVectors(p3, p1, alpha)
        const thepixels = computeLinePixels(tmp1, tmp2)
        pixels.push(...thepixels)
      }
      return pixels
    }
    function computeTopFlatTrangle(p1:Vector2, p2:Vector2, p3:Vector2) {
      //2(3)--------3(2)
      //    \    /
      //     \  /
      //      \/
      //      1
      const pixels: Array<Vector2> = []
      for (let y = p1.y; y <= p2.y; y++) {
        
        const alpha = (y - p1.y) * 1.0 / (p2.y - p1.y)
        const tmp1 = new Vector2(0, 0)
        tmp1.lerpVectors(p1, p2, alpha)
        const tmp2 = new Vector2(0, 0)
        tmp2.lerpVectors(p1, p3, alpha)
        const thepixels = computeLinePixels(tmp1, tmp2)
        pixels.push(...thepixels)
      }
      return pixels
    }
    //扫描线法
    //1.计算三点中y坐标为中间的点, 做一条水平线 分割为上三角和下三角
    const array: Array<Vector2> = [ this.p2, this.p3, this.p1]
    array.sort((a, b) => a.y - b.y)
    if (array[1].y ===array[0].y ) {
      //上三角
      const tmp = computeBottomFlatTrangle(array[2], array[0], array[1])
      this._pixels.push(...tmp)
    } else if (array[1].y === array[2].y) {
      //倒三角
      const tmp = computeTopFlatTrangle(array[0], array[1], array[2])
      this._pixels.push(...tmp)
    } else {
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

      const tmp1 = computeBottomFlatTrangle(t, m, m0)
      this._pixels.push(...tmp1)
      const tmp2 = computeTopFlatTrangle(b, m, m0)
      this._pixels.push( ...tmp2)
      // console.log(m0)
    }
  }

  private computePixelsByFill2() {
    //重心 坐标绘制三角形
    //1.计算三角形最小包围盒
    const [minPoint, maxPoint] = getBoundingBox2([this.p2, this.p3, this.p1])
    //2. 遍历最小包围盒三角形进行绘制
    for (let x = minPoint.x; x < maxPoint.x; x++) {
      for (let y = minPoint.y; y < maxPoint.y; y++) {
        const target = new Vector3(-2 , -1,-1)
        getBarycoord(
          new Vector3(x, y, 0),
          new Vector3(this.p1.x, this.p1.y, 0),
          new Vector3(this.p2.x, this.p2.y, 0),
          new Vector3(this.p3.x, this.p3.y, 0),
          target
        )
        if (target.x >= 0 && target.y >= 0 && target.z >= 0) {
          this._pixels.push(new Vector2(x, y))
        }

      }
    }
  }
  draw(gl:SunGL) {
    this.pixels.forEach(item => {
      gl.setPixel(item.x,item.y)
    })
  }
}