
import './style.css'
window.VIEW_WIDTH = 800;
window.VIEW_HEIGHT = 800;
const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
canvas.width = window.VIEW_WIDTH;
canvas.height = window.VIEW_HEIGHT;

import SunGL from '../lib/SunGL'
import { Vector2 } from '../lib/math/Vector2'
import { Vector3 } from '../lib/math/Vector3'
import { Vector4 } from '../lib/math/Vector4'
import Vertex  from '../lib/primitive/Vertex'
import Line from '../lib/primitive/Line'
import Triangle from '../lib/primitive/Triangle'
const gl = new SunGL(canvas);
// gl.setAll()
// gl.setPixel(200,400)

// //画线
// let line = new Line(new Vector2(1,  1), new Vector2(400,  700) )
// line.draw(gl)
const v1 = new Vertex(
  new Vector3(1, 1, 0),
  new Vector4(255,0,0,255)
)
const v2 = new Vertex(
  new Vector3(400, 700, 0),
  new Vector4(0,255,0,255)
)
const v3 = new Vertex(
  new Vector3(700, 500, 0),
  new Vector4(0,0,255,255)
)
//画三角形框
let triangle = new Triangle(v1, v2, v3)

triangle.draw(gl)



gl.draw()
// gl.clear()