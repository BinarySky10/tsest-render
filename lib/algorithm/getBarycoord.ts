// calculate barycentric coordinates 计算重心坐标
// based on: http://www.blackpawn.com/texts/pointinpoly/default.html
import { Vector3 } from "../math/Vector3";
export function getBarycoord(point: Vector3, a: Vector3, b: Vector3, c: Vector3, target: Vector3) {
  const _v0 = new Vector3()
  const _v1 = new Vector3()
  const _v2 = new Vector3()
  _v0.subVectors(c, a);
  _v1.subVectors(b, a);
  _v2.subVectors(point, a);

  const dot00 = _v0.dot(_v0);
  const dot01 = _v0.dot(_v1);
  const dot02 = _v0.dot(_v2);
  const dot11 = _v1.dot(_v1);
  const dot12 = _v1.dot(_v2);

  const denom = (dot00 * dot11 - dot01 * dot01);

  // collinear or singular triangle
  if (denom === 0) {

    // arbitrary location outside of triangle?
    // not sure if this is the best idea, maybe should be returning undefined
    return target.set(- 2, - 1, - 1);

  }

  const invDenom = 1 / denom;
  const u = (dot11 * dot02 - dot01 * dot12) * invDenom;
  const v = (dot00 * dot12 - dot01 * dot02) * invDenom;

  // barycentric coordinates must always sum to 1
  return target.set(1 - u - v, v, u);

}