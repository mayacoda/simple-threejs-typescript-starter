import { FullScreenQuad, Pass } from 'three/examples/jsm/postprocessing/Pass'
import type { WebGLRenderer } from 'three'
import {
  HalfFloatType,
  MeshNormalMaterial,
  NearestFilter,
  RGBAFormat,
  WebGLRenderTarget,
} from 'three'
import { PencilLinesShader } from './PencilLinesShader'
import type { Engine } from '../engine/Engine'

export class PencilLinesPass extends Pass {
  fsQuad: FullScreenQuad
  material: PencilLinesShader
  normalMaterial: MeshNormalMaterial

  surfaceBuffer: WebGLRenderTarget

  constructor(private engine: Engine) {
    super()

    this.fsQuad = new FullScreenQuad()
    this.material = new PencilLinesShader(this.engine)

    this.fsQuad.material = this.material

    const surfaceBuffer = new WebGLRenderTarget(
      this.engine.sizes.width,
      this.engine.sizes.height
    )
    surfaceBuffer.texture.format = RGBAFormat
    surfaceBuffer.texture.type = HalfFloatType
    surfaceBuffer.texture.minFilter = NearestFilter
    surfaceBuffer.texture.magFilter = NearestFilter
    surfaceBuffer.texture.generateMipmaps = false
    surfaceBuffer.stencilBuffer = false
    this.surfaceBuffer = surfaceBuffer

    this.normalMaterial = new MeshNormalMaterial()

    this.material.uniforms.uCameraNear.value = this.engine.camera.instance.near
    this.material.uniforms.uCameraFar.value = this.engine.camera.instance.far
  }

  render(
    renderer: WebGLRenderer,
    writeBuffer: WebGLRenderTarget,
    readBuffer: WebGLRenderTarget
  ) {
    const depthBuffer = writeBuffer.depthBuffer
    writeBuffer.depthBuffer = false

    renderer.setRenderTarget(this.surfaceBuffer)
    const overrideMaterialValue = this.engine.scene.overrideMaterial

    this.engine.scene.overrideMaterial = this.normalMaterial
    renderer.render(this.engine.scene, this.engine.camera.instance)
    this.engine.scene.overrideMaterial = overrideMaterialValue

    debugger

    this.material.uniforms.uDiffuse.value = readBuffer.texture
    this.material.uniforms.uDepthBuffer.value = readBuffer.depthTexture
    this.material.uniforms.uSurfaceBuffer.value = this.surfaceBuffer.texture

    if (this.renderToScreen) {
      renderer.setRenderTarget(null)
      this.fsQuad.render(renderer)
    } else {
      renderer.setRenderTarget(writeBuffer)
      if (this.clear) renderer.clear()
      this.fsQuad.render(renderer)
    }

    writeBuffer.depthBuffer = depthBuffer
  }

  dispose() {
    this.material.dispose()
    this.fsQuad.dispose()
  }

  setSize() {
    this.material.resize()
  }
}
