import { OrthCamera } from './Cameras/camera';
import Scene from './Scene'
import Vertex from '../lib/primitive/Vertex'
export default class Renderer{
  scene: Scene
  camera:OrthCamera
  constructor(scene:Scene, camera:OrthCamera) {
    this.scene = scene
    this.camera =camera
  }
  render() {
    this.scene.object.forEach(item => {
      const [v1, v2, v3] = item.vertexes
      //TODO  
      //顶点着色器-----逐顶点处理(类似于顶点着色器):将顶点进行MVP变换到NDC空间, 并将color normal uv等顶点属性传递下去
      let ndcVertexes = item.vertexes.map(v => {
        return this.perVertex(v)
      })
      //TODO 
      //视口变换: 将ndc空间映射到屏幕空间
      let screenVertexes = ndcVertexes.map(v => {
        return v
      })
      //TODO
      //逐三角形光栅化(包括逐片元处理)
      // let triangle = new Triangle(v1, v2, v3)
      // triangle.computePixels()
      // triangle.draw(gl)  //setPixel
      //TODO 
      //片元着色器-----逐片元处理(类似于片元着色器): 根据映射到屏幕空间的三角形的点进行插值, 插值的过程中对每个片元进行着色抛弃(1.顶点色插值, 对光栅化像素着色时, 像素颜色由三角形顶点插值求得, 2.结合uv从纹理取色3.2的进一步, 结合其他属性以及光的交互实现不同光照模型 取色  4.根据世界坐标取色等)
    })
  }
  perVertex(v:Vertex):Vertex {
    return v
  }
  perFragment() {
    
  }
}