import { Engine } from './Engine'

type Sizing = 'cover' | 'contain'

export class Sizes {
  public width!: number
  public height!: number
  public pixelRatio: number = Math.min(window.devicePixelRatio, 2)
  public aspectRatio!: number

  public sizing: Sizing = 'contain'

  constructor(private engine: Engine) {
    this.setContainsSizing()

    window.addEventListener('resize', () => {
      this.resize()
      this.engine.resize()
    })
  }

  public setContainsSizing() {
    this.width = window.innerWidth
    this.height = window.innerHeight

    this.aspectRatio = this.width / this.height

    console.log(this.width, this.height, this.aspectRatio)
  }

  public setCoverSizing() {
    const maxWidth = window.innerWidth
    const maxHeight = window.innerHeight

    if (maxWidth / maxHeight < this.aspectRatio) {
      this.width = maxWidth
      this.height = maxWidth / this.aspectRatio
    } else {
      this.width = maxHeight * this.aspectRatio
      this.height = maxHeight
    }
  }

  setAspectRatio(aspectRatio: number) {
    this.aspectRatio = aspectRatio
  }

  setSizing(sizing: Sizing) {
    this.sizing = sizing

    this.resize()
  }

  resize() {
    if (this.sizing === 'contain') {
      this.setContainsSizing()
    } else {
      this.setCoverSizing()
    }
  }
}
