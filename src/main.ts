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
const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
canvas.width = 800;
canvas.height = 800;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
//绘制矩形
// ctx.fillStyle = 'green';
// ctx.fillRect(10, 10, 150, 100);
var myImageData = ctx.createImageData(800, 800) as ImageData;

function drawPoint(x:number,y:number){
  //绘制点
  let index = ((x >> 0) + (y >> 0) * 800 /*width */) * 4;
  myImageData.data[index] = 0;//r
  myImageData.data[index + 1] = 0;//g
  myImageData.data[index + 2] = 0;//b
  myImageData.data[index + 3] = 1;//a
}

for (let i = 0; i < 10; i++) {
  drawPoint(i*0.01,i*0.02)
}
ctx.putImageData(myImageData,0,0);
