import { OrthCamera } from './Cameras/camera';
import { Matrix4 } from './math/Matrix4'
import Scene from './Scene'
import Vertex from '../lib/primitive/Vertex'
import { computePixelsByFill2 } from './algorithm/computePixelsByFill2'
import Triangle from './primitive/Triangle'
import SunGL from './SunGL'
function getmodelMatrix() {
  // window.angle
  const matrix = new Matrix4()
  // cos(anlge) -sin(anlge)       0      0
  // sin(anlge) cos(anlge)        0      0
  // 0           0                1      0
  // 0           0                0      1
  const n11 = Math.cos(window.angle)
  const n12 = -Math.sin(window.angle)
  const n13 = 0
  const n14 = 0
  const n21 = Math.sin(window.angle)
  const n22 = Math.cos(window.angle)
  const n23 = 0
  const n24 = 0
  const n31 = 0
  const n32 = 0
  const n33 = 1
  const n34 = 0
  const n41 = 0
  const n42 = 0
  const n43 = 0
  const n44 = 1
  matrix.set(
    n11, n12, n13, n14,
    n21, n22, n23, n24,
    n31, n32, n33, n34,
    n41, n42, n43, n44
  )
  return matrix
}
export default class Renderer{
  scene: Scene
  camera: OrthCamera
  gl:SunGL
  constructor(scene:Scene, camera:OrthCamera, gl:SunGL) {
    this.scene = scene
    this.camera = camera
    this.gl = gl
  }
  render() {
    this.gl.clear()
    this.scene.object.forEach(item => {
      //TODO  
      //1.顶点着色器-----逐顶点处理(类似于顶点着色器):将顶点进行MVP变换到NDC空间, 并将color normal uv等顶点属性传递下去
      let ndcVertexes = item.vertexes.map(v => {
        return this.perVertex(v)
      })
      
      
      //1.5.视口变换: 将ndc空间映射到屏幕空间
      let screenVertexes = ndcVertexes.map(v => {
        const vv = v.clone()
        vv.position.applyMatrix4(this.camera.viewPortMatrix)
        // vv.position.y =-vv.position.y
        return vv
      })
      
      //TODO
      //2.逐片元光栅化(包括逐片元处理)
      //2.01逐三角形处理三角形
      const indices = item.indices
      
      indices.forEach(threeIndex => {
        const [i1, i2, i3] = threeIndex
        const sv1 = screenVertexes[i1]
        const sv2 = screenVertexes[i2]
        const sv3 = screenVertexes[i3]
        let triangle = new Triangle(sv1, sv2, sv3)
        triangle.computePixels()
        triangle.draw(this.gl)  //setPixel
        //TODO 
        //片元着色器-----逐片元处理(类似于片元着色器): 根据映射到屏幕空间的三角形的点进行插值, 插值的过程中对每个片元进行着色抛弃(1.顶点色插值, 对光栅化像素着色时, 像素颜色由三角形顶点插值求得, 2.结合uv从纹理取色3.2的进一步, 结合其他属性以及光的交互实现不同光照模型 取色  4.根据世界坐标取色等)

      });
      
    })
    this.gl.draw()
  }
  _pipe() {
    
  }
  perVertex(v: Vertex): Vertex {
    const vv = v.clone()
    const modelMatrix = getmodelMatrix()
    vv.position
      .applyMatrix4(modelMatrix)
      .applyMatrix4(this.camera.matrix)
      .applyMatrix4(this.camera.projectMatrix)
    
    // vv.position.applyMatrix4(this.camera.matrix).applyMatrix4(this.camera.projectMatrix)
    
    // 
    return vv
  }
  perFragment() {
    
  }
}