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
const VIEW_WIDTH = 800;
const VIEW_HEIGHT = 800;
const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
canvas.width = VIEW_WIDTH;
canvas.height = VIEW_HEIGHT;



var ctx=canvas.getContext("2d");
var obj=ctx.getImageData(0,0,800,800);

console.log(obj.data.length);//2560000= 800*800*4
for (var i=0;i< obj.data.length; i++) {
    obj.data[0+4*i]=Math.floor(Math.random()*255)
    obj.data[1+4*i]=Math.floor(Math.random()*255)
    obj.data[2+4*i]=Math.floor(Math.random()*255)
    obj.data[3+4*i]=Math.floor(Math.random()*255)
}
ctx.putImageData(obj,0,0)
