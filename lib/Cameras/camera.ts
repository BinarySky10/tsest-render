import { Matrix4 } from '../math/Matrix4'

import { Vector3 } from '../math/Vector3'
let tmpVector = new Vector3()
function getViewMatrix(position: Vector3, lookat: Vector3, up: Vector3): Matrix4 {
  const viewMatrix = new Matrix4()
  //1.计算 uvw轴方向
  //w轴方向(相当于z轴)为相机注视方向(g)的反方向(约定俗称)
  const w: Vector3 = lookat.clone().negate().normalize()
  //u轴方向(相当于x轴)为上方向(t)和w轴方向的垂直向量(由txw 获得),
  const u: Vector3 = tmpVector.crossVectors(up, w).normalize()
  //v轴方向由(由wxu 获得)
  const v: Vector3 = tmpVector.crossVectors(w, u).normalize()
  //2.代入矩阵
  //M视图=
  // xu yu zu -xe
  // xv yv zv -ye
  // xw yw zw -ze
  // 0   0  0 1
  const n11 = u.x
  const n12 = u.y
  const n13 = u.z
  const n14 = -position.x
  const n21 = v.x
  const n22 = v.y
  const n23 = v.z
  const n24 = -position.y
  const n31 = w.x
  const n32 = w.y
  const n33 = w.z
  const n34 = -position.z
  const n41 = 0
  const n42 = 0
  const n43 = 0
  const n44 = 1
  viewMatrix.set(
    n11, n12, n13, n14,
    n21, n22, n23, n24,
    n31, n32, n33, n34,
    n41, n42, n43, n44
  )
  return viewMatrix
}

function getOrthProjectMatrix(width: number, height: number, near: number, far:number): Matrix4 {
  const matrix = new Matrix4()
  const l = -width / 2.0
  const r = width / 2.0
  const b = -height / 2.0
  const t = height / 2.0
  const n = near
  const f = far
  //   Morth=
  // 2/(r-l)     0       0      -(r+l)/(r-l)
  // 0         2/(t-b)  0      -(t+b)/(t-b)
  // 0           0   2/(n-f)   -(n+f)/(n-f)
  // 0           0       0             1

  const n11 = 2.0/(r-l)
  const n12 = 0
  const n13 = 0
  const n14 = -(r+l+0.0)/(r-l)
  const n21 = 0
  const n22 = 2.0/(t-b)
  const n23 = 0
  const n24 = -(t+b+0.0)/(t-b)
  const n31 = 0
  const n32 = 0
  const n33 = 2.0/(n-f)
  const n34 = -(n+f+0.0)/(n-f)
  const n41 = 0
  const n42 = 0
  const n43 = 0
  const n44 = 1
  matrix.set(
    n11, n12, n13, n14,
    n21, n22, n23, n24,
    n31, n32, n33, n34,
    n41, n42, n43, n44
  )
  return matrix
}

// window.VIEW_WIDTH = 800;
// window.VIEW_HEIGHT = 800;
function getViewPortMatrix(x:number =window.VIEW_WIDTH, y:number =window.VIEW_HEIGHT ): Matrix4 {
  const matrix = new Matrix4()
  //   nx/2    0       0      (nx-1)/2
  // 0         ny/2  0      (ny-1)/2
  // 0           0     1            0
  // 0           0       0             1
  const n11 = x/2.0
  const n12 = 0
  const n13 = 0
  const n14 = (x-1)/2.0
  const n21 = 0
  const n22 = y/2.0
  const n23 = 0
  const n24 = (y -1)/2.0
  const n31 = 0
  const n32 = 0
  const n33 = 1
  const n34 = 0
  const n41 = 0
  const n42 = 0
  const n43 = 0
  const n44 = 1
  matrix.set(
    n11, n12, n13, n14,
    n21, n22, n23, n24,
    n31, n32, n33, n34,
    n41, n42, n43, n44
  )
  return matrix
}
export class OrthCamera {
  //e
  position: Vector3
  //gaze
  lookat: Vector3
  //t
  up: Vector3
  //视锥
  width: number
  height: number
  near: number
  far:number
  //视图变换矩阵
  matrix: Matrix4
  projectMatrix: Matrix4
  viewPortMatrix: Matrix4
  constructor(
    position: Vector3 = new Vector3(0, 0, 0),
    lookat: Vector3 = new Vector3(0, 0, -1),
  ) {
    this.up = new Vector3(0, 1, 0)
    this.position = position
    this.lookat = lookat
    this.matrix = getViewMatrix(this.position, this.lookat, this.up)

    this.width = 800.0
    this.height = 800.0
    this.near = 0
    this.far = 800.0
    this.projectMatrix = getOrthProjectMatrix(this.width,this.height, this.near,this.far)
    this.viewPortMatrix = getViewPortMatrix()
  }
}
// class Camera {
//   //e
//   position: Vector3
//   //gaze
//   lookat: Vector3
//   //t
//   up: Vector3
//   matrix: Matrix4
//   constructor(
//     position: Vector3 = new Vector3(0, 0, 0),
//     lookat: Vector3 = new Vector3(0, 0, -1),
//   ) {
//     this.up = new Vector3(0, 1, 0)
//     this.position = position
//     this.lookat = lookat
//     this.matrix = getViewMatrix(this.position, this.lookat, this.up)
//   }
// }