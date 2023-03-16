import Vertex from '../primitive/Vertex'
import { Vector3 } from '../math/Vector3'
import { Vector4 } from '../math/Vector4'
import { getBarycoord } from './getBarycoord'
import { getBoundingBox2 } from './getBoundingBox2'
export function computePixelsByFill2(p1: Vertex, p2: Vertex, p3: Vertex, perFragment?:()=> void): Array<Vertex> {
  const _pixels:Array<Vertex> = []
  //重心 坐标绘制三角形
  //1.计算三角形最小包围盒
  const [minPoint, maxPoint] = getBoundingBox2([p1,p2, p3 ])
  //2. 遍历最小包围盒三角形进行绘制
  for (let x = minPoint.x; x < maxPoint.x; x++) {
    for (let y = minPoint.y; y < maxPoint.y; y++) {
      const target = new Vector3(-2, -1, -1)
      //计算重心坐标
      getBarycoord(
        new Vector4(x, y, 0,1),
        p1.position,//z=0
        p2.position,//z=0
        p3.position,//z=0
        target
      )
      const i =  target.x
      const j =  target.y
      const k =  target.z
      if (i >= 0 && j >= 0 && k >= 0) {
        const tmpVertex = new Vertex(new Vector4(), new Vector4())
        tmpVertex.position.x = x
        tmpVertex.position.y = y
        tmpVertex.position.w = 1
        //深度插值
        const p1Z = p1.position.z* i
        const p2Z = p2.position.z* j
        const p3Z = p3.position.z* k
        
        tmpVertex.position.z = p1Z + p2Z + p3Z
        
        //顶点颜色插值
        const p1color = p1.color.clone().multiplyScalar(i)
        const p2color = p2.color.clone().multiplyScalar(j)
        const p3color = p3.color.clone().multiplyScalar(k)
        const tmpcolor = new Vector4()
        tmpVertex.color = tmpcolor.add(p1color).add(p2color).add(p3color)
        
        _pixels.push(tmpVertex)
      }

    }
  }
  return _pixels
}