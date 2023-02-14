import { Vector2 } from '../types'
export function computeLinePixels(start: Vector2, end: Vector2) {
  //start end 哪个点在右
  let l = 1
  if (start.x >end.x) {
    l = -1
  }
  const _pixels = new Array<Vector2>;
  let xd = end.x - start.x;
  let yd = end.y - start.y;
  if (xd == 0) {
    for (let i = 0; i <= xd; i++) {
      _pixels.push(
        {
          x: start.x,
          y: parseInt((start.y + i).toFixed())
        }
      )
      
    }
  } else {
    
    //斜率  小数
    let k = (yd * 1.0) / (xd * 1.0)
    
    for (let i = 0; i <= Math.abs(xd); i++) {
      _pixels.push(
        {
          x:start.x + l*i,
          y: parseInt((start.y + k*l*i).toFixed())
        }
      )
      
    }
  }
  return _pixels
}