
import { Vector2 } from "../math/Vector2";
import { Vector4 } from "../math/Vector4";
export default class Vertex {
  public position: Vector4
  public color: Vector4
  public uv?: Vector2
  constructor(position: Vector4, color: Vector4, uv: Vector2 = new Vector2(0, 0)) {
    this.position = position
    this.color = color
    this.uv = uv
  }
  clone() {
    return new Vertex(this.position.clone(), this.color.clone())
  }
  static lerp(v1: Vertex, v2: Vertex, alpha: number): Vertex {
    const tmp = new Vertex(new Vector4(), new Vector4())
    tmp.position.lerpVectors(v1, v2, alpha)
    tmp.color.lerpVectors(v1, v2, alpha)
    return tmp
  }
}