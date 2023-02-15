
import './style.css'
window.VIEW_WIDTH = 800;
window.VIEW_HEIGHT = 800;
const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
canvas.width = window.VIEW_WIDTH;
canvas.height = window.VIEW_HEIGHT;

import SunGL from '../lib/SunGL'
import { Vector2 } from '../lib/math/Vector2'
import Line from '../lib/primitive/Line'
import Triangle from '../lib/primitive/Triangle'
const gl = new SunGL(canvas);
// gl.setAll()
// gl.setPixel(200,400)

// //画线
let line = new Line(new Vector2(1,  1), new Vector2(400,  700) )
line.draw(gl)
//画三角形框
// let triangle = new Triangle(new Vector2(1,  1), new Vector2(400,  700) , new Vector2(700,  500) )

// triangle.draw(gl)



gl.draw()
// gl.clear()