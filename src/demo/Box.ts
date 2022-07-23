import * as THREE from 'three'

export class Box extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.BoxBufferGeometry(1, 1, 1)
    const material = new THREE.MeshStandardMaterial({ color: 0xff00ff })

    super(geometry, material)
  }
}
