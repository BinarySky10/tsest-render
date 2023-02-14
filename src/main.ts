
import './style.css'
window.VIEW_WIDTH = 800;
window.VIEW_HEIGHT = 800;
const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
canvas.width = window.VIEW_WIDTH;
canvas.height = window.VIEW_HEIGHT;

import SunGL from '../lib/SunGL'
import Line from '../lib/primitive/Line'
import Triangle from '../lib/primitive/Triangle'
const gl = new SunGL(canvas);
// gl.setAll()
// gl.setPixel(200,400)

//画线
let line = new Line({ x: 1, y: 1 }, { x: 400, y: 700 })
line.draw(gl)
//画三角形
let triangle = new Triangle({ x: 1, y: 1 }, { x: 400, y: 700 }, { x: 700, y: 500 } )
triangle.draw(gl)

gl.draw()
// gl.clear()