import type {RenderObject} from './types'
export default class Scene{
  object:Array<RenderObject>
  constructor() {
    this.object = []
  }
  add(obj:RenderObject) {
    this.object.push(obj)
  }
}