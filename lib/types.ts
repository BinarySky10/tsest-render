import Vertex from './primitive/Vertex'
import { Texture } from './texture/Texture'
export interface RenderObject {
  vertexes: Array<Vertex>,
  indices: Array<Array<number>>
  textures: Array<Texture>
}