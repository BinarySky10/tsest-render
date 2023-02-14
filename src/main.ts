interface Vector2  {
  x: number,
  y: number
}
interface Line {
  start: Vector2,
  end: Vector2
}
function getLine():Line {
  const p1:Vector2 = {
    x: 100,
    y: 100
  }
  const p2:Vector2 = {
    x: 500,
    y: 600
  }
  return {
    start: p1,
    end: p2
  }
}



import './style.css'
window.VIEW_WIDTH = 800;
window.VIEW_HEIGHT = 800;
const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
canvas.width = window.VIEW_WIDTH;
canvas.height = window.VIEW_HEIGHT;

import SunGL from '../lib/SunGL'

const gl = new SunGL(canvas);
gl.setAll()
gl.draw()
// gl.clear()