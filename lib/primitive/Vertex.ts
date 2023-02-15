import { Vector3 } from "../math/Vector3";
import { Vector4 } from "../math/Vector4";
export default class Vertex{
  private position: Vector3
  private color:Vector4
  constructor(position: Vector3, color:Vector4) {
    this.position = position
    this.color = color
  }
}