import "./style.css";
window.VIEW_WIDTH = 800;
window.VIEW_HEIGHT = 800;
const canvas: HTMLCanvasElement = document.getElementById(
  "canvas"
) as HTMLCanvasElement;
canvas.width = window.VIEW_WIDTH;
canvas.height = window.VIEW_HEIGHT;
const canvas2: HTMLCanvasElement = document.getElementById(
  "canvas2"
) as HTMLCanvasElement;
canvas2.width = 64;
canvas2.height = 64;
import type { RenderObject } from "../lib/types";

import SunGL from "../lib/SunGL";
import { Vector3 } from "../lib/math/Vector3";
import { Vector4 } from "../lib/math/Vector4";
import Vertex from "../lib/primitive/Vertex";
import Scene from "../lib/Scene";
import { OrthCamera } from "../lib/Cameras/camera";
import Renderer from "../lib/Renderer";
import { addTriangle } from './examples/triangles'
let myImg = new Image();
myImg.src = '../img/Snipaste_2023-03-10_17-09-50.jpg';
const textureScale = 64
let context = canvas2.getContext('2d');
myImg.onload = function () {
  console.log(myImg);
  context?.drawImage(myImg, 0, 0, textureScale, textureScale)
  const data: Uint8ClampedArray = context?.getImageData(0, 0, textureScale, textureScale).data as Uint8ClampedArray
  console.log(data.length);
}


const gl = new SunGL(canvas);

const scene = new Scene();
// {
//   //彩色立方体
//   var vertexData = [
//     100.0, 100.0, 100.0,
//     -100.0, 100.0, 100.0, -100.0, -100.0, 100.0, 100.0,
//     -100.0, 100.0, 100.0, -100.0, -100.0, 100.0, 100.0, -100.0, -100.0, 100.0,
//     -100.0, -100.0, -100.0, -100.0,
//   ];
//   var colorData = [
//     255.0, 255.0, 255.0, 255.0, 0.0, 255.0, 255.0, 0.0, 0.0, 255.0, 255.0, 0.0,
//     0.0, 255.0, 0, 0.0, 255.0, 255.0, 0.0, 0.0, 255.0, 0.0, 0.0, 0.0,
//   ];
//   // Indices of the vertices
//   var indicesData = [
//     [0, 1, 2],
//     [0, 2, 3], // front
//     [0, 3, 4],
//     [0, 4, 5], // right
//     [0, 5, 6],
//     [0, 6, 1], // up
//     [1, 6, 7],
//     [1, 7, 2], // left
//     [7, 4, 3],
//     [7, 3, 2], // down
//     [4, 7, 6],
//     [4, 6, 5], // back
//   ];

//   const aBox: RenderObject = {
//     vertexes: [],
//     indices: [],
//   };
//   for (let i = 0; i < vertexData.length / 3.0; i++) {
//     // i * 3
//     // i * 3 + 1
//     // i * 3 + 2
//     const position = new Vector4(
//       vertexData[i * 3],
//       vertexData[i * 3 + 1],
//       vertexData[i * 3 + 2],
//       1
//     );
//     const color = new Vector4(
//       colorData[i * 3],
//       colorData[i * 3 + 1],
//       colorData[i * 3 + 2],
//       255
//     );
//     aBox.vertexes.push(new Vertex(position, color));
//   }

//   aBox.indices.push(...indicesData);
//   scene.add(aBox);

// }






// {
//   //纹理映射
//   const v1 = new Vertex(
//     new Vector4(0, 0, 0, 1),
//     new Vector4(255, 0, 0, 255)
//   )
//   const v2 = new Vertex(
//     new Vector4(0, 200, 0, 1),
//     new Vector4(0, 255, 0, 255)
//   )
//   const v3 = new Vertex(
//     new Vector4(200, 0, 0, 1),
//     new Vector4(0, 0, 255, 255)
//   )

//   const v4 = new Vertex(
//     new Vector4(200, 200, -100, 1),
//     new Vector4(128, 0, 0, 255)
//   )
//   const v5 = new Vertex(
//     new Vector4(100, -200, -100, 1),
//     new Vector4(128, 0, 0, 255)
//   )
//   const v6 = new Vertex(
//     new Vector4(200, -100, -100, 1),
//     new Vector4(128, 0, 0, 255)
//   )
//   const aTriangle: RenderObject = {
//     vertexes: [
//       v1,
//       v2,
//       v3,
//       v4,
//       v5,
//       v6,
//     ],
//     indices: [[0, 1, 2], [3, 4, 5]]
//   }
//   scene.add(aTriangle)
// }
// const camera = new OrthCamera(
//   new Vector3(0, 0, 100),
//   new Vector3(0, 0, -1)
// );
const camera = addTriangle(scene)
const renderer = new Renderer(scene, camera, gl);

window.angle = 0;
let d = 0.01;
function loop() {
  renderer.render();
  // window.angle+=d
  requestAnimationFrame(() => {
    loop();
  });
}

loop();
