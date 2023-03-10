import { Vector2 } from '../math/Vector2'
import Vertex from '../primitive/Vertex'
export function getBoundingBox2(arr: Array<Vertex>): Array<Vector2> {
  const minPoint = new Vector2(arr[0].position.x, arr[0].position.y)
  const maxPoint = new Vector2(arr[0].position.x, arr[0].position.y)
  arr.forEach(item => {
    if (item.position.x < minPoint.x) {
      minPoint.x = item.position.x
    }
    if (item.position.x > maxPoint.x) {
      maxPoint.x = item.position.x
    }
    if (item.position.y < minPoint.y) {
      minPoint.y = item.position.y
    }
    if (item.position.y > maxPoint.y) {
      maxPoint.y = item.position.y
    }
  })
  return [minPoint, maxPoint]
  
}