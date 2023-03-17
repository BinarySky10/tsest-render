
import Vertex from '../primitive/Vertex'
import { computePixelsByFill2 } from '../algorithm/computePixelsByFill2'
import SunGL from '../SunGL'
import { Vector4 } from '../math/Vector4'

export enum TRIANGLE_MODE {
  LINE = 1,
  FILL1 = 2,
  FILL2 = 3
}

export default class Triangle {
  private p1: Vertex
  private p2: Vertex
  private p3: Vertex
  private _pixels: Array<Vertex>

  public mode: TRIANGLE_MODE
  constructor(p1: Vertex, p2: Vertex, p3: Vertex) {
    this.p1 = p1
    this.p2 = p2
    this.p3 = p3
    this._pixels = []
    this.mode = TRIANGLE_MODE.FILL2
    // this.computePixels()
  }
  public get pixels(): Array<Vertex> {
    return this._pixels;
  }

  public computePixels(getColor: (u: number, v: number) => Vector4) {
    switch (this.mode) {
      case TRIANGLE_MODE.LINE:
        // this.computePixelsByLine()
        break;
      case TRIANGLE_MODE.FILL1:
        // this.computePixelsByFill1()
        break;
      case TRIANGLE_MODE.FILL2:
        this._pixels = computePixelsByFill2(this.p1, this.p2, this.p3, getColor)
        break;
      default:
        break;
    }

  }


  draw(gl: SunGL) {
    this.pixels.forEach(item => {
      gl.setPixel(item.position.x, item.position.y, item.position.z, item.color)
    })

  }
}