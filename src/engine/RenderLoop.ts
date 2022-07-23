import { Engine } from './Engine'
import * as THREE from 'three'

export class RenderLoop {
  private clock: THREE.Clock
  public deltaTime: number = 16
  public currentTime: number = 0

  constructor(private engine: Engine) {
    this.clock = new THREE.Clock()
    window.requestAnimationFrame(() => this.update())
  }

  update() {
    const step = () => {
      requestAnimationFrame(step)
      const elapsedTime = this.clock.getElapsedTime()

      this.deltaTime = elapsedTime - this.currentTime

      this.currentTime = elapsedTime

      this.engine.update(this.deltaTime)
    }
    step()
  }
}
