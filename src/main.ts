
import './style.css'
window.VIEW_WIDTH = 800;
window.VIEW_HEIGHT = 800;
const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
canvas.width = window.VIEW_WIDTH;
canvas.height = window.VIEW_HEIGHT;
import type { RenderObject } from '../lib/types'

import SunGL from '../lib/SunGL'
import { Vector2 } from '../lib/math/Vector2'
import { Vector3 } from '../lib/math/Vector3'
import { Vector4 } from '../lib/math/Vector4'
import Vertex  from '../lib/primitive/Vertex'
import Line from '../lib/primitive/Line'
import Triangle from '../lib/primitive/Triangle'
import Scene from '../lib/Scene'
import { OrthCamera } from '../lib/Cameras/camera'
import Renderer from '../lib/Renderer'

const gl = new SunGL(canvas);
// gl.setAll()
// gl.setPixel(200,400)

// //画线
// let line = new Line(new Vector2(1,  1), new Vector2(400,  700) )
// line.draw(gl)



{
  const v1 = new Vertex(
    new Vector4(600, 600, 0,1),
    new Vector4(255,0,0,255)
  )
  const v2 = new Vertex(
    new Vector4(200, 600, 0,1),
    new Vector4(0,255,0,255)
  )
  const v3 = new Vertex(
    new Vector4(700, 200, 0,1),
    new Vector4(0,0,255,255)
  )
  //画三角形框
  let triangle = new Triangle(v1, v2, v3)
  triangle.computePixels()
  triangle.draw(gl)
}

const scene = new Scene()
const v1 = new Vertex(
  new Vector4(600, 600, 0,1),
  new Vector4(255,0,0,255)
)
const v2 = new Vertex(
  new Vector4(200, 600, 0,1),
  new Vector4(0,255,0,255)
)
const v3 = new Vertex(
  new Vector4(700, 200, 0,1),
  new Vector4(0,0,255,255)
)

const aTriangle:RenderObject ={
  vertexes: [
    v1,
    v2,
    v3
  ]
}
scene.add(aTriangle)
const camera = new OrthCamera(
  new Vector3(0, 0, 1),
  new Vector3(0, 0, -1),
)
const renderer = new Renderer(scene, camera)
renderer.render()


gl.draw()
// gl.clear()