import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export type Resource =
  | {
      name: string
      type: Exclude<AssetType, 'cubeTexture'>
      path: string
    }
  | {
      name: string
      type: 'cubeTexture'
      path: string[]
    }

type AssetType = 'gltf' | 'texture' | 'cubeTexture'

type Loaders = {
  gltf: GLTFLoader
  texture: THREE.TextureLoader
  cubeTexture: THREE.CubeTextureLoader
}

export class Resources {
  private loadingManager = new THREE.LoadingManager()
  private loaders!: Loaders
  public items: Record<string, any> = {}

  constructor(private readonly resources: Resource[]) {
    this.initLoaders()
    this.load()
  }

  private initLoaders() {
    this.loaders = {
      gltf: new GLTFLoader(this.loadingManager),
      texture: new THREE.TextureLoader(this.loadingManager),
      cubeTexture: new THREE.CubeTextureLoader(this.loadingManager),
    }
  }

  load() {
    for (const resource of this.resources) {
      switch (resource.type) {
        case 'gltf':
          this.loaders.gltf.load(
            resource.path,
            (file) => (this.items[resource.name] = file)
          )
          break
        case 'texture':
          this.loaders.texture.load(
            resource.path,
            (file) => (this.items[resource.name] = file)
          )
          break
        case 'cubeTexture':
          this.loaders.cubeTexture.load(
            resource.path,
            (file) => (this.items[resource.name] = file)
          )
          break
      }
    }
  }
}
