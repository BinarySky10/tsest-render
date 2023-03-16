import "./style.css";
window.VIEW_WIDTH = 800;
window.VIEW_HEIGHT = 800;
const canvas: HTMLCanvasElement = document.getElementById(
  "canvas"
) as HTMLCanvasElement;
canvas.width = window.VIEW_WIDTH;
canvas.height = window.VIEW_HEIGHT;
import type { RenderObject } from "../lib/types";

import SunGL from "../lib/SunGL";
import { Vector2 } from "../lib/math/Vector2";
import { Vector3 } from "../lib/math/Vector3";
import { Vector4 } from "../lib/math/Vector4";
import Vertex from "../lib/primitive/Vertex";
import Line from "../lib/primitive/Line";
import Triangle from "../lib/primitive/Triangle";
import Scene from "../lib/Scene";
import { OrthCamera } from "../lib/Cameras/camera";
import Renderer from "../lib/Renderer";

const gl = new SunGL(canvas);
// gl.setAll()
// gl.setPixel(200,400)

// //画线
// let line = new Line(new Vector2(1,  1), new Vector2(400,  700) )
// line.draw(gl)

// {
//   const v1 = new Vertex(
//     new Vector4(600, 600, 0,1),
//     new Vector4(255,0,0,255)
//   )
//   const v2 = new Vertex(
//     new Vector4(200, 600, 0,1),
//     new Vector4(0,255,0,255)
//   )
//   const v3 = new Vertex(
//     new Vector4(700, 200, 0,1),
//     new Vector4(0,0,255,255)
//   )
//   //画三角形框
//   let triangle = new Triangle(v1, v2, v3)
//   triangle.computePixels()
//   triangle.draw(gl)
// }

const scene = new Scene();

var vertexData = [
  100.0, 100.0, 100.0, -100.0, 100.0, 100.0, -100.0, -100.0, 100.0, 100.0,
  -100.0, 100.0, 100.0, -100.0, -100.0, 100.0, 100.0, -100.0, -100.0, 100.0,
  -100.0, -100.0, -100.0, -100.0,
];
var colorData = [
  255.0, 255.0, 255.0, 255.0, 0.0, 255.0, 255.0, 0.0, 0.0, 255.0, 255.0, 0.0,
  0.0, 255.0, 0, 0.0, 255.0, 255.0, 0.0, 0.0, 255.0, 0.0, 0.0, 0.0,
];
// Indices of the vertices
var indicesData = [
  [0, 1, 2],
  [0, 2, 3], // front
  [0, 3, 4],
  [0, 4, 5], // right
  [0, 5, 6],
  [0, 6, 1], // up
  [1, 6, 7],
  [1, 7, 2], // left
  [7, 4, 3],
  [7, 3, 2], // down
  [4, 7, 6],
  [4, 6, 5], // back
];
// var indicesData = [
//   [1, 7, 2],
//   [0, 1, 2],
// ];
const aBox: RenderObject = {
  vertexes: [],
  indices: [],
};
for (let i = 0; i < vertexData.length / 3.0; i++) {
  // i * 3
  // i * 3 + 1
  // i * 3 + 2
  const position = new Vector4(
    vertexData[i * 3],
    vertexData[i * 3 + 1],
    vertexData[i * 3 + 2],
    1
  );
  const color = new Vector4(
    colorData[i * 3],
    colorData[i * 3 + 1],
    colorData[i * 3 + 2],
    255
  );
  aBox.vertexes.push(new Vertex(position, color));
}

aBox.indices.push(...indicesData);
scene.add(aBox);

// const v1 = new Vertex(
//   new Vector4(0, 0, 0, 1),
//   new Vector4(255, 0, 0, 255)
// )
// const v2 = new Vertex(
//   new Vector4(0, 200, 0, 1),
//   new Vector4(0, 255, 0, 255)
// )
// const v3 = new Vertex(
//   new Vector4(200, 0, 0, 1),
//   new Vector4(0, 0, 255, 255)
// )

// const v4 = new Vertex(
//   new Vector4(200, 200, -100, 1),
//   new Vector4(128, 0, 0, 255)
// )
// const v5 = new Vertex(
//   new Vector4(100, -200, -100, 1),
//   new Vector4(128, 0, 0, 255)
// )
// const v6 = new Vertex(
//   new Vector4(200, -100, -100, 1),
//   new Vector4(128, 0, 0, 255)
// )
// const aTriangle: RenderObject = {
//   vertexes: [
//     v1,
//     v2,
//     v3,
//     v4,
//     v5,
//     v6,
//   ],
//   indices: [[0, 1, 2], [3, 4, 5]]
// }
// scene.add(aTriangle)

// const camera = new OrthCamera(
//   new Vector3(0, 0, 1000),
//   new Vector3(0, 0, -1),
// )
const camera = new OrthCamera(
  new Vector3(200, 200, 200),
  new Vector3(-1, -1, -1)
);
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
