import { WebGLRenderer } from 'three'
import { Engine } from './Engine'
import * as THREE from 'three'
import { GameEntity } from './GameEntity'

export class RenderEngine implements GameEntity {
  private readonly renderer: WebGLRenderer

  constructor(private engine: Engine) {
    this.renderer = new WebGLRenderer({
      canvas: this.engine.canvas,
      antialias: true,
    })

    this.renderer.physicallyCorrectLights = true
    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.renderer.toneMapping = THREE.CineonToneMapping
    this.renderer.toneMappingExposure = 1.75
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.setClearColor('#000000')
    this.renderer.setSize(this.engine.sizes.width, this.engine.sizes.height)
    this.renderer.setPixelRatio(Math.min(this.engine.sizes.pixelRatio, 2))
  }

  update() {
    this.renderer.render(this.engine.scene, this.engine.camera.instance)
  }

  resize() {
    this.renderer.setSize(this.engine.sizes.width, this.engine.sizes.height)
  }
}
