import { OrthCamera } from "../../lib/Cameras/camera";
import { Vector3 } from "../../lib/math/Vector3";
import { Vector4 } from "../../lib/math/Vector4";
import Vertex from "../../lib/primitive/Vertex";
import Scene from "../../lib/Scene";
import { RenderObject } from "../../lib/types";

export function addColorCube(scene: Scene): OrthCamera {
  //彩色立方体
  var vertexData = [
    100.0, 100.0, 100.0,
    -100.0, 100.0, 100.0, -100.0, -100.0, 100.0, 100.0,
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
  const camera = new OrthCamera(
    new Vector3(200, 200, 200),
    new Vector3(-1, -1, -1)
  );
  return camera
}