import * as THREE from 'three'
import { getDebugUi } from '../utils/debug-ui'

/**
 * Creates one purple ambient light and two golden point lights and adds them to the scene.
 */
export function createLights(scene: THREE.Scene) {
  const gui = getDebugUi()

  // Ambient light
  const light = new THREE.AmbientLight(0x6860d7, 1)
  gui.addColor(light, 'color').name('ambient light color')

  // First point light
  const pointLight = new THREE.PointLight(0xf9ca48, 1)
  pointLight.position.set(0, -2, -3)
  gui.addColor(pointLight, 'color').name('point light color')
  gui.add(pointLight, 'intensity').min(0).max(1).step(0.0001).name('point light intensity')

  // Second point light
  const pointLight2 = new THREE.PointLight(0xe7964b, 1)
  pointLight2.position.set(1, 2, 1)
  gui.addColor(pointLight2, 'color').name('point light color 2')

  scene.add(light, pointLight, pointLight2)
}
