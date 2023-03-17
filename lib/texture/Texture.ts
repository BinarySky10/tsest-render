import { Vector4 } from '../math/Vector4'
const textureScale = 64.0
export function sampler(texture: Texture, u: number, v: number) {
  //坐标四舍五入 类似于最近邻
  const x = Math.round(textureScale * u)
  const y = Math.round(textureScale * v)

  const ys = y * textureScale
  const r = texture.data[y * ys * 4 + 4 * x + 0]
  const g = texture.data[y * ys * 4 + 4 * x + 1]
  const b = texture.data[y * ys * 4 + 4 * x + 2]
  const a = texture.data[y * ys * 4 + 4 * x + 3]
  return new Vector4(r, g, b, a)
}
export class Texture {
  private canvas: HTMLCanvasElement;
  public data: Uint8ClampedArray
  constructor(canvas, data) {
    this.canvas = canvas
    this.data = data
  }
}