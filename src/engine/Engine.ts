import { RenderEngine } from './RenderEngine'
import * as THREE from 'three'
import { RenderLoop } from './RenderLoop'
import { DebugUI } from './DebugUI'
import { Sizes } from './Sizes'
import { Camera } from './Camera'
import { Resource, Resources } from './Resources'
import { GameEntity } from './GameEntity'

export class Engine {
  public readonly camera!: Camera
  public readonly scene!: THREE.Scene
  public readonly renderEngine!: RenderEngine
  public readonly time!: RenderLoop
  public readonly debug!: DebugUI
  public readonly sizes!: Sizes
  public readonly canvas!: HTMLCanvasElement
  public readonly resources!: Resources
  public readonly experience!: GameEntity

  constructor({
    canvas,
    resources,
    experience,
  }: {
    canvas: HTMLCanvasElement
    resources: Resource[]
    experience: new (engine: Engine) => GameEntity
  }) {
    if (!canvas) {
      throw new Error('No canvas provided')
    }

    this.canvas = canvas
    this.sizes = new Sizes(this)
    this.debug = new DebugUI()
    this.time = new RenderLoop(this)
    this.scene = new THREE.Scene()
    this.resources = new Resources(resources)
    this.camera = new Camera(this)
    this.renderEngine = new RenderEngine(this)
    this.experience = new experience(this)
  }

  update(delta: number) {
    this.camera.update()
    this.renderEngine.update()
    this.experience.update(delta)
    this.debug.update()
  }

  resize() {
    this.camera.resize()
    this.renderEngine.resize()
    this.experience.resize()
  }
}
