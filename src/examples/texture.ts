import { OrthCamera } from '../../lib/Cameras/camera'
import { Vector2 } from '../../lib/math/Vector2'
import { Vector3 } from '../../lib/math/Vector3'
import { Vector4 } from '../../lib/math/Vector4'
import Vertex from '../../lib/primitive/Vertex'
import Scene from '../../lib/Scene'
import { Texture } from '../../lib/texture/Texture'
import { RenderObject } from '../../lib/types'

export function addTexture(scene: Scene, texture: Texture): OrthCamera {
  const v1 = new Vertex(
    new Vector4(0, 0, 0, 1),
    new Vector4(255, 0, 0, 255),
    new Vector2(0, 0)
  )
  const v2 = new Vertex(
    new Vector4(0, 200, 0, 1),
    new Vector4(0, 255, 0, 255),
    new Vector2(0, 1)
  )
  const v3 = new Vertex(
    new Vector4(200, 0, 0, 1),
    new Vector4(0, 0, 255, 255),
    new Vector2(1, 0)
  )

  const v4 = new Vertex(
    new Vector4(200, 200, 0, 1),
    new Vector4(128, 0, 0, 255),
    new Vector2(1, 1)
  )
  const aTriangle: RenderObject = {
    vertexes: [
      v1,
      v2,
      v3,
      v4,
    ],
    indices: [[0, 1, 2], [1, 2, 3]],
    textures: [texture]
  }
  scene.add(aTriangle)
  const camera = new OrthCamera(
    new Vector3(0, 0, 100),
    new Vector3(0, 0, -1)
  );
  return camera
}