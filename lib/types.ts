import Vertex from './primitive/Vertex'
export interface RenderObject  {
  vertexes: Array<Vertex>,
  indices: Array<Array<number>>
}