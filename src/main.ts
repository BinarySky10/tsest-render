
import './style.css'
window.VIEW_WIDTH = 800;
window.VIEW_HEIGHT = 800;
const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
canvas.width = window.VIEW_WIDTH;
canvas.height = window.VIEW_HEIGHT;

import SunGL from '../lib/SunGL'
import {Vector2} from '../lib/types'
import Line from '../lib/Line'
const gl = new SunGL(canvas);
// gl.setAll()
// gl.setPixel(200,400)

let line = new Line({ x: 1, y: 1 }, { x: 400, y: 700 })
console.log(line.pixels)
line.pixels.forEach(item => {
  gl.setPixel(item.x,item.y)
})

gl.draw()
// gl.clear()