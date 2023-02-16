import { Vector3 } from "../math/Vector3";
import { Vector4 } from "../math/Vector4";
export default class Vertex{
  public position: Vector3
  public color:Vector4
  constructor(position: Vector3, color:Vector4) {
    this.position = position
    this.color = color
  }
  clone() {
    return new Vertex(this.position.clone(), this.color.clone())
  }
  static lerp(v1: Vertex, v2: Vertex, alpha: number):Vertex {
    const tmp = new Vertex(new Vector3(), new Vector4())
    tmp.position.lerpVectors(v1,v2,alpha)
    tmp.color.lerpVectors(v1, v2, alpha)
    return tmp
  }
}