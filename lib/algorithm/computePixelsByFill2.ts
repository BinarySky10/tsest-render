import Vertex from '../primitive/Vertex'
import { Vector3 } from '../math/Vector3'
import { Vector4 } from '../math/Vector4'
import { getBarycoord } from './getBarycoord'
import { getBoundingBox2 } from './getBoundingBox2'
import _ from 'lodash'
export function computePixelsByFill2(p1: Vertex, p2: Vertex, p3: Vertex, perFragment?: () => void): Array<Vertex> {
  const _pixels: Array<Vertex> = []
  //重心 坐标绘制三角形
  //1.计算三角形最小包围盒
  const [minPoint, maxPoint] = getBoundingBox2([p1, p2, p3])
  //2. 遍历最小包围盒三角形进行绘制
  for (let x = minPoint.x; x < maxPoint.x; x++) {
    for (let y = minPoint.y; y < maxPoint.y; y++) {
      const target = new Vector3(-2, -1, -1)
      //计算重心坐标
      getBarycoord(
        new Vector4(x, y, 0, 1),
        p1.position,//z=0
        p2.position,//z=0
        p3.position,//z=0
        target
      )
      const i = target.x
      const j = target.y
      const k = target.z
      //光栅化插值函数
      function interpolate(targetVertex: Vertex, key: string) {
        // p1
        // p2
        // p3
        // i
        // j
        // k
        //todo 类型判断
        let value1 = _.get(p1, key)
        let value2 = _.get(p2, key)
        let value3 = _.get(p3, key)

        if (typeof value1 == 'number') {
          //数字
          const z = value1 * i + value2 * j + value3 * k
          _.set(targetVertex, key, z)
        } else {
          //向量
          const p1Value = value1.clone().multiplyScalar(i)
          const p2Value = value2.clone().multiplyScalar(j)
          const p3Value = value3.clone().multiplyScalar(k)
          const targetValue = p1Value.clone().add(p2Value).add(p3Value)
          _.set(targetVertex, key, targetValue)

        }
      }
      if (i >= 0 && j >= 0 && k >= 0) {
        const tmpVertex = new Vertex(new Vector4(), new Vector4())
        tmpVertex.position.x = x
        tmpVertex.position.y = y
        tmpVertex.position.w = 1
        //深度插值 position.z
        interpolate(tmpVertex, 'position.z')
        //顶点颜色插值 color
        interpolate(tmpVertex, 'color')
        //uv插值 uv
        interpolate(tmpVertex, 'uv')

        _pixels.push(tmpVertex)
      }

    }
  }
  return _pixels
}