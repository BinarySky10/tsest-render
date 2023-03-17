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
import { Texture, sampler } from '../lib/texture/Texture'
import { addTriangle } from './examples/triangles'
import { addColorCube } from './examples/colorCube'
import { addTexture } from './examples/texture'


const gl = new SunGL(canvas);

const scene = new Scene();


// const camera = addTriangle(scene)
// const camera = addColorCube(scene)
let theTexture: Texture | undefined = undefined

let myImg = new Image();
myImg.src = '../lib/assets/img/circle.jpg';
const textureScale = 64
let context = canvas2.getContext('2d');
myImg.onload = function () {
  console.log(myImg);
  context?.drawImage(myImg, 0, 0, textureScale, textureScale)
  const data: Uint8ClampedArray = context?.getImageData(0, 0, textureScale, textureScale).data as Uint8ClampedArray
  theTexture = new Texture(canvas2, data)
}
setTimeout(() => {
  const camera = addTexture(scene, theTexture)
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
}, 3000)

