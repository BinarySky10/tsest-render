import { OrthCamera } from '../../lib/Cameras/camera'
import { Vector3 } from '../../lib/math/Vector3'
import { Vector4 } from '../../lib/math/Vector4'
import Vertex from '../../lib/primitive/Vertex'
import Scene from '../../lib/Scene'
import { RenderObject } from '../../lib/types'

export function addTriangle(scene: Scene): OrthCamera {
  const v1 = new Vertex(
    new Vector4(0, 0, 0, 1),
    new Vector4(255, 0, 0, 255)
  )
  const v2 = new Vertex(
    new Vector4(0, 200, 0, 1),
    new Vector4(0, 255, 0, 255)
  )
  const v3 = new Vertex(
    new Vector4(200, 0, 0, 1),
    new Vector4(0, 0, 255, 255)
  )

  const v4 = new Vertex(
    new Vector4(200, 200, -100, 1),
    new Vector4(128, 0, 0, 255)
  )
  const v5 = new Vertex(
    new Vector4(100, -200, -100, 1),
    new Vector4(128, 0, 0, 255)
  )
  const v6 = new Vertex(
    new Vector4(200, -100, -100, 1),
    new Vector4(128, 0, 0, 255)
  )
  const aTriangle: RenderObject = {
    vertexes: [
      v1,
      v2,
      v3,
      v4,
      v5,
      v6,
    ],
    indices: [[0, 1, 2], [3, 4, 5]]
  }
  scene.add(aTriangle)
  const camera = new OrthCamera(
    new Vector3(0, 0, 100),
    new Vector3(0, 0, -1)
  );
  return camera
}