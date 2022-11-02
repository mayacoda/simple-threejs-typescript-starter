import { Engine } from '../engine/Engine'
import * as THREE from 'three'
import { Box } from './Box'
import { Experience } from '../engine/Experience'
import { Resource } from '../engine/Resources'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'

export class Demo implements Experience {
  resources: Resource[] = []

  constructor(private engine: Engine) {}

  init() {
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshStandardMaterial({ color: 0xffffff })
    )

    plane.rotation.x = -Math.PI / 2
    plane.receiveShadow = true

    this.engine.scene.add(plane)
    this.engine.scene.add(new THREE.AmbientLight(0xffffff, 0.5))

    let directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.castShadow = true
    directionalLight.position.set(2, 2, 2)

    this.engine.scene.add(directionalLight)

    const box = new Box()
    box.castShadow = true
    box.rotation.y = Math.PI / 4
    box.position.set(0, 0.5, 0)

    this.engine.renderEngine.composer.addPass(
      new ShaderPass({
        vertexShader: `
      void main() {
    gl_Position = projectionMatrix  * viewMatrix * modelMatrix * vec4(position, 1.0);
}

      `,
        fragmentShader: `
        void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}

      `,
      })
    )

    this.engine.scene.add(box)
  }

  resize() {}

  update() {}
}
