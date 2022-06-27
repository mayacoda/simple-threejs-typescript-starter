import * as THREE from 'three'

export const positionCharacter = (spaceDog: THREE.Object3D) => {
  spaceDog.position.set(0, 0, -2)
  spaceDog.rotation.set(0, -Math.PI / 4, 0)
}
export const animateCharacter = (spaceDog: THREE.Object3D, elapsedTime: number) => {
  spaceDog.rotation.y = elapsedTime * 0.5
  spaceDog.position.y = Math.sin(elapsedTime / 3)
}
